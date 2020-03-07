import styled from 'styled-components';

import { media, constants } from '../styles';

const { spaces } = constants;

const SignForm = styled.form`
  margin: ${spaces.xxxl} auto;
  width: 100%;

  ${media.tablet} {
    width: 300px;
  }
`;

export default SignForm;
