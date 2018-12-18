import * as gameActions from '../../../actions';
import * as userActions from '../../../userActions';

export const playDebtCollector = (Game, player, card, callback) => {
  // force any player to pay you $5M
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
