import React from 'react';

import { HorizontalLine, Strong } from '../../../../../../../components';
import { Table, Card, FullSet, Money } from './style';
import { fromCardWidth } from '../../../../../utils';

type RentValueDetailsProps = {
  rentValues: number[];
  color: string;
};

const RentValueDetail: React.FC<RentValueDetailsProps> = ({ rentValues, color }) => {
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
                  <FullSet>
                    <HorizontalLine />
                    <Strong>Full Set</Strong>
                    <HorizontalLine />
                  </FullSet>
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

export default RentValueDetail;
