import React from 'react';
import { storiesOf } from '@storybook/react';
import { Earth as EarthIcon } from 'styled-icons/icomoon/Earth';

import FormGroup from '.';
import { Input, IconButton, IconInput } from '..';

storiesOf('FormGroup', module).add('form group', () => (
  <FormGroup label="Earth" error="Error!">
    <IconInput>
      <IconButton>
        <EarthIcon />
      </IconButton>
      <Input error={true} />
    </IconInput>
  </FormGroup>
));
