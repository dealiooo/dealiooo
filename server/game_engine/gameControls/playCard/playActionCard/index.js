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

module.exports = ({ Game, player, card, callback }) => {
  const play = {
    'deal-breaker': playDealBreaker,
    'debt-collector': playDebtCollector,
    'double-the-rent': playDoubleTheRent,
    'forced-deal': playForcedDeal,
    'its-my-birthday': playItsMyBirthday,
    'just-say-no': playJustSayNo,
    'sly-deal': playSlyDeal,
    'pass-go': playPassGo
  };
  if ('just-say-no' === card.name) {
    playJustSayNo({
      Game,
      player,
      card,
      callback: ({ card }) => {
        callback({ card });
      }
    });
  } else {
    userActions.pickOption({
      Game,
      requiredPlayerId: player.id,
      message: 'play as money or action?',
      options: ['bank', 'action'],
      callback: ({ error, option, cancelled, forced }) => {
        if (error || cancelled || forced) {
          callback({ error, cancelled, forced });
        } else if ('bank' === option) {
          gameActions.moveCard({
            source: player.hand,
            destination: player.field.bankCards,
            card
          });
          gameActions.onNonCounterCardPlayed({ Game, card });
          callback({ card });
        } else {
          play[card.name]({
            Game,
            player,
            card,
            callback: ({ error, card, cancelled, forced }) => {
              callback({ error, card, cancelled, forced });
            }
          });
        }
      }
    });
  }
};
