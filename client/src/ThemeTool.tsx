import React from 'react';
import styled from 'styled-components';

import ThemeChangeButton from './ThemeChangeButton';
import { constants } from './styles';

const { spaces, borderRadiuses } = constants;

const ThemeToolLayout = styled.div`
  position: absolute;
  top: calc(100% - 80px);
  left: ${spaces.lg};
  z-index: 1;

  background-color: ${({ theme }) => theme.palette.backgroundDark};
  border-radius: ${borderRadiuses.round};
  padding: ${spaces.sm};
`;

const ThemeTool: React.FC = props => (
  <ThemeToolLayout>
    <ThemeChangeButton />
  </ThemeToolLayout>
);

export default ThemeTool;
