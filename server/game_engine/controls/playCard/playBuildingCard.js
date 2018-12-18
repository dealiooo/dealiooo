const gameActions = require('../../actions');
const userActions = require('../../userActions');

module.exports = (Game, player, card, callback) => {
  userActions.pick_option(Game, {
    player,
    options: ['bank', 'properties'],
    callback: (error, option) => {
      if (error) {
        callback(error);
      } else {
        if ('bank' === option) {
          gameActions.moveCard(player.hand, player.field.bank_cards, card);
          callback(null, card);
        } else {
          let {
            destinations,
            destinationIndexes
          } = gameActions.getDestinations[card.type](player, card, player.hand);
          if (destinations.length) {
            userActions.pick_option(Game, {
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
            console.log('cannot play that building card: no destination');
            callback(new Error().stack);
          }
        }
      }
    }
  });
};
