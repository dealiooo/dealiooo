const gameActions = require('../../gameActions');

module.exports = ({Game, player, card, callback}) => {
  gameActions.moveCard({source: player.hand, destination: player.field.bankCards, card});
  gameActions.onNonCounterCardPlayed({Game, card});
  callback({card});
};
