const gameActions = require('../../../actions');
const userActions = require('../../../userActions');

const { playDealBreaker } = require('./playDealBreaker');
const { playDebtCollector } = require('./playDebtCollector');
const { playDoubleTheRent } = require('./playDoubleTheRent');
const { playForcedDeal } = require('./playForcedDeal');
const { playItsMyBirthday } = require('./playItsMyBirthday');
const { playJustSayNo } = require('./playJustSayNo');
const { playPassGo } = require('./playPassGo');
const { playSlyDeal } = require('./playSlyDeal');

const playActionCard = (Game, player, card, callback) => {
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
  userActions.pick_option(Game, {
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
        play[card.name](Game, player, card, (error, card) => {
          if (error) {
            console.log(
              `card is not played properly | card id:${card.id} | card name: ${
                card.name
              }`
            );
            console.log(error);
            callback(null, card);
          } else {
            callback(null, card);
          }
        });
      }
    }
  });
};

module.exports = playActionCard;
