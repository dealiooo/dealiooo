const { playCard } = require('./playCard');
const { changeCardMainColor } = require('./changeCardMainColor');
const { computeWinCondition } = require('./computeWinCondition');
const { endTurn } = require('./endTurn');
const { forfeit } = require('./forfeit');
const { onForfeit } = require('./onForfeit');
const { moveCardAround } = require('./moveCardAround');
const { onCardPlayed } = require('./onCardPlayed');
const { onDeckEmpty } = require('./onDeckEmpty');
const { startGame } = require('./startGame');
const { startTurn } = require('./startTurn');

module.exports = {
  playCard,
  changeCardMainColor,
  computeWinCondition,
  endTurn,
  forfeit,
  onForfeit,
  onCardPlayed,
  onDeckEmpty,
  moveCardAround,
  startGame,
  startTurn
};

/**
 *
 * Add logic for hotel/house pile
 *
 * You cannot move building card from bank to property_cards
 *
 * If you pay with building card thats in building pile it goes to other players building pile
 *
 * You can move building card to property set
 *
 * just-say-no
 *    what happens if you play just-say-no to cancel a double-the-rent
 *    because you still need to pay rent
 *
 */
