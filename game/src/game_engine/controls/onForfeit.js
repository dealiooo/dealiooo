import * as gameActions from '../actions';

// ui: do you want to keep playing? surrender?
// triggered by: closing tab / clicking surrender button
export const onForfeit = (Game, player) => {
  if (1 === Game.player_count) {
    Game.winner = Game.players[0];
  }
};
