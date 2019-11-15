import styled from 'styled-components';

import { space } from '../../../styles';
import { BUTTON_HEIGHT } from '../../atoms/Button/style';

const HEADER_HEIGHT = '72px';
const HEADER_VERTICAL_PADDING = space.small;

export const RoomsWrapper = styled.div`
  height: calc(100% - ${HEADER_HEIGHT});
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: ${HEADER_HEIGHT};
  padding: ${HEADER_VERTICAL_PADDING} 0 ${HEADER_VERTICAL_PADDING} ${HEADER_VERTICAL_PADDING};
`;

export const ChatAligner = styled.div`
  /* align the chat horizontally with the create room button */
  padding-top: calc(
    ${HEADER_VERTICAL_PADDING} + (${HEADER_HEIGHT} - ${BUTTON_HEIGHT} - 2 * ${HEADER_VERTICAL_PADDING}) / 2
  );
`;
