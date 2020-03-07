import React from 'react';
import { storiesOf } from '@storybook/react';

import Link from '.';
import { Center } from '../../layouts';

storiesOf('Link', module).add('Link', () => (
  <Center>
    <Link to="/" underline>
      Home
    </Link>
  </Center>
));
