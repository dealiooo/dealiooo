import * as gameActions from '../../../actions';
import * as userActions from '../../../userActions';

export const playSlyDeal = (Game, player, card, callback) => {
  // steal a property from the player of your choice (cannot be part of a full set)
  userActions.pick_target_player(Game, player, (error, pickedPlayer) => {
    if (error) {
      callback(error);
    } else {
      userActions.pick_field_card(
        Game,
        pickedPlayer,
        ['property_cards', 'building_cards'],
        (error, card, source) => {
          if (error) {
            callback(error);
          } else if ('property_cards' === source.pileName) {
            if (gameActions.getPropertySetStatus(Game, source.pile)) {
              playSlyDeal(player, card, callback);
            } else {
              player.field.property_cards.push([]);
              gameActions.moveCard(
                source.pile,
                player.field.property_cards[
                  player.field.property_cards.length - 1
                ],
                card
              );
              gameActions.removeEmptyPropertySets(pickedPlayer);
              callback(null, card);
            }
          } else {
            // it is a building card in a building pile
            gameActions.moveCard(
              source.pile,
              player.field[source.pileName],
              card
            );
            callback(null, card);
          }
        }
      );
    }
  });
};
