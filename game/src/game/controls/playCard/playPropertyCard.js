import * as gameActions from '../../actions';
import * as userActions from '../../userActions';

export const playPropertyCard = (player, card, callback) => {
  player.field.property_cards.push([]);
  let { destinations, destinationIndexes } = gameActions.getDestinations[
    card.type
  ](player, card, player.field.property_cards);
  userActions.pick_option({
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
        gameActions.removeEmptyPropertySets(player);
        callback(null, card);
      }
    }
  });
};
