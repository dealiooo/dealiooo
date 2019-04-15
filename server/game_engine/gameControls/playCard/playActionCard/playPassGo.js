const gameActions = require('../../../gameActions');

module.exports = ({Game, player, card, callback}) => {
  gameActions.moveCard({source: player.hand, destination: player.field.actionCards, card});
  gameActions.onNonCounterCardPlayed({Game, card});
  for (let i = 0; i < 2; i++) {
    gameActions.drawCard({Game, player});
  }
  callback({card});
};
