const gameActions = require('../actions');

module.exports = Game => {
  if (gameActions.getDeckEmpty(Game)) {
    Game.deck = Game.deck.concat(Game.discard);
    Game.discard = [];

    gameActions.shufflePile(Game, Game.deck);
  }
};
