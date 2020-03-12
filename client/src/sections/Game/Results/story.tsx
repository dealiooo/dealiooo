import React from 'react';
import { storiesOf } from '@storybook/react';

import Results from '.';

storiesOf('Results', module)
  .add('Results - Winner', () => <Results winner="winner" isWinner={true} />)
  .add('Results - Loser', () => <Results winner="loser" isWinner={false} />);
