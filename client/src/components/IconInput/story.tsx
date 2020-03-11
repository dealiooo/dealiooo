import React from 'react';
import { storiesOf } from '@storybook/react';
import { User as UserIcon } from '@styled-icons/feather/User';

import { Input, Icon, IconButton } from '..';
import { Center } from '../../layouts';
import IconInput from '.';

storiesOf('IconInput', module)
  .add('with icon left', () => (
    <Center>
      <IconInput>
        <UserIcon size={20} />
        <Input />
      </IconInput>
    </Center>
  ))
  .add('with icon button', () => (
    <Center>
      <IconInput hasIconRight>
        <IconButton>
          <UserIcon size={20} />
        </IconButton>
        <Input />
      </IconInput>
    </Center>
  ))
  .add('with icon button with custom icon', () => (
    <Center>
      <IconInput hasIconRight>
        <IconButton>
          <Icon icon="logo" />
        </IconButton>
        <Input />
      </IconInput>
    </Center>
  ));
