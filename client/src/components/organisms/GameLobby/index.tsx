import React, { Component, Fragment } from 'react';
import ScrollBar from 'react-perfect-scrollbar';
import { VipCrown as CrownIcon } from 'styled-icons/remix-line/VipCrown';
import { ArrowLeft as ArrowLeftIcon } from 'styled-icons/feather/ArrowLeft';
import { CheckboxBlankCircle as CheckBlankIcon } from 'styled-icons/remix-line/CheckboxBlankCircle';
import { CheckboxCircle as CheckIcon } from 'styled-icons/remix-line/CheckboxCircle';
import { withTheme, DefaultTheme } from 'styled-components';

import Chat from '../Chat';
import { LobbyLayout, Center } from '../../layouts';
import RuleBook from '../RuleBook';
import { Main, Header, PlayersList, Player, BottomArea, GameButton, GameRulesButton, RuleBookWrapper } from './style';
import { Title, CenterInline, Button, Link, Modal } from '../../atoms';
import { Auth, PlayerStatus, MessageData, GameStatus } from '../../../types/dealiooo';
import { GameLobbyAPI, socket, history, GameAPI } from '../../../services';
import { Loader } from '../../molecules';

type Props = {
  gameId: number;
  theme: DefaultTheme;
};

type State = {
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

class GameLobby extends Component<Props, State> {
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
      <LobbyLayout>
        <Modal open={showModal} onClose={this.closeModal}>
          <ScrollBar options={{ suppressScrollX: true }}>
            <RuleBookWrapper>
              <RuleBook />
            </RuleBookWrapper>
          </ScrollBar>
        </Modal>
        <Main>
          {loading ? (
            <Center relativeToParent>
              <Loader size={30} />
            </Center>
          ) : (
            <Fragment>
              <Header>
                <Title>{roomName}</Title>
                <GameRulesButton onClick={this.openModal}>Game Rules</GameRulesButton>
              </Header>
              <PlayersList>
                {playerStatuses.map(playerStatus => {
                  return (
                    <Player key={playerStatus.id}>
                      {playerStatus.host ? (
                        <CrownIcon size={20} color={theme.gold} />
                      ) : playerStatus.ready ? (
                        <CheckIcon size={20} color={theme.success} />
                      ) : (
                        <CheckBlankIcon size={20} color={theme.disabled} />
                      )}
                      <CenterInline>{playerStatus.username}</CenterInline>
                    </Player>
                  );
                })}
              </PlayersList>
              <BottomArea>
                <Button as={Link} to="/main-lobby" outline onClick={this.handleLeave}>
                  <ArrowLeftIcon size={20} />
                  <CenterInline>Leave Lobby</CenterInline>
                </Button>
                {host ? (
                  <GameButton status="host" onClick={this.handleStartGame} disabled={!canStartGame}>
                    Start Game
                  </GameButton>
                ) : ready ? (
                  <GameButton status="cancel" onClick={this.handleReady}>
                    Cancel
                  </GameButton>
                ) : (
                  <GameButton status="ready" onClick={this.handleReady}>
                    Ready
                  </GameButton>
                )}
              </BottomArea>
            </Fragment>
          )}
        </Main>
        <Chat channel={`game-lobby:${gameId}:chat`} messages={messages} onSend={this.handleSend} />
      </LobbyLayout>
    );
  }
}

export default withTheme(GameLobby);
