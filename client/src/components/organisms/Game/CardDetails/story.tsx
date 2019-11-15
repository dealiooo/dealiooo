import React from 'react';
import { storiesOf } from '@storybook/react';
import { Cake as CakeIcon } from 'styled-icons/material/Cake';

import { CardDetail, RentValueDetails, Detail } from '.';
import { Title } from '../../../atoms';
import { Center, Flex } from '../../../layouts';
import { BorderCircle } from '../Cards';
import { CardColor } from '../../../../types/dealiooo';
import { CardColorsMap } from '../../../../styles';
import { RentValuesMap } from '../utils';

storiesOf('Cards', module)
  .add('detail', () => (
    <Center>
      <Detail detail="Lorem ipsum toreim isage verteo" />
    </Center>
  ))
  .add('card detail', () => (
    <Center>
      <CardDetail
        name="Semiautomic"
        description="Add onto any full set you own to add $4 to the rent value"
        money={3}
        type="action"
        Icon={CakeIcon}
      />
    </Center>
  ))
  .add('rent value details (1 color)', () => (
    <Center>
      <RentValueDetails
        color={CardColorsMap[CardColor.railroad]}
        rentValues={RentValuesMap[CardColor.railroad].rentValues}
      />{' '}
    </Center>
  ))
  .add('card detail with rent value details', () => (
    <Center>
      <CardDetail
        name="Semiautomic Nuclear Electrical Bomb"
        description="Explodes and destroys everything"
        money={3}
        type="rent"
        Icon={CakeIcon}
      >
        <RentValueDetails
          color={CardColorsMap[CardColor.railroad]}
          rentValues={RentValuesMap[CardColor.railroad].rentValues}
        />
      </CardDetail>
    </Center>
  ))
  .add('card detail with rent card (2 colors)', () => (
    <Center>
      <CardDetail
        name="Semiautomic Nuclear Electrical Bomb"
        description="Explodes and destroys everything"
        money={3}
        type="rent"
        Icon={CakeIcon}
      >
        <Flex justifyEvenly>
          <BorderCircle size={120}>
            <Title>Black</Title>
          </BorderCircle>
          <BorderCircle size={120}>
            <Title>Black</Title>
          </BorderCircle>
        </Flex>
      </CardDetail>
    </Center>
  ));
