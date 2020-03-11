import React from 'react';
import { storiesOf } from '@storybook/react';

import { Home as HomeIcon } from '@styled-icons/octicons/Home';
import { Building as BuildingIcon } from '@styled-icons/boxicons-regular/Building';

import IconCard from './IconCard';
import CircleCard from './CircleCard';
import CircleColorsCard from './CircleColorsCard';
import { Center } from '../../../../../../layouts';

storiesOf('Cards', module)
  .add('CircleCard1', () => (
    <Center>
      <CircleCard name="Property" color="red" width={200} height={300} />
    </Center>
  ))
  .add('CircleCard2', () => (
    <Center>
      <CircleCard name="Property" colors={['red', 'blue']} width={200} height={300} />
    </Center>
  ))
  .add('CircleColorsCard', () => (
    <Center>
      <CircleColorsCard
        name="Property"
        colors={['red', 'blue', 'green', 'yellow', 'purple', 'pink']}
        width={200}
        height={300}
      />
    </Center>
  ))
  .add('IconCard', () => (
    <Center>
      <IconCard Icon={HomeIcon} color="red" width={200} height={300}></IconCard>
    </Center>
  ))
  .add('IconCard2', () => (
    <Center>
      <IconCard Icon={BuildingIcon} color="red" width={200} height={300}></IconCard>
    </Center>
  ))
  .add('Border Card', () => (
    <Center>
      <CircleCard name="oriental-avenue" color="orange" width={200} height={300} />
    </Center>
  ));
