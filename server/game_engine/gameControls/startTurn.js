const gameActions = require('../gameActions');

module.exports = ({Game, player}) => {
  Game.cardsPlayedList = [];
  for (let i = 0; i < 2; i++) {
    gameActions.drawCard({Game, player});
  }
};
