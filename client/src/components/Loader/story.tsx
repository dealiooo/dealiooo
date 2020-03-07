import React from 'react';
import { storiesOf } from '@storybook/react';

import Loader from '.';
import { Center } from '../../layouts';

storiesOf('Loader', module).add('loader', () => (
  <Center>
    <Loader size={60} />
  </Center>
));
