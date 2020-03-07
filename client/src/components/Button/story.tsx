import React from 'react';
import { storiesOf } from '@storybook/react';

import Button from '.';
import { Center } from '../../layouts';

storiesOf('Button', module)
  .add('Button', () => (
    <Center>
      <Button>Button</Button>
    </Center>
  ))
  .add('Button - Primary Color', () => (
    <Center>
      <Button color="primary">Button</Button>
    </Center>
  ))
  .add('Button - Outline', () => (
    <Center>
      <Button outline>Button</Button>
    </Center>
  ))
  .add('Button - Primary Color & Outline', () => (
    <Center>
      <Button color="primary" outline>
        Button
      </Button>
    </Center>
  ))
  .add('Button - Loading', () => (
    <Center>
      <Button loading>Button</Button>
    </Center>
  ));
