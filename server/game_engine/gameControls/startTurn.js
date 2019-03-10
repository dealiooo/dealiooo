const gameActions = require('../gameActions');

module.exports = (Game, player) => {
  Game.cards_played_list = [];
  for (let i = 0; i < 2; i++) {
    gameActions.drawCard(Game, player);
  }
};
