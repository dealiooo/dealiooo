import React, { useState, useEffect, useCallback } from 'react';
import { Redirect } from 'react-router';
import { RightArrowSquare as CollapseRightIcon } from '@styled-icons/boxicons-solid/RightArrowSquare';
import { LeftArrowSquare as CollapseLeftIcon } from '@styled-icons/boxicons-solid/LeftArrowSquare';
import { Settings2 as SettingsIcon } from '@styled-icons/remix-line/Settings2';

import * as S from './style';
import PlayerBox from './PlayerBox';
import PromptsBox from './PromptsBox';
import GlobalsBar from './GlobalsBar';
import SettingsMenu from './SettingsMenu';
import Results from './Results';
import CardList from './PlayerBox/CardList';
import { Center } from '../../layouts';

import { Button, Modal, IconButton, Loader } from '../../components';
import { GameAPI, GameLobbyAPI, socket, history } from '../../services';
import { GameData, GameStatus, MessageData, Auth } from '../../types';
import { useToggle, useWindowSize } from '../../utils';
import {
  UserInputMap,
  calcPlayerBoxHeight,
  calcGlobalsBarHeight,
  calcPromptHandsHeight,
  calcCollapseHeight,
} from './utils';

type GameProps = {
  gameId: number;
};

const INITIAL_GAME_DATA: GameData = {
  promptsInfo: {
    promptMessage: undefined,
    promptPlayerId: undefined,
    options: undefined,
  },
  globals: undefined,
  players: [],
};

const Game: React.FC<GameProps> = ({ gameId }) => {
  const [auth, setAuth] = useState<Auth | null>(null);
  const [loading, setLoading] = useState(true);
  const [started, setStarted] = useState(false);
  const [collapsed, toggleCollapsed] = useToggle();

  const [windowWidth, windowHeight] = useWindowSize();
  const [playerBoxWidth, setPlayerBoxWidth] = useState(0);
  const [playerBoxHeight, setPlayerBoxHeight] = useState(0);
  const [globalsBarHeight, setGlobalsBarHeight] = useState(0);
  const [promptHandsHeight, setPromptHandsHeight] = useState(0);
  const [collapseHeight, setCollapseHeight] = useState(0);

  const [messages, setMessages] = useState<MessageData[]>([]);
  const [gameData, setGameData] = useState<GameData>(INITIAL_GAME_DATA);
  const [playerWonUsername, setPlayerWonUsername] = useState<string | undefined>(undefined);
  const [playerForfeitUsername, setPlayerForfeitUsername] = useState<string | undefined>(undefined);

  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const openSettingsMenu = useCallback(event => setShowSettingsMenu(true), []);
  const closeSettingsMenu = useCallback(event => setShowSettingsMenu(false), []);

  useEffect(() => {
    setPlayerBoxHeight(calcPlayerBoxHeight(windowHeight));
    setGlobalsBarHeight(calcGlobalsBarHeight(windowHeight));
    setPromptHandsHeight(calcPromptHandsHeight(windowHeight));
    setCollapseHeight(calcCollapseHeight(windowHeight));
  }, [windowWidth, windowHeight]);

  useEffect(() => {
    setPlayerBoxWidth(windowWidth / gameData.players.length - 1);
  }, [windowWidth, gameData.players.length]);

  useEffect(() => {
    const init = async () => {
      const { data: auth } = await GameAPI.getAuthenticate(gameId);
      setAuth(auth);

      socket.on(`game:${gameId}:start-game`, handleStartGameFromSocket);
      socket.on(`game:${gameId}:game-forfeit`, handleForfeitFromSocket);
      socket.on(`game:${gameId}:game-update`, handleGameDataUpdateFromSocket);

      await GameAPI.postJoin(gameId);

      const { data: gameLobbyInfo } = await GameLobbyAPI.getInfo(gameId);
      if (auth.host && gameLobbyInfo.status === GameStatus.running) {
        await GameAPI.postLoadGame(gameId);
        setStarted(true);
      }

      const { data: messages } = await GameAPI.getChat(gameId);
      setMessages(messages);
      setLoading(false);
    };

    init();

    return () => {
      if (auth) {
        socket.off(`game:${gameId}:start-game`);
        socket.off(`game:${gameId}:game-forfeit`);
        socket.off(`game:${gameId}:game-update`);
      }
    };
  }, []);

  const handleForfeit = event => {
    const init = async () => {
      await GameAPI.postForfeit(gameId);
      history.push('/');
    };

    init();
  };

  const handleChatMessage = message => {
    GameAPI.postChat(gameId, message);
  };

  const handleGameDataUpdateFromSocket = useCallback(gameData => {
    setGameData({
      players: gameData.players_info,
      globals: gameData.general_info,
      promptsInfo: gameData.prompts_info,
    });
  }, []);

  const handleStartGameFromSocket = useCallback(() => {
    setStarted(true);
  }, []);

  const handleForfeitFromSocket = useCallback(
    ({ playerWonUsername, playerForfeitUsername }) => {
      if (playerWonUsername) {
        setPlayerWonUsername(playerWonUsername);
        setPlayerForfeitUsername(playerForfeitUsername);
      }
    },
    [playerWonUsername, playerForfeitUsername],
  );

  const handleStartGame = useCallback(event => {
    const init = async () => {
      await GameAPI.postStartGame(gameId);
      GameAPI.postUpdate(gameId);
    };

    init();
  }, []);

  const handleCancel = useCallback(
    event => {
      GameAPI.postCancel(gameId);
    },
    [gameId],
  );

  const handleClickInput = useCallback(
    event => {
      const clickInput = UserInputMap[gameData.promptsInfo.promptMessage](event);
      GameAPI.postClick(gameId, clickInput);
    },
    [gameId, gameData.promptsInfo.promptMessage],
  );

  if (loading) {
    return (
      <Center>
        <Loader size={20} />
      </Center>
    );
  }

  if (!auth) {
    return <Redirect to="/" />;
  }

  if (playerWonUsername) {
    return <Results winner={playerWonUsername} isWinner={auth.username === playerWonUsername} />;
  }

  if (started) {
    if (gameData.players.length === 0) {
      return (
        <Center>
          <Loader size={20} />
        </Center>
      );
    }

    const player = gameData.players.find(player => player.id === auth.id);
    const opponents = gameData.players.filter(player => player.id !== auth.id);
    const promptedAndPickingHandCard =
      auth.id === gameData.promptsInfo.promptPlayerId && gameData.promptsInfo.options === undefined;
    const promptedAndNotPickingHandCard =
      auth.id === gameData.promptsInfo.promptPlayerId && gameData.promptsInfo.options !== undefined;
    const promptPlayerUsername = gameData.players.find(player => player.id === gameData.promptsInfo.promptPlayerId)
      .username;

    return (
      <>
        <S.PlayerBoxes>
          {opponents.map(opponent => {
            return (
              <PlayerBox
                key={opponent.id}
                player={opponent}
                boxWidth={playerBoxWidth}
                boxHeight={playerBoxHeight}
                onCardClick={promptedAndNotPickingHandCard ? handleClickInput : undefined}
              />
            );
          })}
        </S.PlayerBoxes>
        <S.BottomViewLayout>
          <S.ExpandableLayout>
            <GlobalsBar
              gameGlobals={gameData.globals}
              turnMessage={`${promptPlayerUsername}: ${gameData.promptsInfo.promptMessage}`}
              height={globalsBarHeight}
            />
            <PlayerBox player={player} onCardClick={handleClickInput} boxHeight={playerBoxHeight} />
            <>
              {promptedAndNotPickingHandCard ? (
                <>
                  <PromptsBox
                    promptsInfo={gameData.promptsInfo}
                    onOptionClick={handleClickInput}
                    promptsHeight={promptHandsHeight * 0.8}
                  />
                  <S.CancelButton onClick={handleCancel}>Cancel</S.CancelButton>
                </>
              ) : (
                <>
                  <CardList
                    cards={player.handCards}
                    height={promptHandsHeight * 0.8}
                    onCardClick={promptedAndPickingHandCard ? handleClickInput : undefined}
                  />
                  {promptedAndPickingHandCard && <S.CancelButton onClick={handleCancel}>Cancel</S.CancelButton>}
                </>
              )}
            </>
          </S.ExpandableLayout>
          <S.CollapsableLayout height={collapseHeight}>
            <S.CollapseTopBar collapsed={collapsed}>
              <IconButton onClick={toggleCollapsed}>
                {collapsed ? <CollapseLeftIcon size={20} /> : <CollapseRightIcon size={20} />}
              </IconButton>
              <IconButton onClick={openSettingsMenu}>
                <SettingsIcon size={20} />
              </IconButton>
              <Modal title="Settings" open={showSettingsMenu} onClose={closeSettingsMenu}>
                <SettingsMenu onForfeit={handleForfeit} />
              </Modal>
            </S.CollapseTopBar>
            {!collapsed && (
              <S.CollapseChat channel={`game:${gameId}:chat`} messages={messages} onSend={handleChatMessage} />
            )}
          </S.CollapsableLayout>
        </S.BottomViewLayout>
      </>
    );
  }

  return (
    <Center>
      {auth && auth.host ? (
        <Button onClick={handleStartGame} color="primary">
          Start Game
        </Button>
      ) : (
        <div>Waiting for host to start game...</div>
      )}
    </Center>
  );
};

export default Game;
