const gameActions = require('../../gameActions');
const userActions = require('../../userActions');

module.exports = ({ Game, player, card, callback }) => {
  gameActions.addEmptyPropertySet({ player });
  let { destinations, destinationIndexes } = gameActions.getDestinations[
    card.type
  ]({ Game, player, card, source: player.field.propertyCards });
  userActions.pickOption({
    Game,
    requiredPlayerId: player.id,
    message: 'picking a destination',
    options: destinationIndexes,
    callback: ({ error, option: destinationIndex, cancelled, forced }) => {
      if (error) {
        callback({ error });
      } else if (cancelled) {
        callback({ cancelled });
      } else {
        gameActions.moveCard({
          source: player.hand,
          destination:
            destinations[destinationIndexes.indexOf(destinationIndex)],
          card
        });
        gameActions.onNonCounterCardPlayed({ Game, card });
        gameActions.removeEmptyPropertySets({ player });
        callback({ card, forced });
      }
    }
  });
};
