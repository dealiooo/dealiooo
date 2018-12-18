const gameActions = require('../../actions');
const userActions = require('../../userActions');

module.exports = (Game, player, card, callback) => {
  userActions.pick_option(Game, {
    player,
    options: ['bank', 'action'],
    callback: (error, option) => {
      if (error) {
        callback(error);
      } else if ('bank' === option) {
        gameActions.moveCard(player.hand, player.field.bank_cards, card);
        callback(null, card);
      } else {
        userActions.pick_card_color(Game, player, card, (error, color) => {
          if (error) {
            callback(error);
          } else {
            gameActions.switchColor(card, color);
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
                    for (let i = 0; i < Game.players.length; i++) {
                      let done = i => {
                        if (i + 1 === Game.players.length) {
                          callback(null, card);
                        }
                      };
                      if (Game.players[i].id === player.id) {
                        done();
                      } else {
                        gameActions.payRent(
                          Game,
                          Game.players[i],
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
                              done();
                            }
                          }
                        );
                      }
                    }
                    callback(null, card);
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
