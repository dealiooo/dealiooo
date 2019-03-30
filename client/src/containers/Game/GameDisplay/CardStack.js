import React from "react";
import Level from "react-bulma-components/lib/components/level";
import Box from "react-bulma-components/lib/components/box";
import Tile from "react-bulma-components/lib/components/tile";

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

export default CardStack;
