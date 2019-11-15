import React from 'react';

import { Center } from '../../../layouts';
import { Title, Link } from '../../../atoms';

type ResultsProps = {
  winner: string;
};

const Results = ({ winner }: ResultsProps) => {
  return (
    <Center>
      <Title marginBottom>🎉 {winner} has won the game! 🎉</Title>
      <Link to="/">Go back to the main lobby</Link>
    </Center>
  );
};

export default Results;
