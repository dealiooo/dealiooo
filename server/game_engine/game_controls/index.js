const playCard = require('./playCard');
const changeCardMainColor = require('./changeCardMainColor');
const computeWinCondition = require('./computeWinCondition');
const endGame = require('./endGame');
const endTurn = require('./endTurn');
const forfeit = require('./forfeit');
const onCardPlayed = require('./onCardPlayed');
const onDeckEmpty = require('./onDeckEmpty');
const moveCardAround = require('./moveCardAround');
const startGame = require('./startGame');
const startTurn = require('./startTurn');

module.exports = {
  playCard,
  changeCardMainColor,
  computeWinCondition,
  endGame,
  endTurn,
  forfeit,
  onCardPlayed,
  onDeckEmpty,
  moveCardAround,
  startGame,
  startTurn
};
