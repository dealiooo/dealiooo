import React, { Component } from 'react';
import { withTheme } from 'styled-components';
import { VipCrown as CrownIcon } from 'styled-icons/remix-line/VipCrown';
import { ArrowLeft as ArrowLeftIcon } from 'styled-icons/feather/ArrowLeft';
import { CheckboxBlankCircle as CheckBlankIcon } from 'styled-icons/remix-line/CheckboxBlankCircle';
import { CheckboxCircle as CheckIcon } from 'styled-icons/remix-line/CheckboxCircle';

import * as S from './style';
import { Lobby, Center } from '../../layouts';
import { Theme } from '../../styles';
import { Title, CenterInline, Button, Modal, Loader, Chat, ScrollBar } from '../../components';
import { Auth, PlayerStatus, MessageData, GameStatus } from '../../types';
import { GameLobbyAPI, socket, history, GameAPI } from '../../services';

type GameLobbyProps = {
  gameId: number;
  theme: Theme;
};

type GameLobbyState = {
  auth: Auth | null;
  loading: boolean;
  messages: MessageData[];
  roomName: string;
  roomCapacity: number | null;
  ready: boolean;
  host: boolean;
  playerStatuses: PlayerStatus[];
  showModal: boolean;
  gameStatus: GameStatus;
};

class GameLobby extends Component<GameLobbyProps, GameLobbyState> {
  constructor(props) {
    super(props);
    this.state = {
      auth: null,
      loading: false,
      messages: [],
      roomName: '',
      ready: false,
      host: false,
      playerStatuses: [],
      roomCapacity: null,
      showModal: false,
      gameStatus: GameStatus.open,
    };
  }

  handleSend = message => {
    const { gameId } = this.props;
    GameLobbyAPI.postChat(gameId, message);
  };

  openModal = event => {
    this.setState({ showModal: true });
  };

  closeModal = event => {
    this.setState({ showModal: false });
  };

  handleStartGameFromSocket = () => {
    const { gameId } = this.props;
    history.push(`/game/${gameId}`);
  };

  handleEnterGameFromSocket = data => {
    const { gameId } = this.props;
    const enterGameId = parseInt(data, 10);

    const init = async () => {
      const { data: playerStatuses } = await GameLobbyAPI.getStatuses(gameId);

      playerStatuses.forEach(playerStatus => {
        const { host, ready } = playerStatus.Players[0];
        playerStatus.host = host;
        playerStatus.ready = ready;
      });

      this.setState({ playerStatuses });
    };

    if (gameId === enterGameId) init();
  };

  setPlayerStatusesReadyFromSocket = (boolean: boolean, data) => {
    const basePlayerStatuses = this.state.playerStatuses.slice();

    basePlayerStatuses.forEach(playerStatus => {
      if (playerStatus.id === data.userId) {
        playerStatus.ready = boolean;
        this.setState({ ready: boolean });
      }
    });

    this.setState({ playerStatuses: basePlayerStatuses });
  };

  handlePlayerReadyFromSocket = data => {
    this.setPlayerStatusesReadyFromSocket(true, data);
  };

  handlePlayerUnreadyFromSocket = data => {
    this.setPlayerStatusesReadyFromSocket(false, data);
  };

  handleLeaveGameFromSocket = data => {
    const { auth, playerStatuses } = this.state;

    const isMe = auth && auth.id === data.userId;
    const isHost = playerStatuses.some(playerStatus => {
      return playerStatus.id === data.userId && playerStatus.host;
    });

    if (isMe || isHost) {
      history.push('/main-lobby');
      return;
    }

    this.setState({ playerStatuses: playerStatuses.filter(playerStatus => playerStatus.id !== data.userId) });
  };

  handleStartGame = event => {
    const { gameId } = this.props;
    GameLobbyAPI.postStart(gameId);
  };

  handleReady = event => {
    const { gameId } = this.props;
    GameLobbyAPI.postReady(gameId);
  };

  handleLeave = event => {
    event.preventDefault();
    const { gameId } = this.props;
    GameLobbyAPI.postLeave(gameId);
  };

  canStartGame = () => {
    const { playerStatuses, roomCapacity } = this.state;

    let playersReady = 0;

    playerStatuses.forEach(playerStatus => {
      if (playerStatus.ready) playersReady++;
    });

    return playersReady === roomCapacity;
  };

  componentDidMount() {
    const { gameId } = this.props;

    const init = async () => {
      this.setState({ loading: true });
      // guard against unauthenticated access
      const { data: auth } = await GameAPI.getAuthenticate(gameId);

      // check if the game has ended
      const { data: gameLobbyInfo } = await GameLobbyAPI.getInfo(gameId);
      if (gameLobbyInfo.status === GameStatus.ended) {
        history.push('/');
        return;
      }

      // only start sockets if authenticated
      socket.on(`game-lobby:${gameId}:enter-game`, this.handleEnterGameFromSocket);
      socket.on(`game-lobby:${gameId}:leave-game`, this.handleLeaveGameFromSocket);
      socket.on(`game-lobby:${gameId}:player-ready`, this.handlePlayerReadyFromSocket);
      socket.on(`game-lobby:${gameId}:player-unready`, this.handlePlayerUnreadyFromSocket);
      socket.on(`game-lobby:${gameId}:start-game`, this.handleStartGameFromSocket);

      await GameLobbyAPI.postEnter(gameId);

      const { data: playerStatuses } = await GameLobbyAPI.getStatuses(gameId);

      playerStatuses.forEach(playerStatus => {
        const { host, ready } = playerStatus.Players[0];
        playerStatus.host = host;
        playerStatus.ready = ready;

        if (playerStatus.id === auth.id) {
          this.setState({ host, ready });
        }
      });

      this.setState({
        auth,
        loading: false,
        roomName: gameLobbyInfo.room_name,
        roomCapacity: gameLobbyInfo.player_cap,
        gameStatus: gameLobbyInfo.status,
        playerStatuses,
      });
    };

    init();
  }

  componentWillUnmount() {
    const { auth } = this.state;
    const { gameId } = this.props;

    if (auth) {
      socket.off(`game-lobby:${gameId}:enter-game`);
      socket.off(`game-lobby:${gameId}:leave-game`);
      socket.off(`game-lobby:${gameId}:player-ready`);
      socket.off(`game-lobby:${gameId}:player-unready`);
      socket.off(`game-lobby:${gameId}:start-game`);
    }
  }

  render() {
    const { loading, showModal, roomName, playerStatuses, host, ready, messages } = this.state;
    const { theme, gameId } = this.props;
    const canStartGame = this.canStartGame();

    return (
      <Lobby>
        <Modal open={showModal} title="Game Rules" onClose={this.closeModal}>
          <ScrollBar options={{ suppressScrollX: true }}>
            <S.LobbyRuleBook />
          </ScrollBar>
        </Modal>
        <S.Main>
          {loading ? (
            <Center relative>
              <Loader size={20} />
            </Center>
          ) : (
            <>
              <S.Header>
                <Title marginless>{roomName}</Title>
                <Button onClick={this.openModal} color="green">
                  Game Rules
                </Button>
              </S.Header>
              <S.PlayerStatuses>
                {playerStatuses.map(playerStatus => {
                  return (
                    <S.PlayerStatus key={playerStatus.id}>
                      {playerStatus.host ? (
                        <CrownIcon size={20} color={theme.palette.gold} />
                      ) : playerStatus.ready ? (
                        <CheckIcon size={20} color={theme.palette.green} />
                      ) : (
                        <CheckBlankIcon size={20} color={theme.palette.gray} />
                      )}
                      <CenterInline>{playerStatus.username}</CenterInline>
                    </S.PlayerStatus>
                  );
                })}
              </S.PlayerStatuses>
              <S.BottomArea>
                <S.LeaveLobbyButton onClick={this.handleLeave}>
                  <ArrowLeftIcon size={20} />
                  <CenterInline>Leave Lobby</CenterInline>
                </S.LeaveLobbyButton>
                {host ? (
                  <Button onClick={this.handleStartGame} disabled={!canStartGame} color="primary">
                    Start Game
                  </Button>
                ) : ready ? (
                  <Button onClick={this.handleReady} color="red">
                    Cancel
                  </Button>
                ) : (
                  <Button onClick={this.handleReady} color="green">
                    Ready
                  </Button>
                )}
              </S.BottomArea>
            </>
          )}
        </S.Main>
        <Chat channel={`game-lobby:${gameId}:chat`} messages={messages} onSend={this.handleSend} />
      </Lobby>
    );
  }
}

export default withTheme(GameLobby);
