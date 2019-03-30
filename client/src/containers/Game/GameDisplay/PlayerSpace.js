import React from "react";
import Level from "react-bulma-components/lib/components/level";
import Box from "react-bulma-components/lib/components/box";
import Tile from "react-bulma-components/lib/components/tile";
import Card from "react-bulma-components/lib/components/card";

import CardStack from "./CardStack";

import {
  CARD_STACK_TYPES,
  renderCardStack,
  getCssColumnStackSpace,
  cardsTotalValue,
  getCardStackIcon
} from "./utils";
import {
  renderHandCards,
  renderHiddenHand,
  renderCardsAsModal
} from "./Cards/renderCards";
import ZoomModal from "../ZoomModal";

const Field = ({
  action_cards,
  bank_cards,
  building_cards,
  property_cards
}) => {
  return (
    <Tile kind="parent" size={12}>
      <CardStack cards={bank_cards} stackType={CARD_STACK_TYPES.bank} />
      <CardStack cards={property_cards} stackType={CARD_STACK_TYPES.property} />
      <CardStack cards={action_cards} stackType={CARD_STACK_TYPES.action} />
      <CardStack cards={building_cards} stackType={CARD_STACK_TYPES.building} />
    </Tile>
  );
};

const PlayerSpace = ({ playerInfo, onHandCardClicked }) => {
  return (
    <>
      <Tile kind="ancestor">
        <Field {...playerInfo} />
      </Tile>
      <Tile kind="ancestor">
        {Array.isArray(playerInfo.hand)
          ? renderHandCards(playerInfo.hand, onHandCardClicked)
          : renderHiddenHand(playerInfo.hand)}
      </Tile>
    </>
  );
};

export default PlayerSpace;
