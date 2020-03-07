import { Card } from '../../../types';

const CARD_HEIGHT_TO_WIDTH_RATIO = 2 / 3;
const CARD_WIDTH_TO_HEIGHT_RATIO = 3 / 2;

export const calcCollapseHeight = (screenHeight: number): number => Math.floor(screenHeight * 0.7);
export const calcGlobalsBarHeight = (screenHeight: number): number => Math.floor(screenHeight * 0.1);
export const calcPlayerBoxHeight = (screenHeight: number): number => Math.floor(screenHeight * 0.3);
export const calcPromptHandsHeight = (screenHeight: number): number => Math.floor(screenHeight * 0.3);

// get card width from height
export const fromCardHeight = (cardHeight: number): number => cardHeight * CARD_HEIGHT_TO_WIDTH_RATIO;

// get card height from width
export const fromCardWidth = (cardWidth: number): number => cardWidth * CARD_WIDTH_TO_HEIGHT_RATIO;

export const deriveDescriptionFromCard = (card: Card): string => {
  switch (card.type) {
    case 'action': {
      return {
        'deal-breaker': 'Steal a complete set of properties from any player (includes any buildings)',
        'debt-collector': 'Force any player to pay you $5',
        'double-the-rent': 'Doubles the rent value. Needs to be played with a rent card',
        'forced-deal': 'Swap any property with another player',
        'its-my-birthday': 'All players give you $2 as a gift',
        'pass-go': 'Draw 2 extra cards',
        'sly-deal': 'Steal a property from the player of your choice (cannot be part of a full set',
        'just-say-no': 'Use any time when an action card is played against you',
      }[card.name];
    }
    case 'rent': {
      return 'All players pay you rent for properties you own in one of these colors';
    }
    case 'property_wildcard': {
      if (card.colors.length === 10) {
        return 'This card can be used as part of any property set. This card has no monetary value';
      }

      return 'This card can be used as part of any property set in any of these colors.';
    }
    case 'rent_wildcard': {
      return 'Force one player to pay you rent for properties you own in any color';
    }
    case 'building': {
      return `Add onto any full set you own to add $${card.value} to the rent value`;
    }
    default: {
      return '';
    }
  }
};
