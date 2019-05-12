import React, { Component } from 'react';

import PlayerListNavigationBar from './PlayerListNavigationBar';
import TimerView from './TimerView';
import GameMessageView from './GameMessageView';
import DeckDiscardView from './DeckDiscardView';

class GeneralInfoField extends Component {
  render() {
    const {
      generalInfo: { deckCount, discard, tick },
      promptPlayerId,
      currentPlayerId,
      selectedOpponentId,
      opponentInfos,
      onOpponentClicked,
      onOpponentHover,
      contentHeight,
      gameMessage
    } = this.props;

    const messageViewHeight = (contentHeight - 18 * 2) / 2;

    return (
      <div className="columns is-marginless">
        <div className="column is-2">
          <PlayerListNavigationBar
            playerInfos={opponentInfos}
            selectedPlayerId={selectedOpponentId}
            onPlayerClick={onOpponentClicked}
            onPlayerHover={onOpponentHover}
          />
        </div>
        <div className="column is-8">
          <GameMessageView
            promptPlayerId={promptPlayerId}
            gameMessage={gameMessage}
            contentHeight={messageViewHeight}
          />
          <TimerView tick={tick} contentHeight={messageViewHeight} />
        </div>
        <div className="column is-2">
          <DeckDiscardView
            currentPlayerId={currentPlayerId}
            deckCount={deckCount}
            discard={discard}
            contentHeight={contentHeight}
          />
        </div>
      </div>
    );
  }
}

export default GeneralInfoField;
