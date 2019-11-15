import React from 'react';
import styled from 'styled-components';
import { Attribute, Strong, CenterInline, HorizontalLine } from '../../../atoms';
import { BorderCircle, Circle } from '../Cards';
import { space, borderRadius, rem } from '../../../../styles';

import { TopBar, BAR_PADDING } from '../PlayerBox/TopBarInfo';
import { FlexRowCenter } from '../../../layouts';
import { CardType } from '../../../../types/dealiooo';
import { fromCardWidth } from '../utils/constants';
import { StyledIconProps } from 'styled-icons/StyledIconBase/StyledIconBase';

type CardDetailProps = {
  name: string;
  description: string;
  money: number;
  type: CardType;
  Icon?: React.FC<StyledIconProps>;
  children?: React.ReactNode;
  hideValue?: boolean;
};

const Container = styled.div`
  border-radius: ${borderRadius.round};
  background-color: ${({ theme }) => theme.backgroundLighter};
`;

const Content = styled.div`
  padding: ${BAR_PADDING};
`;

const Description = styled.div`
  margin: ${space.medium} ${space.nano} ${space.medium} ${space.nano};
`;

export const Detail = ({ detail }) => {
  return (
    <Container>
      <Content>{detail} </Content>
    </Container>
  );
};

export const CardDetail = ({ name, description, type, money, hideValue = false, Icon, children }: CardDetailProps) => (
  <Container>
    <TopBar>
      <FlexRowCenter>
        {Icon && (
          <Circle size={50}>
            <Icon size={30} />
          </Circle>
        )}
        <Strong as={CenterInline}>{name}</Strong>
      </FlexRowCenter>
      {!hideValue && (
        <BorderCircle size={50} style={{ marginLeft: rem('30px') }}>
          <Strong>{`$${money}`}</Strong>
        </BorderCircle>
      )}
    </TopBar>
    <Content>
      <Attribute>{type}</Attribute>
      <Description>{description}</Description>
      {children}
    </Content>
  </Container>
);

type CardProps = {
  width: number;
  height: number;
  color: string;
};

const Card = styled(FlexRowCenter)<CardProps>`
  margin: 0 auto;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  background-color: ${({ theme, color }) => color || theme.backgroundLight};
  border-radius: ${borderRadius.round};
`;

type RentValueDetailsProps = {
  rentValues: number[];
  color: string;
};

const Table = styled.table`
  table-layout: fixed;
  width: 33vh;
  flex: 1;
`;

export const RentValueDetails = ({ rentValues, color }: RentValueDetailsProps) => {
  const cardWidth = window.innerWidth / 54;
  const cardHeight = fromCardWidth(cardWidth);

  return (
    <Table>
      <thead>
        <tr>
          <th scope="col">Number of Properties in Set</th>
          <th scope="col"></th>
          <th scope="col">Rent</th>
        </tr>
      </thead>
      <tbody>
        {rentValues.map((rentValue, index) => {
          return (
            <tr key={rentValue}>
              <td>
                <Card width={cardWidth} height={cardHeight} color={color}>
                  {index}
                </Card>
              </td>
              <td style={{ textAlign: 'center' }}>
                {index === rentValues.length - 1 ? (
                  <FlexRowCenter>
                    <HorizontalLine style={{ flexGrow: 1 }} />
                    <Strong>Full Set</Strong>
                    <HorizontalLine style={{ flexGrow: 1 }} />
                  </FlexRowCenter>
                ) : (
                  <HorizontalLine />
                )}
              </td>
              <td>
                <Money>{`$${rentValue}`}</Money>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

const Money = styled(FlexRowCenter)`
  color: ${({ theme }) => theme.gold};
`;
