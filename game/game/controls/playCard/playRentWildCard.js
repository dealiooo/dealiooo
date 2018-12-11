import * as gameActions from '../../actions';
import * as userActions from '../../userActions';

export const playRentWildCard = (player, card, callback) => {
  userActions.pick_option({
    player,
    options: ['bank', 'action'],
    callback: (error, option) => {
      if (error) {
        callback(error);
      } else if (option === 'bank') {
        gameActions.moveCard(player.hand, player.field.bank_cards, card);
        callback(null, card);
      } else {
        userActions.pick_card_color(player, card, (error, color) => {
          if (error) {
            callback(error);
          } else {
            gameActions.switchColor(card, color);
            console.log(card);
            let {
              destinations,
              destinationIndexes
            } = gameActions.getDestinations[card.type](
              player,
              card,
              player.hand
            );
            if (destinations.length) {
              userActions.pick_option({
                player,
                options: destinationIndexes,
                callback: (error, value) => {
                  if (error) {
                    callback(error);
                  } else {
                    gameActions.moveCard(
                      player.hand,
                      player.field.action_cards,
                      card
                    );
                    userActions.pick_target_player(
                      player,
                      (error, target_player) => {
                        if (error) {
                          callback(error);
                        } else {
                          gameActions.payRent(
                            target_player,
                            player,
                            gameActions.getRentValue(
                              player,
                              destinations[parseInt(value)]
                            ),
                            error => {
                              if (error) {
                                callback(error);
                              } else {
                                callback(null, card);
                              }
                            }
                          );
                        }
                      }
                    );
                  }
                }
              });
            } else {
              console.log(
                'cannot play that rent color: no property set with matching color'
              );
              callback(new Error().stack);
            }
          }
        });
      }
    }
  });
};
