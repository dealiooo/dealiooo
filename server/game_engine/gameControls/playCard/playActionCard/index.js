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
  if ('just-say-no' === card.name) {
    playJustSayNo(Game, player, card, (_, card) => {
      callback(null, card);
    })
  } else {
    userActions.pickOption(Game, {
      player,
      options: ['bank', 'action'],
      callback: (error, option) => {
        console.log('PICK OPTION', option);
        if (error) {
          console.log('ERROR PICK OPTIONS', error);
          callback(error);
        } else if ('bank' === option) {
          gameActions.moveCard(player.hand, player.field.bank_cards, card);
          gameActions.onNonCounterCardPlayed(Game);
          callback(null, card);
        } else {
          gameActions.moveCard(player.hand, player.field.action_cards, card);
          gameActions.onNonCounterCardPlayed(Game);
          play[card.name](Game, player, card, (_, card) => {
            callback(null, card);
          });
        }
      }
    });
  }
};
