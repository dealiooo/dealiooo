const gameActions = require('../../actions');

const playMoneyCard = (Game, player, card, callback) => {
  gameActions.moveCard(player.hand, player.field.bank_cards, card);
  callback(null, card);
};

module.exports = playMoneyCard;
