const gameActions = require('../gameActions');

const discardPlayerCards = ({Game, player}) => {
  if (gameActions.isPileNotEmpty({pile: player.hand})) {
    gameActions.movePile({source: player.hand, destination: Game.discard});
  }
  if (gameActions.isPileNotEmpty({pile: player.field.actionCards})) {
    gameActions.movePile({source: player.field.actionCards, destination: Game.discard});
  }
  if (gameActions.isPileNotEmpty({pile: player.field.bankCards})) {
    gameActions.movePile({source: player.field.bankCards, destination: Game.discard});
  }
  for (let i = 0; i < player.field.propertyCards.length; i++) {
    if (gameActions.isPileNotEmpty({pile: player.field.propertyCards[i]})) {
      gameActions.movePile({source: player.field.propertyCards[i], destination: Game.discard});
    }
  }
};

module.exports = ({Game, player}) => {
  Game.playerCount--;
  discardPlayerCards({Game, player});
  gameActions.removePlayer({Game, player});
  const turnPlayer = Game.turnCount % Game.playerCount;
  for (let i = 0; i < Game.players.length; i++) {
    if (Game.players[i].id === player.id) {
      if (turnPlayer === i) {
        Game.turnCount++;
      }
    }
  }
};
