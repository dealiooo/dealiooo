import React, { Component } from 'react';

import PlayerHandView from './PlayerHandView';
import PlayerPromptView from './PlayerPromptView';
import PlayerBasicOptionsView from './PlayerBasicOptionsView';

class PlayerHandOrPromptView extends Component {
  render() {
    const {
      isPendingUserInput,
      promptsInfo,
      onPromptSubmit,
      handCards,
      onHandCardClicked,
      onCancelClicked,
      onEndTurn,
      onForfeit,
      contentHeight
    } = this.props;

    return (
      <div className="columns">
        <div className="column is-10">
          {isPendingUserInput ? (
            <PlayerHandView
              handCards={handCards}
              onHandCardClicked={onHandCardClicked}
            />
          ) : (
            <PlayerPromptView
              promptsInfo={promptsInfo}
              onPromptSubmit={onPromptSubmit}
              onCancelClicked={onCancelClicked}
            />
          )}
        </div>
        <div className="column is-2">
          <PlayerBasicOptionsView onEndTurn={onEndTurn} onForfeit={onForfeit} />
        </div>
      </div>
    );
  }
}

export default PlayerHandOrPromptView;
