const gameActions = require('../../../actions');
const userActions = require('../../../userActions');

module.exports = (Game, player, card, callback) => {
  userActions.pick_target_player(Game, player, (error, pickedPlayer) => {
    if (error) {
      callback(error);
    } else {
      let { destinations, destinationIndexes } = gameActions.getDestinations[
        'all'
      ](pickedPlayer, card, pickedPlayer.field.property_cards);
      userActions.pick_option(Game, {
        player,
        options: destinationIndexes,
        callback: (error, indexString) => {
          if (error) {
            callback(error);
          } else {
            if (
              gameActions.getPropertySetStatus(
                Game,
                destinations[parseInt(indexString)]
              )
            ) {
              player.field.property_cards.push([]);
              gameActions.movePile(
                destinations[parseInt(indexString)],
                player.field.property_cards[
                  player.field.property_cards.length - 1
                ]
              );
              gameActions.removeEmptyPropertySets(pickedPlayer);
              callback(null, card);
            } else {
              playDealBreaker(player, card, callback);
            }
          }
        }
      });
    }
  });
};
