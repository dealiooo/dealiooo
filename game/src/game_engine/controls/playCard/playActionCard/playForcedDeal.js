const gameActions = require('../../../actions');
const userActions = require('../../../userActions');

const playForcedDeal = (Game, player, card, callback) => {
  // swap any property with another player (cannot be part of a full set)
  userActions.pick_field_card(
    Game,
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
              Game,
              targetPlayer,
              ['property_cards', 'building_cards'],
              (error, targetPlayerCard, targetPlayerSource) => {
                if (error) {
                  callback(error);
                } else {
                  if (
                    !gameActions.getPropertySetStatus(
                      Game,
                      playerSource.pile
                    ) &&
                    !gameActions.getPropertySetStatus(
                      Game,
                      targetPlayerSource.pile
                    )
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

module.exports = playForcedDeal;
