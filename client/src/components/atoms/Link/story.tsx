import React from 'react';
import { storiesOf } from '@storybook/react';

import Link from '.';
import { Center } from '../../layouts';

storiesOf('Link', module).add('link', () => (
  <Center>
    <Link to="/">Home</Link>
  </Center>
));
