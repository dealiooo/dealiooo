import React from 'react';
import styled from 'styled-components';
import { ArrowLeft as ArrowLeftIcon } from 'styled-icons/feather/ArrowLeft';

import { Link, Button, Title } from '../components';
import { Center } from '../layouts';
import { mixins } from '../styles';

const GoBackButton = styled(Button)`
  ${mixins.elementHoverDisplay('svg')};
`;

const Unknown: React.FC = props => {
  return (
    <Center>
      <Title>404. You've reached a dead end</Title>
      <GoBackButton element={Link} to="/" outline>
        <ArrowLeftIcon size={20} />
        Go Back to the Main Lobby
      </GoBackButton>
    </Center>
  );
};

export default Unknown;
