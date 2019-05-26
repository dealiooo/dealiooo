import React, { Component } from 'react';

import PlayerHandView from './PlayerHandView';
import PlayerPromptView from './PlayerPromptView';

class PlayerHandOrPromptView extends Component {
  render() {
    const {
      isPendingUserInput,
      promptsInfo,
      handCards,
      onHandCardClicked,
      onCancelClicked,
      contentHeight,
      onPromptOptionClicked
    } = this.props;
    return (
      <div className="columns">
        <div className="column is-12">
          {isPendingUserInput ? (
            <PlayerPromptView
              promptsInfo={promptsInfo}
              onCancelClicked={onCancelClicked}
              contentHeight={contentHeight}
              onPromptOptionClicked={onPromptOptionClicked}
            />
          ) : (
            <PlayerHandView
              handCards={handCards}
              onHandCardClicked={onHandCardClicked}
              contentHeight={contentHeight}
            />
          )}
        </div>
      </div>
    );
  }
}

export default PlayerHandOrPromptView;
