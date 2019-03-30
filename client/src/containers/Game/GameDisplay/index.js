import React, { Component } from "react";

import Columns from "react-bulma-components/lib/components/columns";

import GameChat from "./GameChat";
import GeneralInfoDisplay from "./GeneralInfoDisplay";

import PlayerSpace from "./PlayerSpace";
import OpponentSpaces from "./OpponentSpaces";
import CenterField from "./CenterField";

class GameDisplay extends Component {
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
        players_info: playersInfo
      }
    } = this.props;

    const userPlayerInfo = playersInfo.filter(
      player => player.id === userId
    )[0];

    const opponentPlayerInfos = playersInfo.filter(
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
      <>
        <PlayerSpace playerInfo={selectedOpponentPlayerInfo} />
        <GeneralInfoDisplay generalInfo={generalInfo} />
        <PlayerSpace
          playerInfo={userPlayerInfo}
          onHandCardClicked={this.handleHandCardClicked}
          showHandCards={true}
        />
      </>
    );
  }
}

export default GameDisplay;
