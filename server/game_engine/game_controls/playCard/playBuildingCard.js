const gameActions = require('./../../game_actions');
const userActions = require('./../../user_actions');

const OPTIONS = ['bank', 'properties'];

const playAsMoney = (player, card, callback) =>
  gameActions.moveCardToBank(player, card).then(_ => callback(null, card));

const playAsProperty = (player, card, callback) =>
  gameActions.getDestinations[card.type]({ player, card }).then(
    destinations => {
      if (destinations.length) {
        return userActions.pick_option({
          player,
          options: destinations.map(e => e.id),
          callback: (error, id) => {
            if (error) {
              return callback(error);
            } else {
              return gameActions
                .moveCard(card, destinations.filter(e => id === e.id)[0])
                .then(_ => callback(null, card));
            }
          }
        });
      } else {
        return callback(new Error().stack);
      }
    }
  );

module.exports = (player, card, callback) =>
  userActions.pick_option({
    player,
    options: OPTIONS,
    callback: (error, option) => {
      if (error) {
        return callback(error);
      } else {
        if (OPTIONS[0] === option) {
          return playAsMoney(player, card, callback);
        } else {
          return playAsProperty(player, card, callback);
        }
      }
    }
  });
