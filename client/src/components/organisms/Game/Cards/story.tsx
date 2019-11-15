import React from 'react';
import { storiesOf } from '@storybook/react';
import { Home as HomeIcon } from 'styled-icons/octicons/Home';
import { Building as BuildingIcon } from 'styled-icons/boxicons-regular/Building';

import { Center } from '../../../layouts';
import IconCard from './IconCard';
import CircleColorCard from './CircleColorCard';
import CircleColorsCard from './CircleColorsCard';
import CircleDualColorCard from './CircleDualColorCard';

storiesOf('Cards', module)
  .add('CircleCard1', () => (
    <Center>
      <CircleColorCard name="Property" color="red" width={200} height={300} />
    </Center>
  ))
  .add('CircleCard2', () => (
    <Center>
      <CircleDualColorCard name="Property" colors={['red', 'blue']} width={200} height={300} />
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
      <IconCard Icon={HomeIcon} width={200} height={300} color="red"></IconCard>
    </Center>
  ))
  .add('IconCard2', () => (
    <Center>
      <IconCard Icon={BuildingIcon} width={200} height={300} color="red"></IconCard>
    </Center>
  ))
  .add('Border Card', () => (
    <Center>
      <CircleColorCard name="oriental-avenue" color="orange" width={200} height={300} />
    </Center>
  ));
