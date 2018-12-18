const gameActions = require('../gameActions');

module.exports = Game => {
  if (gameActions.getDeckEmpty(Game)) {
    Game.deck = Game.deck.concat(Game.discard);
    Game.discard = [];

    Game.deck = gameActions.shufflePile(Game, Game.deck);
  }
};
