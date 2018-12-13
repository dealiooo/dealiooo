import * as gameActions from '../actions';

export const computeWinCondition = (player = null) => {
  if (null !== player) {
    if (gameActions.getHasThreeFullPropertySets(player)) {
      window.winner = player;
      return true;
    }
  }
  if (1 === window.players.length) {
    window.winner = window.players[0];
    return true;
  }
  return false;
};
