import React from "react";
import Level from "react-bulma-components/lib/components/level";
import Box from "react-bulma-components/lib/components/box";
import Tile from "react-bulma-components/lib/components/tile";
import Card from "react-bulma-components/lib/components/card";

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

const CardStack = ({ cards, stackType }) => {
  return (
    <Tile kind="child" size={getCssColumnStackSpace(stackType)}>
      <Box>
        <Level renderAs="nav">
          <Level.Side align="left">
            <Level.Item>
              {`${getCardStackIcon(stackType)} + ${cardsTotalValue(cards)}`}
            </Level.Item>
          </Level.Side>
          <Level.Side align="right">
            <Level.Item>
              <ZoomModal>{renderCardsAsModal(cards)}</ZoomModal>
            </Level.Item>
          </Level.Side>
        </Level>
        <Tile>{renderCardStack(cards, stackType)}</Tile>
      </Box>
    </Tile>
  );
};

const Field = ({
  bank_cards,
  property_cards,
  action_cards,
  building_cards
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
