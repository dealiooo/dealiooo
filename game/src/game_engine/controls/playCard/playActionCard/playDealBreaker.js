const gameActions = require('../../../actions');
const userActions = require('../../../userActions');

const playDealBreaker = (Game, player, card, callback) => {
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
  /*
   * Steal a complete (must be complete set) set of properties from any player
   * (includes any houses & hotels)
   * A player using the Dealbreaker card for a completed property set gets everything that
   * has been previously laid with that completed set. So if any houses or hotels have been
   * laid on top of the completed property set that you are asking for, you would get the
   * full property set including any houses/hotels when using the Deal Breaker card.
   * You can only steal a house or hotel on a completed set with a deal breaker.
   * If a house/hotel is on a completed set, it cannot be taken with a Force Deal or Sly Deal.
   * If a player has a house/hotel on the table that is not part of a full completed set,
   * then a force deal or sly deal can be used to steel it.
   */
};

module.exports = playDealBreaker;
