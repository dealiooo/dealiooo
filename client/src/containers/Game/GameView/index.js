import React, { Component } from "react";

import Columns from "react-bulma-components/lib/components/columns";

import GameChat from "./GameChat";
import GameMainDisplay from "./GameMainDisplay";
import GameSideDisplay from "./GameSideDisplay";

class GameView extends Component {
  state = {
    activeHandCard: null
  };

  handleHandCardClicked = handCard => {
    this.setState({ activeHandCard: handCard });
  };

  render() {
    const { activeHandCard } = this.state;
    const {
      userId,
      gameId,
      data: { general_info, prompts_info, players_info },
      onPromptSubmit,
      onEndTurn,
      onForfeit
    } = this.props;
    const lastDiscard = general_info.discard.length
      ? general_info.discard[general_info.discard.length - 1]
      : undefined;

    return (
      <Columns>
        <Columns.Column size={10}>
          <GameMainDisplay
            userId={userId}
            lastDiscard={lastDiscard}
            playersInfo={players_info}
            onHandCardClicked={this.handleHandCardClicked}
          />
        </Columns.Column>
        <Columns.Column size={2}>
          <GameSideDisplay
            activeHandCard={activeHandCard}
            generalInfo={general_info}
            promptsInfo={prompts_info}
            onPromptSubmit={onPromptSubmit}
            onEndTurn={onEndTurn}
            onForfeit={onForfeit}
          />
          <GameChat gameId={gameId} />
        </Columns.Column>
      </Columns>
    );
  }
}

export default GameView;
