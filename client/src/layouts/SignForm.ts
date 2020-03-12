import styled from 'styled-components';

import { media, constants, remcalc } from '../styles';

const { spaces } = constants;

const SignForm = styled.form`
  margin: ${spaces.md} auto;
  width: 100%;

  ${media.tablet} {
    width: ${remcalc('300px')};
  }
`;

export default SignForm;
