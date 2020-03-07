import styled from 'styled-components';

const HorizontalLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.palette.outline};
`;

export default HorizontalLine;
