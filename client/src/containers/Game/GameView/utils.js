import React from "react";

import {
  renderBankCards,
  renderBuildingCards,
  renderActionCards,
  renderPropertyCards
} from "./Cards/renderCards";

export const cardsTotalValue = cards => {
  return []
    .concat(...cards)
    .reduce((accumlator, currentCard) => accumlator + currentCard.value, 0);
};

export const CARD_STACK_TYPES = {
  bank: "bank_cards",
  property: "property_cards",
  building: "building_cards",
  action: "action_cards"
};

export function getCardStackIcon(stackType) {
  switch (stackType) {
    case CARD_STACK_TYPES.bank:
      return "🏦";
    case CARD_STACK_TYPES.building:
      return "🏢";
    case CARD_STACK_TYPES.property:
      return "🏠";
    case CARD_STACK_TYPES.action:
      return "🚴‍";
    default:
      return "";
  }
}

export function renderCardStack(cards, type) {
  const _renderCardStack = {
    bank_cards: renderBankCards,
    building_cards: renderBuildingCards,
    property_cards: renderPropertyCards,
    action_cards: renderActionCards
  };

  return _renderCardStack[type](cards).map(renderCard => <>{renderCard}</>);
}

export const ME_PLAYER_COLUMN_SPACE = 12;

export const CSS_COLUMN_OPPONENT_PLAYER_SPACES = {
  2: [12],
  3: [6, 6],
  4: [6, 6, 10],
  5: [6, 6, 6, 6]
};

export const getCssColumnOpponentPlayerSpaces = (playerCount, playerPosition) =>
  CSS_COLUMN_OPPONENT_PLAYER_SPACES[playerCount + 1][playerPosition];

export function getCssColumnStackSpace(type) {
  switch (type) {
    case CARD_STACK_TYPES.action:
      return 2;
    case CARD_STACK_TYPES.building:
      return 2;
    case CARD_STACK_TYPES.bank:
      return 4;
    case CARD_STACK_TYPES.property:
      return 4;
    default:
      return 0;
  }
}
