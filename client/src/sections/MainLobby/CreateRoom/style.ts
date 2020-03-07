import styled from 'styled-components';

import { Input, Button } from '../../../components';
import { mixins, constants } from '../../../styles';

const { spaces } = constants;

export const RoomCapacityInput = styled(Input)`
  background-color: ${({ theme, active }) => active && theme.palette.backgroundLighter};
`;

export const RoomCapacities = styled.div`
  ${mixins.flexRowCenter};
  & > ${RoomCapacityInput}:not(:first-child):not(:last-child) {
    margin: 0 ${spaces.md};
  }
`;

export const CreateRoomButton = styled(Button).attrs({ color: 'blueLight' })`
  margin: 0 auto;
`;
