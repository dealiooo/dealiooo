const gameActions = require('../../gameActions');
const userActions = require('../../userActions');
const userControls = require('../../userControls');

const playAsMoney = (player, card, callback) => {
  gameActions.moveCard(player.hand, player.field.bank_cards, card);
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
      ](player, card, player.hand);
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
      if (error) {
        callback(error);
      } else {
        gameActions.moveCard(player.hand, player.field.action_cards, card);
        collectRent(Game, player, card, destinations, value, callback);
      }
    }
  });
};

const collectRent = (Game, player, card, destinations, value, callback) => {
  userControls.pickTargetPlayer(player, (error, target_player) => {
    if (error) {
      callback(error);
    } else {
      gameActions.payRent(
        Game,
        target_player,
        player,
        gameActions.getRentValue(Game, player, destinations[parseInt(value)]),
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
