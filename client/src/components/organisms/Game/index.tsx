import React, { Fragment, useState, useEffect, useCallback } from 'react';
import { RightArrowSquare as CollapseRightIcon } from 'styled-icons/boxicons-solid/RightArrowSquare';
import { LeftArrowSquare as CollapseLeftIcon } from 'styled-icons/boxicons-solid/LeftArrowSquare';
import { Settings2 as SettingsIcon } from 'styled-icons/remix-line/Settings2';
import { useSelector, useDispatch } from 'react-redux';
import { Sun as SunIcon } from 'styled-icons/feather/Sun';
import { Moon as MoonIcon } from 'styled-icons/feather/Moon';
import { ExternalLink as ExternalLinkIcon } from 'styled-icons/feather/ExternalLink';
import { ArrowRight as ArrowRightIcon } from 'styled-icons/feather/ArrowRight';

import PlayerBox, { PlayerBoxContainer } from './PlayerBox';
import PromptsBox from './PromptsBox';
import GameGlobalsBar from './GameGlobalsBar';
import { BottomViewLayout, ExpandableLayout, CollapsableLayout } from './GameLayout';

import Chat, { ChatContainer } from '../Chat';
import { Button, Modal, SpanLink, Link, CenterInline } from '../../atoms';
import { IconButton, Loader } from '../../molecules';
import { useToggle, useWindowSize } from '../../../utils';
import { GameAPI, GameLobbyAPI, socket, history } from '../../../services';
import { GameData, GameStatus, MessageData, Auth } from '../../../types/dealiooo';
import { Center, FlexRowCenter, Flex } from '../../layouts';
import { Redirect } from 'react-router';
import Results from './Results';
import {
  UserInputMap,
  calcPlayerBoxHeight,
  calcGameGlobalsBarHeight,
  calcPromptHandsHeight,
  calcCollapseHeight,
} from './utils';
import CardListRenderer from './PlayerBox/CardListRenderer';
import { borderSize, space, ThemeColor, useTheme } from '../../../styles';
import styled from 'styled-components';
import { BUTTON_HEIGHT } from '../../atoms/Button/style';
import { setThemeColor, selectThemeColor } from '../../../store/Settings';

// Important note when building styles for components:
// dont do combinations of inline styles <Styled style: { height: ... } /> with styled-components Styled = { border: ..., padding:... }
// The browser will not calculate the correct box height causing scrollbar / overflow to occur

type Props = {
  gameId: number;
};

const INITIAL_GAME_DATA: GameData = {
  promptsInfo: {
    promptMessage: undefined,
    promptPlayerId: undefined,
    options: undefined,
  },
  gameGlobals: undefined,
  players: [],
};

export default function({ gameId }: Props) {
  const [loading, setLoading] = useState(true);
  const [started, setStarted] = useState(false);
  const [windowWidth, windowHeight] = useWindowSize();
  const [playerBoxWidth, setPlayerBoxWidth] = useState(0);
  const [playerBoxHeight, setPlayerBoxHeight] = useState(0);
  const [gameGlobalsHeight, setGameGlobalsHeight] = useState(0);
  const [promptHandsHeight, setPromptHandsHeight] = useState(0);
  const [collapseHeight, setCollapseHeight] = useState(0);

  const [messages, setMessages] = useState<MessageData[]>([]);

  const [collapsed, toggleCollapsed] = useToggle();
  const [gameData, setGameData] = useState<GameData>(INITIAL_GAME_DATA);

  const [playerWonUsername, setPlayerWonUsername] = useState<string | undefined>(undefined);
  const [playerForfeitUsername, setPlayerForfeitUsername] = useState<string | undefined>(undefined);
  const [auth, setAuth] = useState<Auth | null>(null);

  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const openSettingsMenu = useCallback(event => setShowSettingsMenu(true), []);
  const closeSettingsMenu = useCallback(event => setShowSettingsMenu(false), []);

  useEffect(() => {
    setPlayerBoxHeight(calcPlayerBoxHeight(windowHeight));
    setGameGlobalsHeight(calcGameGlobalsBarHeight(windowHeight));
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
      gameGlobals: gameData.general_info,
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
        <Loader />
      </Center>
    );
  }

  if (!auth) {
    return <Redirect to="/" />;
  }

  if (playerWonUsername) {
    return <Results winner={playerWonUsername} />;
  }

  if (started) {
    if (gameData.players.length === 0) {
      return <div>Loading game data</div>;
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
        <PlayerBoxes>
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
        </PlayerBoxes>
        <BottomViewLayout>
          <ExpandableLayout>
            <GameGlobalsBar
              gameGlobals={gameData.gameGlobals}
              turnMessage={`${promptPlayerUsername}: ${gameData.promptsInfo.promptMessage}`}
              height={gameGlobalsHeight}
            />
            <PlayerBox player={player} onCardClick={handleClickInput} boxHeight={playerBoxHeight} borderless />
            <Fragment>
              {promptedAndNotPickingHandCard ? (
                <Fragment>
                  <PromptsBox
                    promptsInfo={gameData.promptsInfo}
                    onOptionClick={handleClickInput}
                    promptsHeight={promptHandsHeight * 0.8}
                  />
                  <CancelButtonLayout height={promptHandsHeight * 0.2}>
                    <CancelButton onClick={handleCancel}>Cancel</CancelButton>
                  </CancelButtonLayout>
                </Fragment>
              ) : (
                <Fragment>
                  <CardListRenderer
                    cards={player.handCards}
                    height={promptHandsHeight * 0.8}
                    onCardClick={promptedAndPickingHandCard ? handleClickInput : undefined}
                  />
                  {promptedAndPickingHandCard && (
                    <CancelButtonLayout height={promptHandsHeight * 0.2}>
                      <CancelButton onClick={handleCancel}>Cancel</CancelButton>
                    </CancelButtonLayout>
                  )}
                </Fragment>
              )}
            </Fragment>
          </ExpandableLayout>
          <CollapsableLayout height={collapseHeight}>
            <CollapseTopBar justifyBetween column={collapsed}>
              <IconButton onClick={toggleCollapsed}>
                {collapsed ? <CollapseLeftIcon size={20} /> : <CollapseRightIcon size={20} />}
              </IconButton>
              <IconButton onClick={openSettingsMenu}>
                <SettingsIcon size={20} />
              </IconButton>
              <Modal open={showSettingsMenu} onClose={closeSettingsMenu}>
                <SettingsMenu column>
                  <ThemeChangeButton />
                  <GameRulesLink to="/game-rules" newTab underlineOnHover>
                    <CenterInline left>Game Rules</CenterInline>
                    <ExternalLinkIcon size={20} />
                  </GameRulesLink>
                  <ForfeitLink onClick={handleForfeit} underlineOnHover>
                    <CenterInline left>Forfeit</CenterInline>
                    <ArrowRightIcon size={20} />
                  </ForfeitLink>
                </SettingsMenu>
              </Modal>
            </CollapseTopBar>
            {!collapsed && (
              <CollapseLog>
                <Chat channel={`game:${gameId}:chat`} messages={messages} onSend={handleChatMessage} />
              </CollapseLog>
            )}
          </CollapsableLayout>
        </BottomViewLayout>
      </>
    );
  }

  if (auth && auth.host) {
    return (
      <Center>
        <Button onClick={handleStartGame}>Start Game</Button>
      </Center>
    );
  }

  return (
    <Center>
      <div>Waiting for host to start game...</div>
    </Center>
  );
}

const CancelButtonLayout = styled(FlexRowCenter)<{ height: number }>`
  height: ${({ height }) => height}px;
  padding-bottom: ${space.small};
`;

const CancelButton = styled(Button)`
  height: 100%;
  max-height: ${BUTTON_HEIGHT};
  padding: 0;
`;

const CollapseTopBar = styled(Flex)``;

export const PlayerBoxes = styled.div`
  display: flex;

  > ${PlayerBoxContainer} + ${PlayerBoxContainer} {
    border-left: ${borderSize.normal} solid ${({ theme }) => theme.outline};
  }
`;

export const CollapseLog = styled.div`
  flex: 1;
  height: 100%;

  > ${ChatContainer} {
    // remove border from chat
    border: none;
  }
`;

const SettingsMenu = styled(Flex)`
  > *:not(:last-child) {
    margin-bottom: ${space.xLarge};
  }
`;

const GameRulesLink = styled(Link)`
  color: ${({ theme }) => theme.info};
`;

const ForfeitLink = styled(SpanLink)`
  color: ${({ theme }) => theme.error};
`;

const ThemeChangeButton = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const themeColor = useSelector(selectThemeColor);

  const handleThemeColorClick = event =>
    dispatch(setThemeColor(themeColor === ThemeColor.LIGHT ? ThemeColor.DARK : ThemeColor.LIGHT));

  return (
    <IconButton outline onClick={handleThemeColorClick}>
      {themeColor === ThemeColor.LIGHT ? (
        <SunIcon size={20} color={theme.orange} />
      ) : (
        <MoonIcon size={20} color={theme.purple} />
      )}
    </IconButton>
  );
};
