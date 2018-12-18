import * as gameActions from '../../../actions';

export const playPassGo = (Game, player, card, callback) => {
  // draw 2 extra cards
  for (let i = 0; i < 2; i++) {
    gameActions.drawCard(Game, player);
  }
  callback(null, card);
};
