import styled from 'styled-components';

import { LinkStyle } from '../../BaseStyles';
import LinkStyles from '../../css/Link.module.css';

export const SpanLink = styled.span.attrs(props => ({
  className: props.underlineOnHover ? LinkStyles.underline : undefined,
  ...props,
}))`
  ${LinkStyle}
`;
