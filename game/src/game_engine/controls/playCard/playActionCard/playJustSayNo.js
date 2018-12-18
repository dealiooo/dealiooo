const gameActions = require('../../../actions');

const playJustSayNo = (Game, player, card, callback) => {
  // use any time when an action card is played against you
  // TODO:

  // treat it as a money card for now...
  gameActions.moveCard(player.hand, player.field.bank_cards, card);
  callback(null, card);
};

module.exports = playJustSayNo;
