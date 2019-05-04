import React, { Component } from 'react';

import GeneralInfoField from './GeneralInfoField';
import PlayerPlayArea from './PlayerPlayArea';
import PlayerField from './PlayerField';

class GameView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedOpponentId: this.getDefaultSelectedOpponentId(props),
      screenHeight: window.innerHeight
    };

    this.updateDimensions = this.updateDimensions.bind(this);
    this.handleOpponentClicked = this.handleOpponentClicked.bind(this);
    this.handleOpponentHover = this.handleOpponentHover.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  updateDimensions() {
    this.setState({
      screenHeight: window.innerHeight
    });
  }

  getDefaultSelectedOpponentId() {
    const {
      userId,
      data: {
        general_info: { currentPlayer },
        players_info: playerInfos
      }
    } = this.props;

    const userPlayerInfo = playerInfos.filter(
      player => player.id === userId
    )[0];

    const opponentInfos = playerInfos.filter(player => player.id !== userId);

    let selectedOpponentId;

    if (currentPlayer !== userPlayerInfo.id) {
      selectedOpponentId = currentPlayer;
    } else {
      selectedOpponentId = opponentInfos[0].id;
    }

    return selectedOpponentId;
  }

  handleOpponentHover = ({ data }) => {
    this.setState({
      selectedOpponentId: data.hoverPlayerId
    });
  };

  handleOpponentClicked = event => {
    const playerId = parseInt(event.target.getAttribute('value'));
    this.setState({ selectedOpponentId: playerId });
  };

  render() {
    const { selectedOpponentId, screenHeight } = this.state;
    const {
      userId,
      gameId,
      data: {
        general_info: generalInfo,
        prompts_info: promptsInfo,
        players_info: playersInfo,
        game_log: gameLog
      },
      onPromptSubmit,
      onHandCardClicked,
      onCancelClicked,
      onEndTurn,
      onForfeit
    } = this.props;

    const userInfo = playersInfo.filter(player => player.id === userId)[0];

    const opponentInfos = playersInfo.filter(player => player.id !== userId);

    const selectedOpponentInfo = opponentInfos.filter(
      player => player.id === selectedOpponentId
    )[0];

    const playerFieldContentHeight = (screenHeight * 24) / 100;

    return (
      <div style={{ margin: '0 1.0vw' }}>
        <div style={{ minHeight: '24vh', maxHeight: '24vh' }}>
          <PlayerField
            playerInfo={selectedOpponentInfo}
            contentHeight={playerFieldContentHeight}
          />
        </div>
        <div style={{ minHeight: '22vh', maxHeight: '22vh' }}>
          <GeneralInfoField
            generalInfo={generalInfo}
            opponentInfos={opponentInfos}
            selectedOpponentId={selectedOpponentId}
            onOpponentClicked={this.handleOpponentClicked}
            onOpponentHover={this.handleOpponentHover}
            contentHeight={(screenHeight * 22) / 100}
          />
        </div>
        <div style={{ minHeight: '24vh', maxHeight: '24vh' }}>
          <PlayerField
            playerInfo={userInfo}
            contentHeight={playerFieldContentHeight}
          />
        </div>
        <div style={{ minHeight: '30vh', maxHeight: '30vh' }}>
          <PlayerPlayArea
            gameId={gameId}
            promptsInfo={promptsInfo}
            gameLog={gameLog}
            handCards={userInfo.hand_cards}
            onHandCardClicked={onHandCardClicked}
            onCancelClicked={onCancelClicked}
            onEndTurn={onEndTurn}
            onForfeit={onForfeit}
            onPromptSubmit={onPromptSubmit}
            contentHeight={(screenHeight * 30) / 100}
          />
        </div>
      </div>
    );
  }
}

export default GameView;
