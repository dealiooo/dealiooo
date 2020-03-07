import styled from 'styled-components';

type CenterInlineProps = {
  left?: boolean;
};

const CenterInline = styled.span<CenterInlineProps>`
  display: inline-block;
  vertical-align: middle;
  ${props => (props.left ? `margin-right: 0px` : `margin-left: 0px`)}
`;

export default CenterInline;
