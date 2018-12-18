const playCard = require('./playCard');
const changeCardMainColor = require('./changeCardMainColor');
const computeWinCondition = require('./computeWinCondition');
const endTurn = require('./endTurn');
const forfeit = require('./forfeit');
const moveCardAround = require('./moveCardAround');
const onCardPlayed = require('./onCardPlayed');
const onDeckEmpty = require('./onDeckEmpty');
const startGame = require('./startGame');
const startTurn = require('./startTurn');

module.exports = {
  playCard,
  changeCardMainColor,
  computeWinCondition,
  endTurn,
  forfeit,
  onCardPlayed,
  onDeckEmpty,
  moveCardAround,
  startGame,
  startTurn
};
