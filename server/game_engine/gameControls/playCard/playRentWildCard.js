const gameActions = require('../../gameActions');
const userActions = require('../../userActions');
const userControls = require('../../userControls');

const playAsMoney = (player, card, callback) => {
  gameActions.moveCard(player.hand, player.field.bank_cards, card);
  gameActions.onNonCounterCardPlayed(Game);
  callback(null, card);
};

const playAsAction = (Game, player, card, callback) => {
  userControls.pickCardColor(Game, player, card, (error, color) => {
    if (error) {
      callback(error);
    } else {
      gameActions.switchColor(card, color);
      let { destinations, destinationIndexes } = gameActions.getDestinations[
        card.type
      ](Game, player, card, player.hand);
      if (destinations.length) {
        pickPropertySetToRent(
          Game,
          player,
          card,
          destinations,
          destinationIndexes,
          callback
        );
      } else {
        callback('cannot play rent card: no property set with matching color');
      }
    }
  });
};

const pickPropertySetToRent = (
  Game,
  player,
  card,
  destinations,
  destinationIndexes,
  callback
) => {
  userActions.pickOption(Game, {
    player,
    options: destinationIndexes,
    callback: (error, value) => {
      gameActions.moveCard(player.hand, player.field.action_cards, card);
      gameActions.onNonCounterCardPlayed(Game);
      if (error) {
        callback(error);
      } else {
        collectRent(Game, player, card, destinations, value, callback);
      }
    }
  });
};

const collectRent = (Game, player, card, destinations, value, callback) => {
  userControls.pickTargetPlayer(player, (error, targetPlayer) => {
    if (error) {
      callback(error);
    } else {
      gameActions.avoidAction(Game, targetPlayer, player, (_, avoid) => {
        if (avoid) {
          callback(null, _);
        } else {
          gameActions.payRent(
            Game,
            targetPlayer,
            player,
            gameActions.getRentValue(Game, targetPlayer, player, destinations[parseInt(value)]),
            error => {
              if (error) {
                callback(error);
              } else {
                callback(null, card);
              }
            }
          );
        }
      });
    }
  });
};

module.exports = (Game, player, card, callback) => {
  userActions.pickOption(Game, {
    player,
    options: ['bank', 'action'],
    callback: (error, option) => {
      if (error) {
        callback(error);
      } else if (option === 'bank') {
        playAsMoney(player, card, callback);
      } else {
        playAsAction(Game, player, card, callback);
      }
    }
  });
};
