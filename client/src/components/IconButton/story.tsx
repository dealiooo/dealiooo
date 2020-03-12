import React from 'react';
import { storiesOf } from '@storybook/react';
import { CloseO as CloseOIcon } from '@styled-icons/evil/CloseO';

import IconButton from '.';
import { Center } from '../../layouts';

storiesOf('IconButton', module).add('icon button', () => (
  <Center>
    <IconButton>
      <CloseOIcon color="red" size={60} />
    </IconButton>
  </Center>
));
