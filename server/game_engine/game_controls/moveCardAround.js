const gameActions = require('./../game_actions');
const userControls = require('./../user_controls');

const moveCard = (player, card, callback) =>
  gameActions.getDestinations[card.type]({ player, card }).then(
    destinations => {
      if (destinations.length) {
        return userControls.pick_option({
          player,
          options: destinations.map(e => e.id),
          callback: (error, id) => {
            if (error) {
              return callback(error);
            } else {
              return gameActions
                .moveCard(card, destinations.filter(e => id === e.id)[0])
                .then(_ => gameActions.removeEmptyPropertySets(player))
                .then(_ => callback(null));
            }
          }
        });
      } else {
        return callback(null);
      }
    }
  );

module.exports = (player, callback) =>
  userControls.pick_movable_card(player, (error, card, pile) => {
    if (error) {
      return callback(error);
    } else {
      if (card.colors.length) {
        userControls.pick_card_color(player, card, (error, color) => {
          if (error) {
            return callback(error);
          } else {
            return gameActions
              .switchColor(card, color)
              .then(_ => moveCard(player, card, callback));
          }
        });
      } else {
        return moveCard(player, card, callback);
      }
    }
  });
