import { playDealBreaker } from './playDealBreaker';
import { playDebtCollector } from './playDebtCollector';
import { playDoubleTheRent } from './playDoubleTheRent';
import { playForcedDeal } from './playForcedDeal';
import { playItsMyBirthday } from './playItsMyBirthday';
import { playJustSayNo } from './playJustSayNo';
import { playPassGo } from './playPassGo';
import { playSlyDeal } from './playSlyDeal';

import * as gameActions from '../../../actions';
import * as userActions from '../../../userActions';

export const playActionCard = (player, card, callback) => {
  const play = {
    'deal-beaker': playDealBreaker,
    'debt-collector': playDebtCollector,
    'double-the-rent': playDoubleTheRent,
    'forced-deal': playForcedDeal,
    'its-my-birthday': playItsMyBirthday,
    'just-say-no': playJustSayNo,
    'sly-deal': playSlyDeal,
    'pass-go': playPassGo
  };
  userActions.pick_option({
    player,
    options: ['bank', 'action'],
    callback: (error, option) => {
      if (error) {
        callback(error);
      } else if ('bank' === option) {
        gameActions.moveCard(player.hand, player.field.bank_cards, card);
        callback(null, card);
      } else {
        gameActions.moveCard(player.hand, player.field.action_cards, card);
        play[card.name](player, card, (error, card) => {
          if (error) {
            gameActions.moveCard(player.field.action_cards, player.hand, card);
            callback(error);
          } else {
            callback(null, card);
          }
        });
      }
    }
  });
};
