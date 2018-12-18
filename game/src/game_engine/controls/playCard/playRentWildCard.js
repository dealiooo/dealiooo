const gameActions = require('../../actions');
const userActions = require('../../userActions');

const playRentWildCard = (Game, player, card, callback) => {
  userActions.pick_option(Game, {
    player,
    options: ['bank', 'action'],
    callback: (error, option) => {
      if (error) {
        callback(error);
      } else if (option === 'bank') {
        gameActions.moveCard(player.hand, player.field.bank_cards, card);
        callback(null, card);
      } else {
        userActions.pick_card_color(Game, player, card, (error, color) => {
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
              userActions.pick_option(Game, {
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
                            Game,
                            target_player,
                            player,
                            gameActions.getRentValue(
                              Game,
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

module.exports = playRentWildCard;
