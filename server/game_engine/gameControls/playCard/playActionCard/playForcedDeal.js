const gameActions = require('../../../gameActions');
const userControls = require('../../../userControls');

const playForcedDeal = ({ Game, player, card, callback }) => {
  userControls.pickFieldCard({
    Game,
    player,
    pileNames: ['propertyCards', 'buildingCards'],
    callback: ({
      error,
      card: playerCard,
      source: playerSource,
      cancelled,
      forced
    }) => {
      if (error || cancelled || forced) {
        callback({ error, cancelled, forced });
      } else {
        userControls.pickTargetPlayer({
          Game,
          player,
          callback: ({ error, targetPlayer, cancelled, forced }) => {
            if (error || forced) {
              callback({ error, forced });
            } else if (cancelled) {
              playForcedDeal({ Game, player, card, callback });
            } else {
              gameActions.moveCard({
                source: player.hand,
                destination: player.field.actionCards,
                card
              });
              gameActions.onNonCounterCardPlayed({ Game, card });
              gameActions.avoidAction({
                Game,
                player: targetPlayer,
                sourcePlayer: player,
                callback: ({ avoid, forced }) => {
                  if (avoid || forced) {
                    callback({ card, forced });
                  } else {
                    pickCardToForcedDeal({
                      Game,
                      player,
                      playerCard,
                      playerSource,
                      targetPlayer,
                      callback
                    });
                  }
                }
              });
            }
          }
        });
      }
    }
  });
};

const pickCardToForcedDeal = ({
  Game,
  player,
  playerCard,
  playerSource,
  targetPlayer,
  callback
}) => {
  userControls.pickFieldCard({
    Game,
    player: targetPlayer,
    pileNames: ['propertyCards', 'buildingCards'],
    callback: ({
      error,
      card: targetPlayerCard,
      source: targetPlayerSource,
      cancelled,
      forced
    }) => {
      if (error) {
        callback({ error });
      } else if (cancelled) {
        pickCardToForcedDeal(
          Game,
          player,
          playerCard,
          playerSource,
          targetPlayer,
          callback
        );
      } else {
        forcedDeal({
          Game,
          player,
          playerCard,
          playerSource,
          targetPlayer,
          targetPlayerCard,
          targetPlayerSource
        });
        callback({ card });
      }
    }
  });
};

const forcedDeal = ({
  Game,
  player,
  playerCard,
  playerSource,
  targetPlayer,
  targetPlayerCard,
  targetPlayerSource
}) => {
  if (
    !gameActions.getPropertySetStatus({
      Game,
      propertySet: playerSource.pile
    }) &&
    !gameActions.getPropertySetStatus({
      Game,
      propertySet: targetPlayerSource.pile
    })
  ) {
    gameActions.swapPropertyCards({
      source: { card: playerCard, pile: playerSource.pile, player },
      destination: {
        card: targetPlayerCard,
        pile: targetPlayerSource.pile,
        player: targetPlayer
      }
    });
  }
};

module.exports = playForcedDeal;
