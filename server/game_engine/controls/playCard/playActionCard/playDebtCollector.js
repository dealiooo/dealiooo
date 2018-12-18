const gameActions = require('../../../actions');
const userActions = require('../../../userActions');

module.exports = (Game, player, card, callback) => {
  userActions.pick_target_player(Game, player, (error, pickedPlayer) => {
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
