import React from "react";
import Tile from "react-bulma-components/lib/components/tile";

import {
  ActionCard,
  BankCard,
  BuildingCard,
  PropertyCard,
  CardPhoto,
  HandCard,
  HiddenHand
} from "./cards";

export function renderActionCards(cards) {
  return cards.map(card => <ActionCard card={card} />);
}

export function renderPropertyCards(cards) {
  return cards.map(card => <PropertyCard card={card} />);
}

export function renderBuildingCards(cards) {
  const frequencies = { house: 0, hotel: 0 };
  cards.forEach(card => frequencies[card.name]++);
  return Object.keys(frequencies).map(frequencyKey => (
    <BuildingCard name={frequencyKey} frequency={frequencies[frequencyKey]} />
  ));
}

export function renderBankCards(cards) {
  const frequencies = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 10: 0 };
  cards.forEach(card => frequencies[card.value]++);
  return Object.keys(frequencies).map(frequencyKey => (
    <BankCard name={frequencyKey} frequency={frequencies[frequencyKey]} />
  ));
}

export function renderCardPhotos(cards) {
  return cards.map(card => <CardPhoto card={card} />);
}

export function renderHandCards(cards, onClick) {
  return cards.map(card => {
    return (
      <Tile kind="parent" size={12} style={{ justifyContent: "center" }}>
        <Tile key={card.id} kind="child" size={1}>
          <h1>{card.name}</h1>
          <HandCard card={card} onClick={() => onClick(card)} />
        </Tile>
      </Tile>
    );
  });
}

export function renderHiddenHand(cardCount) {
  return (
    <Tile kind="parent" size={12} style={{ justifyContent: "center" }}>
      <Tile kind="child" size={12}>
        <HiddenHand cardCount={cardCount} />;
      </Tile>
    </Tile>
  );
}

export function renderCardsAsModal(cards) {
  return [].concat(...cards).map(card => <CardPhoto card={card} />);
}
