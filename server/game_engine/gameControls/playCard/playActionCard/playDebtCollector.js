const gameActions = require('../../../gameActions');
const userControls = require('../../../userControls');

module.exports = (Game, player, card, callback) => {
  userControls.pickTargetPlayer(Game, player, (error, pickedPlayer) => {
    if (error) {
      callback(error);
    } else {
      gameActions.payRent(Game, pickedPlayer, player, 5, error => {
        if (error) {
          callback(error);
        } else {
          callback(null, card);
        }
      });
    }
  });
};
