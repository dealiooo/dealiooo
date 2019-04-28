import React, { Component } from 'react';

import PlayerListNavigationBar from './PlayerListNavigationBar';
import TimerView from './TimerView';
import GameMessageView from './GameMessageView';
import DeckDiscardView from './DeckDiscardView';

class GeneralInfoField extends Component {
  render() {
    const {
      generalInfo: { deckCount, discard },
      selectedOpponentId,
      opponentInfos,
      onOpponentClicked,
      onOpponentHover
    } = this.props;

    return (
      <div className="columns is-vcentered">
        <div className="column is-2">
          <PlayerListNavigationBar
            playerInfos={opponentInfos}
            selectedPlayerId={selectedOpponentId}
            onPlayerClick={onOpponentClicked}
            onPlayerHover={onOpponentHover}
          />
        </div>
        <div className="column is-8">
          <GameMessageView />
          <TimerView />
        </div>
        <div className="column is-2">
          <DeckDiscardView deckCount={deckCount} discard={discard} />
        </div>
      </div>
    );
  }
}

export default GeneralInfoField;
