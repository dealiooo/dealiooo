import React from "react";

import Card from "react-bulma-components/lib/components/card";
import Tile from "react-bulma-components/lib/components/tile";
import Image from "react-bulma-components/lib/components/image";

export const ActionCard = ({ card }) => (
  <Card key={card.id}>
    <Card.Header>
      <Card.Header.Title>{card.name}</Card.Header.Title>
    </Card.Header>
    <Card.Content>{card.mainColor || "_"}</Card.Content>
  </Card>
);

export const BankCard = ({ name, frequency }) => (
  <Card key={name}>
    <Card.Header>
      <Card.Header.Title>{frequency}</Card.Header.Title>
    </Card.Header>
    <Card.Content>{name}</Card.Content>
  </Card>
);

export const BuildingCard = ({ name, frequency }) => (
  <Card key={name}>
    <Card.Header>
      <Card.Header.Title>{frequency}</Card.Header.Title>
    </Card.Header>
    <Card.Content>{name}</Card.Content>
  </Card>
);

export const PropertyCard = ({ card }) => (
  <Card key={card.id}>
    <Card.Header>
      <Card.Header.Title>{card.name}</Card.Header.Title>
    </Card.Header>
    <Card.Content className={card.mainColor}>_</Card.Content>
  </Card>
);

export const CardPhoto = ({ card, onClick }) => {
  return (
    <Image
      key={card.id}
      src={process.env.PUBLIC_URL + `/cards/${card.type}/${card.name}.jpg`}
      onClick={onClick}
      alt={`${card.name}`}
    />
  );
};

export const HandCard = ({ card, onClick }) => (
  <CardPhoto card={card} onClick={() => onClick(card)} />
);

export const HiddenHand = ({ cardCount }) => {
  return (
    <Tile kind="parent" size={12} style={{ justifyContent: "center" }}>
      <Tile kind="child" size={12}>
        <div>
          <h1>Cards: {cardCount}</h1>
        </div>
      </Tile>
    </Tile>
  );
};

const SPAWNED_CARD = {
  id: 99999,
  name: "spawned",
  type: "auxilary"
};

export const EmptyCardPhoto = () => <CardPhoto card={SPAWNED_CARD} />;
