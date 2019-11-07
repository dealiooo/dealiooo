import React from 'react';
import { storiesOf } from '@storybook/react';

import Box from '.';
import { Center } from '../../layouts';

storiesOf('Box', module).add('box', () => (
  <Center>
    <Box>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Box>
  </Center>
));
