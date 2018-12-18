import * as gameActions from '../actions';

export const startTurn = (Game, player) => {
  for (let i = 0; i < 2; i++) {
    gameActions.drawCard(Game, player);
  }
};
