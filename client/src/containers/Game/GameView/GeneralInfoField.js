import React, { Component } from 'react';

import PlayerListNavigationBar from './PlayerListNavigationBar';
import PlayerActionInfoView from './PlayerActionInfoView';
import GameMessageView from './GameMessageView';
import GameInfoView from './GameInfoView';

class GeneralInfoField extends Component {
  render() {
    const {
      generalInfo: { deckCount, discard, tick, cardsPlayed, turnCount },
      promptPlayerUsername,
      currentPlayerUsername,
      selectedOpponentId,
      opponentInfos,
      onOpponentClicked,
      onOpponentHover,
      contentHeight,
      gameMessage
    } = this.props;

    // 12: marginBottom of GameMessageView
    const messageViewContentHeight = (contentHeight - 12 * 2) / 2;

    const moreThanOneOpponent = opponentInfos.length > 1;

    return (
      <div
        className="columns is-marginless is-vcentered"
        style={{ height: `${contentHeight}px` }}
      >
        {moreThanOneOpponent ? (
          <div className="column is-2">
            <PlayerListNavigationBar
              playerInfos={opponentInfos}
              selectedPlayerId={selectedOpponentId}
              onPlayerClick={onOpponentClicked}
              onPlayerHover={onOpponentHover}
              contentHeight={contentHeight}
            />
          </div>
        ) : null}
        <div className={`column ${moreThanOneOpponent ? 'is-8' : 'is-10'}`}>
          <GameMessageView
            promptPlayerUsername={promptPlayerUsername}
            gameMessage={gameMessage}
            contentHeight={messageViewContentHeight}
            moreThanOneOpponent={moreThanOneOpponent}
          />
          <PlayerActionInfoView
            tick={tick}
            contentHeight={messageViewContentHeight}
            currentPlayerUsername={currentPlayerUsername}
            cardsPlayed={cardsPlayed}
          />
        </div>
        <div className="column is-2">
          <GameInfoView
            turnCount={turnCount}
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
