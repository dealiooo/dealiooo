import * as gameActions from '../../actions';
import * as userActions from '../../userActions';

import { playPropertyCard } from './playPropertyCard';

export const playPropertyWildCard = (Game, player, card, callback) => {
  userActions.pick_card_color(Game, player, card, (error, color) => {
    if (error) {
      callback(error);
    } else {
      gameActions.switchColor(card, color);
      playPropertyCard(Game, player, card, callback);
    }
  });
};
