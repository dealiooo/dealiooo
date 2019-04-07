import React, { Component } from 'react';

import PlayerListNavigationBar from './PlayerListNavigationBar';
import PlayerCardStackList from './PlayerCardStackList';
import GeneralInfoView from './GeneralInfoView';

class GameView extends Component {
  constructor(props) {
    super(props);

    const selectedOpponentId = this.getDefaultSelectedOpponentId(props);

    this.state = {
      activeHandCard: null,
      selectedOpponentId: selectedOpponentId
    };
  }

  getDefaultSelectedOpponentId(props) {
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

    const opponentPlayerInfos = playerInfos.filter(
      player => player.id !== userId
    );

    let selectedOpponentId;

    if (currentPlayer != userPlayerInfo.id) {
      selectedOpponentId = currentPlayer;
    } else {
      selectedOpponentId = opponentPlayerInfos[0].id;
    }

    return selectedOpponentId;
  }

  handleHandCardClicked = handCard => {
    this.setState({ activeHandCard: handCard });
  };

  handlePlayerHover = playerId => {};

  handlePlayerClicked = event => {
    const playerId = event.target.id;
  };

  render() {
    const { activeHandCard, selectedOpponentId } = this.state;
    const {
      userId,
      gameId,
      data: {
        general_info: generalInfo,
        prompts_info: promptsInfo,
        players_info: playersInfo
      },
      onPromptSubmit,
      onEndTurn,
      onForfeit
    } = this.props;

    const userPlayerInfo = playersInfo.filter(
      player => player.id === userId
    )[0];

    const opponentPlayerInfos = playersInfo.filter(
      player => player.id !== userId
    );

    const selectedOpponentPlayerInfo = opponentPlayerInfos.filter(
      player => player.id === selectedOpponentId
    )[0];

    return (
      <div className="container is-fluid" style={{ minHeight: '100vh' }}>
        <PlayerListNavigationBar
          playerInfos={opponentPlayerInfos}
          selectedPlayerId={selectedOpponentId}
          onPlayerHover={this.handlePlayerHover}
          onPlayerClick={this.handlePlayerClicked}
        />
        <PlayerCardStackList playerInfo={selectedOpponentPlayerInfo} />
        <GeneralInfoView generalInfo={generalInfo} />
      </div>
    );
  }
}

export default GameView;
