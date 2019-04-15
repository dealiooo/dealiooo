const gameActions = require('../../../gameActions');
const userControls = require('../../../userControls');

module.exports = ({Game, player, card, callback}) => {
  userControls.pickTargetPlayer({
    Game, 
    player, 
    callback: ({error, targetPlayer, cancelled, forced}) => {
    if (error || cancelled, forced) {
      callback({error, cancelled, forced});
    } else {
      gameActions.moveCard({source: player.hand, destination: player.field.actionCards, card});
      gameActions.onNonCounterCardPlayed({Game, card});
      gameActions.avoidAction({
        Game, 
        player: targetPlayer, 
        sourcePlayer: player, 
        callback: ({avoid, forced}) => {
        if (avoid || forced) {
          callback({card});
        } else {
          gameActions.payRent({
            Game, 
            payee: targetPlayer, 
            player, 
            amount: 5, 
            callback: ({error}) => {
            if (error) {
              callback({error});
            } else {
              callback({card});
            }
          }});
        }
      }});
    }
  }});
};
