import * as gameActions from '../../../actions';
import * as userActions from '../../../userActions';

export const playForcedDeal = (player, card, callback) => {
  // swap any property with another player (cannot be part of a full set)
  userActions.pick_field_card(
    player,
    ['property_cards', 'building_cards'],
    (error, playerCard, playerSource) => {
      if (error) {
        callback(error);
      } else {
        userActions.pick_target_player(player, (error, targetPlayer) => {
          if (error) {
            callback(error);
          } else {
            userActions.pick_field_card(
              targetPlayer,
              ['property_cards', 'building_cards'],
              (error, targetPlayerCard, targetPlayerSource) => {
                if (error) {
                  callback(error);
                } else {
                  if (
                    !gameActions.getPropertySetStatus(playerSource.pile) &&
                    !gameActions.getPropertySetStatus(targetPlayerSource.pile)
                  ) {
                    gameActions.swapPropertyCards(
                      { card: playerCard, pile: playerSource.pile, player },
                      {
                        card: targetPlayerCard,
                        pile: targetPlayerSource.pile,
                        player: targetPlayer
                      }
                    );
                  }
                  callback(null, card);
                }
              }
            );
          }
        });
      }
    }
  );
};
