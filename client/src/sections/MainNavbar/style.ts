import styled from 'styled-components';

import { Navbar as NavbarBase, IconButton } from '../../components';
import { constants, mixins } from '../../styles';
import { NavbarComponent } from '../../components/Navbar';

const { borderSizes, spaces } = constants;

export const Toggler = styled(IconButton)`
  border-radius: 0;
  padding-left: ${spaces.lg};
  padding-right: ${spaces.lg};
`;

export const TriggerWrapper = styled.div`
  ${mixins.flexColCenter};
`;

export const Navbar = styled(NavbarBase)`
  background-color: ${({ theme }) => theme.palette.backgroundLightest};
  border-bottom: ${borderSizes.normal} solid ${({ theme }) => theme.palette.outline};
` as NavbarComponent;
