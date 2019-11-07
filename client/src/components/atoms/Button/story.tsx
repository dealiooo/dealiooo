import React from 'react';
import { storiesOf } from '@storybook/react';

import Button from '.';
import { Center } from '../../layouts';

storiesOf('Button', module)
  .add('button', () => (
    <Center>
      <Button>Button</Button>
    </Center>
  ))
  .add('button outline', () => (
    <Center>
      <Button outline>Button</Button>
    </Center>
  ));
