const gameActions = require('./');

module.exports = (Game, player) => {
  if (!gameActions.getDeckEmpty(Game)) {
    const card = Game.deck.pop();
    player.hand.push(card);
  }
};
