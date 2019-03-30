import React, { Component } from "react";

import PlayerSpace from "./PlayerSpace";
import OpponentSpaces from "./OpponentSpaces";
import CenterField from "./CenterField";

class GameMainDisplay extends Component {
  render() {
    const { userId, playersInfo, lastDiscard, onHandCardClicked } = this.props;
    const mePlayerInfo = playersInfo.filter(player => player.id === userId)[0];
    const opponentPlayerInfos = playersInfo.filter(
      player => player.id !== userId
    );

    return (
      <div
        className="has-background-white-ter"
        style={{
          height: "100%",
          display: "flex",
          alignItems: "stretch",
          justifyContent: "center",
          flexDirection: "column",
          padding: 8
        }}
      >
        <OpponentSpaces playerInfos={opponentPlayerInfos} />
        <CenterField lastDiscard={lastDiscard} />
        <PlayerSpace
          playerInfo={mePlayerInfo}
          onHandCardClicked={onHandCardClicked}
          showHandCards={true}
        />
      </div>
    );
  }
}

export default GameMainDisplay;
