const playDealBreaker = require('./playDealBreaker');
const playDebtCollector = require('./playDebtCollector');
const playDoubleTheRent = require('./playDoubleTheRent');
const playForcedDeal = require('./playForcedDeal');
const playItsMyBirthday = require('./playItsMyBirthday');
const playJustSayNo = require('./playJustSayNo');
const playPassGo = require('./playPassGo');
const playSlyDeal = require('./playSlyDeal');

const gameActions = require('../../../gameActions');
const userActions = require('../../../userActions');

module.exports = (Game, player, card, callback) => {
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
  userActions.pickOption(Game, {
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
        play[card.name](Game, player, card, (_, card) => {
          callback(null, card);
        });
      }
    }
  });
};