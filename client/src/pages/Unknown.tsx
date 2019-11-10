import React from 'react';
import { ArrowLeft as ArrowLeftIcon } from 'styled-icons/feather/ArrowLeft';

import { Link, Button, Title } from '../components/atoms';
import { Center } from '../components/layouts';

function Unknown(props) {
  return (
    <Center>
      <Title marginBottom>404. You've reached a dead end</Title>
      <Button outline as={Link} to="/">
        <ArrowLeftIcon size={30} />
        Go Back to the Main Lobby
      </Button>
    </Center>
  );
}

export default Unknown;
