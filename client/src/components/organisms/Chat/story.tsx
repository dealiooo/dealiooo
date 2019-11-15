import React from 'react';
import { storiesOf } from '@storybook/react';

import { Center } from '../../layouts';
import Chat from '.';

storiesOf('Chat', module).add('chat', () => (
  <Center>
    <div style={{ width: 500, height: 500 }}>
      <Chat messages={[]} onSend={() => undefined} />
    </div>
  </Center>
));
