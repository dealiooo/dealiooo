import styled from 'styled-components';

import { constants, mixins, remcalc } from '../../../../../../styles';
import { BorderCircle } from '../../../style';

const { spaces, borderRadiuses, borderSizes } = constants;

export const BorderCircles = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

export const RentValueDetails = styled.div`
  display: flex;
  margin-top: ${spaces.lg};
`;

export const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: ${spaces.sm};
  margin: -${spaces.sm};
  border-bottom: ${borderSizes.thin} solid ${({ theme }) => theme.palette.outline};

  & > ${BorderCircle} {
    margin-left: ${spaces.lg};
  }
`;

export const Container = styled.div`
  border: ${borderSizes.normal} solid ${({ theme }) => theme.palette.background};
  min-width: ${remcalc('300px')};
  padding: ${spaces.sm};
  border-radius: ${borderRadiuses.round};
  background-color: ${({ theme }) => theme.palette.backgroundLighter};
  margin-bottom: ${spaces.sm};
`;

export const Content = styled.div`
  margin-top: ${spaces.lg};
`;

export const Type = styled.div`
  display: inline-block;
  padding: ${spaces.sm} ${spaces.lg};
  background-color: ${({ theme }) => theme.palette.backgroundDark};
  border-radius: ${borderRadiuses.round};
`;

export const Header = styled.header`
  ${mixins.flexRowCenter}
`;

export const Description = styled.div`
  margin: ${spaces.sm} 0;
`;
