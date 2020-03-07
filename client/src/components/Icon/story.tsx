import React from 'react';
import { storiesOf } from '@storybook/react';

import Icon from '.';
import { Center } from '../../layouts';

storiesOf('Icon', module).add('Logo', () => (
  <Center>
    <Icon icon="logo" size={3} color="#000" />
  </Center>
));
