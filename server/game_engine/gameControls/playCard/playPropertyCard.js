const gameActions = require('../../gameActions');
const userActions = require('../../userActions');

module.exports = (Game, player, card, callback) => {
  player.field.property_cards.push([]);
  let { destinations, destinationIndexes } = gameActions.getDestinations[
    card.type
  ](Game, player, card, player.field.property_cards);
  userActions.pickOption(Game, {
    player,
    options: destinationIndexes,
    callback: (error, indexString) => {
      if (error) {
        callback(error);
      } else {
        gameActions.moveCard(
          player.hand,
          destinations[parseInt(indexString)],
          card
        );
        gameActions.onNonCounterCardPlayed(Game);
        gameActions.removeEmptyPropertySets(player);
        callback(null, card);
      }
    }
  });
};
