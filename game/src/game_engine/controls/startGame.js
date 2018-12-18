import globalVars from '../globalVars';
import * as gameActions from '../actions';

export const startGame = () => {
  // TODO: get player ids
  let player_ids = [1, 2];
  let Game = globalVars(player_ids);
  for (let i = 0; i < 5 * player_ids.length; i++) {
    gameActions.drawCard(Game, Game.players[i % player_ids.length]);
  }
  return Game;
};
