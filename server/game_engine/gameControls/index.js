const playCard = require('./playCard');
const changeCardMainColor = require('./changeCardMainColor');
const computeWinCondition = require('./computeWinCondition');
const endTurn = require('./endTurn');
const forcePlayerEndTurn = require('./forcePlayerEndTurn');
const forfeit = require('./forfeit');
const moveCardAround = require('./moveCardAround');
const onDeckEmpty = require('./onDeckEmpty');
const startGame = require('./startGame');
const startTurn = require('./startTurn');

module.exports = {
  playCard,
  changeCardMainColor,
  computeWinCondition,
  endTurn,
  forcePlayerEndTurn,
  forfeit,
  moveCardAround,
  onDeckEmpty,
  startGame,
  startTurn
};
