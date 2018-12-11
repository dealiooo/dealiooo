import * as gameActions from '../actions';

export const changeCardMainColor = (card, color) => {
  if (gameActions.getCanSwitchColor()) {
    gameActions.switchColor(card, color);
  }
};
