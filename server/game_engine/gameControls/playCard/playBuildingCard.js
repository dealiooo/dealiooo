const gameActions = require('../../gameActions');
const userActions = require('../../userActions');

const playAsMoney = (player, card, callback) => {
  gameActions.moveCard(player.hand, player.field.bank_cards, card);
  callback(null, card);
};

const playAsProperty = (Game, player, card, callback) => {
  let { destinations, destinationIndexes } = gameActions.getDestinations[
    card.type
  ](Game, player, card, player.hand);
  if (destinations.length) {
    userActions.pickOption(Game, {
      player,
      options: destinationIndexes,
      callback: (error, value) => {
        if (error) {
          callback(error);
        } else {
          gameActions.moveCard(
            player.hand,
            destinations[parseInt(value)],
            card
          );
          callback(null, card);
        }
      }
    });
  } else {
    callback('cannot play that building card: no destination');
  }
};

module.exports = (Game, player, card, callback) => {
  userActions.pickOption(Game, {
    player,
    options: ['bank', 'properties'],
    callback: (error, option) => {
      if (error) {
        callback(error);
      } else {
        if ('bank' === option) {
          playAsMoney(player, card, callback);
        } else {
          playAsProperty(Game, player, card, callback);
        }
      }
    }
  });
};
