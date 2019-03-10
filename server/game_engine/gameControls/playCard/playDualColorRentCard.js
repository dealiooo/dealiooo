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
        gameActions.onNonCounterCardPlayed(Game);
        collectRent(Game, player, card, destinations, value, callback);
      }
    }
  });
};

const collectRent = (Game, player, card, destinations, value, callback) => {
  var playerActionCounter = i => {
    if (player.id !== Game.players[i].id) {
      gameActions.avoidAction(Game, Game.players[i], player, (_, avoid) => {
        if (avoid) {
          done(i);
        } else {
          gameActions.payRent(
            Game,
            Game.players[i],
            player,
            gameActions.getRentValue(Game, Game.players[i], player, destinations[parseInt(value)]),
            error => {
              if (error) {
                callback(error);
              } else {
                done(i);
              }
            }
          );
        }
      });
    } else {
      done(i);
    }
  }
  var done = i => {
    if (i == Game.players.length) {
      callback(null, card);
    } else {
      playerActionCounter(i + 1);
    }
  }
  playerActionCounter(0);
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
