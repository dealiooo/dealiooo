const gameActions = require('../../../gameActions');
const userControls = require('../../../userControls');

const pickCardToDealBreak = (
  Game,
  player,
  playerCard,
  playerSource,
  targetPlayer,
  callback
) => {
  userControls.pickFieldCard(
    Game,
    targetPlayer,
    ['property_cards', 'building_cards'],
    (error, targetPlayerCard, targetPlayerSource) => {
      if (error) {
        callback(error);
      } else {
        dealBreak(
          Game,
          player,
          playerCard,
          playerSource,
          targetPlayer,
          targetPlayerCard,
          targetPlayerSource
        );
        callback(null, card);
      }
    }
  );
};

const dealBreak = (
  Game,
  player,
  playerCard,
  playerSource,
  targetPlayer,
  targetPlayerCard,
  targetPlayerSource
) => {
  if (
    !gameActions.getPropertySetStatus(Game, playerSource.pile) &&
    !gameActions.getPropertySetStatus(Game, targetPlayerSource.pile)
  ) {
    gameActions.swapPropertyCards(
      { card: playerCard, pile: playerSource.pile, player },
      {
        card: targetPlayerCard,
        pile: targetPlayerSource.pile,
        player: targetPlayer
      }
    );
  }
};

module.exports = (Game, player, card, callback) => {
  userControls.pickFieldCard(
    Game,
    player,
    ['property_cards', 'building_cards'],
    (error, playerCard, playerSource) => {
      if (error) {
        callback(error);
      } else {
        userControls.pickTargetPlayer(player, (error, targetPlayer) => {
          if (error) {
            callback(error);
          } else {
            pickCardToDealBreak(
              Game,
              player,
              playerCard,
              playerSource,
              targetPlayer,
              callback
            );
          }
        });
      }
    }
  );
};