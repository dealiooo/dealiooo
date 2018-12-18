const gameActions = require('../../gameActions');
const userControls = require('../../userControls');
const playPropertyCard = require('./playPropertyCard');

module.exports = playPropertyWildCard = (Game, player, card, callback) => {
  userControls.pickCardColor(Game, player, card, (error, color) => {
    if (error) {
      callback(error);
    } else {
      gameActions.switchColor(card, color);
      playPropertyCard(Game, player, card, callback);
    }
  });
};
