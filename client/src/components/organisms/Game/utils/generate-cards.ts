import cards from './cards';
import { CardType } from '../../../../types/dealiooo';

function shuffle<T = any>(a: Array<T>): Array<T> {
  let j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

function getRandomInt(max: number): number {
  return Math.floor(Math.random() * Math.floor(max));
}

/// Get a random set of cards of certain type or random
const generateCards = (type: CardType | 'random' = 'random', count: number = getRandomInt(cards.length)) => {
  if (type === 'random') {
    return shuffle(cards).slice(0, count);
  }

  if (type === 'property') {
    let propSets = [];
    for (let i = 0; i < count; i++) {
      const propCards = cards.filter(card => card.type === type);
      const random = getRandomInt(propCards.length - 3);
      propSets.push(propCards.slice(random, random + 3));
    }

    return propSets;
  }

  return shuffle(cards.filter(card => card.type === type)).slice(0, count);
};

export default generateCards;
