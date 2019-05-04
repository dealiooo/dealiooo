const gameActions = require('../../gameActions');
const userActions = require('../../userActions');

module.exports = ({Game, player, card, callback}) => {
  player.field.propertyCards.push([]);
  let { destinations, destinationIndexes } = gameActions.getDestinations[
    card.type
  ]({Game, player, card, source: player.field.propertyCards});
  userActions.pickOption({
    Game,
    player,
    options: destinationIndexes,
    callback: ({error, option, cancelled, forced}) => {
      if (error) {
        callback({error});
      } else if (cancelled) {
        callback({cancelled});
      } else {
        gameActions.moveCard({
          source: player.hand,
          destination: destinations[parseInt(option)],
          card
        });
        gameActions.onNonCounterCardPlayed({Game, card});
        gameActions.removeEmptyPropertySets({player});
        callback({card, forced});
      }
    }
  });
};
