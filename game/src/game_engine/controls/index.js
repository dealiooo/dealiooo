import { playCard } from './playCard';
import { changeCardMainColor } from './changeCardMainColor';
import { computeWinCondition } from './computeWinCondition';
import { endTurn } from './endTurn';
import { forfeit } from './forfeit';
import { onForfeit } from './';
import { moveCardAround } from './moveCardAround';
import { onCardPlayed } from './onCardPlayed';
import { onDeckEmpty } from './onDeckEmpty';
import { startGame } from './startGame';
import { startTurn } from './startTurn';

export {
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
