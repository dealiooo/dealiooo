const gameActions = require('../../../gameActions');
const userActions = require('../../../userActions');
const userControls = require('../../../userControls');

const processPropertySet = (
  Game,
  player,
  card,
  destinations,
  indexString,
  callback
) => {
  if (
    gameActions.getPropertySetStatus(Game, destinations[parseInt(indexString)])
  ) {
    player.field.property_cards.push([]);
    gameActions.movePile(
      destinations[parseInt(indexString)],
      player.field.property_cards[player.field.property_cards.length - 1]
    );
    gameActions.removeEmptyPropertySets(pickedPlayer);
    callback(null, card);
  } else {
    playDealBreaker(player, card, callback);
  }
};

module.exports = (Game, player, card, callback) => {
  userControls.pickTargetPlayer(Game, player, (error, pickedPlayer) => {
    if (error) {
      callback(error);
    } else {
      let { destinations, destinationIndexes } = gameActions.getDestinations[
        'all'
      ](pickedPlayer, card, pickedPlayer.field.property_cards);
      userActions.pickOption(Game, {
        player,
        options: destinationIndexes,
        callback: (error, indexString) => {
          if (error) {
            callback(error);
          } else {
            processPropertySet(
              Game,
              player,
              card,
              destinations,
              indexString,
              callback
            );
          }
        }
      });
    }
  });
};
