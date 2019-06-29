const gameActions = require('../gameActions');

module.exports = ({ Game, player }) => {
  Game.cardsPlayedList = [];
  if (player.hand.length) {
    for (let i = 0; i < 2; i++) {
      gameActions.drawCard({ Game, player });
    }
  } else {
    for (let i = 0; i < 5; i++) {
      gameActions.drawCard({ Game, player });
    }
  }
};
