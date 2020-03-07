import React from 'react';
import { storiesOf } from '@storybook/react';

import { Center } from '../../layouts';
import Chat from '.';

storiesOf('Chat', module).add('Chat', () => (
  <Center>
    <Chat channel="" messages={[]} onSend={() => undefined} />
  </Center>
));
