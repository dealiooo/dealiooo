const gameActions = require('../actions');

const startTurn = (Game, player) => {
  for (let i = 0; i < 2; i++) {
    gameActions.drawCard(Game, player);
  }
};

module.exports = startTurn;
