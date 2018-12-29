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
        callback('cannot play rent: no property set with matching color');
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
  for (let i = 0; i < Game.players.length; i++) {
    let done = i => {
      if (i + 1 === Game.players.length) {
        callback(null, card);
      }
    };
    if (Game.players[i].id === player.id) {
      done();
    } else {
      gameActions.payRent(
        Game,
        Game.players[i],
        player,
        gameActions.getRentValue(Game, player, destinations[parseInt(value)]),
        error => {
          if (error) {
            callback(error);
          } else {
            done();
          }
        }
      );
    }
  }
};

module.exports = (Game, player, card, callback) => {
  userActions.pickOption(Game, {
    player,
    options: ['bank', 'action'],
    callback: (error, option) => {
      if (error) {
        callback(error);
      } else if ('bank' === option) {
        playAsMoney(player, card, callback);
      } else {
        playAsAction(Game, player, card, callback);
      }
    }
  });
};
