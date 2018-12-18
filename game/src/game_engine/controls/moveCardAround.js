const gameActions = require('../actions');
const userActions = require('../userActions');

// Only applies to Property Set & Building
const moveCardAround = (Game, player, callback) => {
  let pileNames = ['property_cards', 'building_cards'];
  userActions.pick_field_card(
    Game,
    player,
    pileNames,
    (error, card, source) => {
      if (error) {
        callback(error);
      } else {
        const done = () => {
          let {
            destinations,
            destinationIndexes
          } = gameActions.getDestinations[card.type](player, card, source.pile);
          if (destinations.length) {
            userActions.pick_option(Game, {
              player,
              options: destinationIndexes,
              callback: (error, value) => {
                if (error) {
                  callback(error);
                } else {
                  gameActions.moveCard(
                    source.pile,
                    destinations[parseInt(value)],
                    card
                  );
                  gameActions.removeEmptyPropertySets(player);
                  callback(null);
                }
              }
            });
          } else {
            callback(null);
          }
        };
        if (card.colors.length) {
          userActions.pick_card_color(Game, player, card, (error, color) => {
            if (error) {
              callback(error);
            } else {
              gameActions.switchColor(card, color);
              done();
            }
          });
        } else {
          done();
        }
      }
    }
  );
};

module.exports = moveCardAround;
