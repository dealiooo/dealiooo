import * as gameActions from '../../../actions';
import * as userActions from '../../../userActions';

export const playDebtCollector = (player, card, callback) => {
  // force any player to pay you $5M
  userActions.pick_target_player(player, (error, pickedPlayer) => {
    if (error) {
      callback(error);
    } else {
      gameActions.payRent(pickedPlayer, player, 5, error => {
        if (error) {
          callback(error);
        } else {
          callback(null, card);
        }
      });
    }
  });
};
