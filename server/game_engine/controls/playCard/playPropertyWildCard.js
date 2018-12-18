const gameActions = require('../../actions');
const userActions = require('../../userActions');

const playPropertyCard = require('./playPropertyCard');

module.exports = playPropertyWildCard = (Game, player, card, callback) => {
  userActions.pick_card_color(Game, player, card, (error, color) => {
    if (error) {
      callback(error);
    } else {
      gameActions.switchColor(card, color);
      playPropertyCard(Game, player, card, callback);
    }
  });
};
