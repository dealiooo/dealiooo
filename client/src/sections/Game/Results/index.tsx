import React from 'react';
import styled from 'styled-components';

import { ArrowLeft as ArrowLeftIcon } from '@styled-icons/feather/ArrowLeft';

import { Title, Link, Button, Strong } from '../../../components';
import { mixins, constants } from '../../../styles';
import { Center } from '../../../layouts';

const { spaces, borderSizes } = constants;

type ResultsProps = {
  winner: string;
  isWinner: boolean;
};

const GoBackButton = styled(Button)`
  ${mixins.elementHoverDisplay('svg')};
`;

export const Container = styled.div`
  ${mixins.flexColCenter};

  & > ${Title} {
    padding: 0px ${spaces.xxxl};
    margin-bottom: ${spaces.xxxl};
    border-bottom: ${borderSizes.thick} solid ${({ color }) => color};
  }

  & > ${Strong} {
    margin-bottom: 40px;
  }
`;

const Results: React.FC<ResultsProps> = ({ winner, isWinner }) => (
  <Center>
    <Container>
      <Title color={isWinner ? 'green' : 'red'}>{isWinner ? 'Victory' : 'Defeat'}</Title>
      <Strong>{isWinner ? 'You are  the winner!' : `${winner} has won the game!`}</Strong>
      <GoBackButton element={Link} to="/" outline>
        <ArrowLeftIcon size={20} />
        Exit to Main Lobby
      </GoBackButton>
    </Container>
  </Center>
);

export default Results;
