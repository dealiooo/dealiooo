import React from 'react';
import { storiesOf } from '@storybook/react';
import { Earth as EarthIcon } from 'styled-icons/icomoon/Earth';

import { Input } from '../../atoms';
import { IconButton, IconInput } from '..';
import FormGroup from '.';

storiesOf('FormGroup', module).add('form group', () => (
  <FormGroup label="Planet Earth" error="Error!">
    <IconInput>
      <IconButton>
        <EarthIcon />
      </IconButton>
      <Input error={true} />
    </IconInput>
  </FormGroup>
));
