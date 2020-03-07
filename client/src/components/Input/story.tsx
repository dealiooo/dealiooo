import React from 'react';
import { storiesOf } from '@storybook/react';

import Input from '.';
import { Center } from '../../layouts';

storiesOf('Input', module).add('Input', () => (
  <Center>
    <Input />
  </Center>
));
