const getDeckEmpty = require('./getDeckEmpty');

module.exports = (Game, player) => {
  if (!getDeckEmpty(Game)) {
    const card = Game.deck.pop();
    player.hand.push(card);
  }
};
