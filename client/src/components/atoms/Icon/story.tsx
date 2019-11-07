import React from 'react';
import { storiesOf } from '@storybook/react';

import Icon from '.';
import { Center } from '../../layouts';

storiesOf('Icon', module).add('logo', () => (
  <Center>
    <Icon icon="logo" size={3} color="black" />
  </Center>
));
