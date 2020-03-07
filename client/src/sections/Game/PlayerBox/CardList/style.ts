import styled from 'styled-components';

import { constants } from '../../../../styles';

const { spaces } = constants;

export const CARD_HORIZONTAL_SPACE = spaces.md;
export const CARD_VERTICAL_SPACE = spaces.md;

type CardListProps = { height: number };
export const CardList = styled.ul<CardListProps>`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  // TODO: might not be necessary once seperate words
  text-align: center;

  height: ${({ height }) => height}px;
  padding-top: ${CARD_VERTICAL_SPACE};

  & > .trigger {
    cursor: pointer;
  }

  & > .trigger + .trigger {
    padding-bottom: ${CARD_VERTICAL_SPACE};
  }

  & > .trigger:nth-child(even) {
    margin-left: ${CARD_HORIZONTAL_SPACE};
    margin-right: ${CARD_HORIZONTAL_SPACE};
  }
`;
