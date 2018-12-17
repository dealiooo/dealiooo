import * as gameActions from '../../actions';
import * as userActions from '../../userActions';

import { playPropertyCard } from './playPropertyCard';

export const playPropertyWildCard = (player, card, callback) => {
  userActions.pick_card_color(player, card, (error, color) => {
    if (error) {
      callback(error);
    } else {
      gameActions.switchColor(card, color);
      playPropertyCard(player, card, callback);
    }
  });
};
