const gameActions = require('../gameActions');
const userActions = require('../userActions');
const userControls = require('../userControls');

const moveCard = (player, card, source, callback) => {
  let { destinations, destinationIndexes } = gameActions.getDestinations[
    card.type
  ](player, card, source.pile);
  if (destinations.length) {
    userActions.pickOption(Game, {
      player,
      options: destinationIndexes,
      callback: (error, value) => {
        if (error) {
          callback(error);
        } else {
          gameActions.moveCard(
            source.pile,
            destinations[parseInt(value)],
            card
          );
          gameActions.removeEmptyPropertySets(player);
          callback(null);
        }
      }
    });
  } else {
    callback(null);
  }
};

module.exports = (Game, player, callback) => {
  let pileNames = ['property_cards', 'building_cards'];
  userControls.pickFieldCard(Game, player, pileNames, (error, card, source) => {
    if (error) {
      callback(error);
    } else {
      if (card.colors.length) {
        userControls.pickCardColor(Game, player, card, (error, color) => {
          if (error) {
            callback(error);
          } else {
            gameActions.switchColor(card, color);
            moveCard(player, card, source, callback);
          }
        });
      } else {
        moveCard(player, card, source, callback);
      }
    }
  });
};
