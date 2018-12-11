import * as gameActions from '../actions';

// ui: do you want to keep playing? surrender?
// triggered by: closing tab / clicking surrender button
export const onForfeit = player => {
  if (1 === window.player_count) {
    window.winner = window.players[0];
  }
};
