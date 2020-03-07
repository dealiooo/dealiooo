import React from 'react';

import { Center } from '../../../layouts';
import { Title, Link } from '../../../components';

type ResultsProps = {
  winner: string;
};

const Results: React.FC<ResultsProps> = ({ winner }) => (
  <Center>
    <Title marginless>🎉 {winner} has won the game! 🎉</Title>
    <Link to="/">Go back to the main lobby</Link>
  </Center>
);

export default Results;
