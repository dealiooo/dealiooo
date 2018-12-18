import * as gameActions from '../../actions';
import * as userActions from '../../userActions';

// House & Hotel cards should go to a property-set accordingly
// If they cannot, they should go to building-cards pile
// property_set_index can be null if not playing house or hotel card
export const playBuildingCard = (Game, player, card, callback) => {
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
