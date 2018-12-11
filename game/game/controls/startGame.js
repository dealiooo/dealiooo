import globalVars from '../globalVars';
import * as gameActions from '../actions';

export const startGame = () => {
  let numOfPlayer = 2;
  globalVars(numOfPlayer);
  for (let i = 0; i < 5 * numOfPlayer; i++) {
    gameActions.drawCard(window.players[i % numOfPlayer]);
  }
};
