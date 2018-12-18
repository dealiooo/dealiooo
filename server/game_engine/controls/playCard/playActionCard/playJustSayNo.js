const gameActions = require('../../../actions');

module.exports = (Game, player, card, callback) => {
  gameActions.moveCard(player.hand, player.field.bank_cards, card);
  callback(null, card);
};
