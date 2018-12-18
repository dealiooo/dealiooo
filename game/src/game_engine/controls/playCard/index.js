import { playActionCard } from './playActionCard';
import { playBuildingCard } from './playBuildingCard';
import { playMoneyCard } from './playMoneyCard';
import { playPropertyCard } from './playPropertyCard';
import { playPropertyWildCard } from './playPropertyWildCard';
import { playDualColorRentCard } from './playDualColorRentCard';
import { playRentWildCard } from './playRentWildCard';

export const playCard = (Game, player, card, callback) => {
  const play = {
    action: playActionCard,
    building: playBuildingCard,
    money: playMoneyCard,
    property: playPropertyCard,
    property_wildcard: playPropertyWildCard,
    rent: playDualColorRentCard,
    rent_wildcard: playRentWildCard
  };
  play[card.type](Game, player, card, callback);
};
