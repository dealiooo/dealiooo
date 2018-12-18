import * as gameActions from '../actions';

export const changeCardMainColor = (card, color) => {
  gameActions.switchColor(card, color);
};
