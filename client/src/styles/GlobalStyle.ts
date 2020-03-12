import { createGlobalStyle } from 'styled-components';
import { normalize } from 'polished';

const GlobalStyle = createGlobalStyle`
  ${normalize()}

  html {
    box-sizing: border-box;
  }

  *, *:after, *:before {
    box-sizing: inherit;
  }

  body {
    color: ${({ theme }) => theme.palette.text};
    background-color: ${({ theme }) => theme.palette.backgroundLightest};
    font-size: ${({ theme }) => theme.fontSizes.sm};
    font-family: ${({ theme }) => theme.fontFamilies.primary};
    font-weight: ${({ theme }) => theme.fontWeights.normal};
    line-height: ${({ theme }) => theme.lineHeights.sm};
    letter-spacing: ${({ theme }) => theme.letterSpaces.sm};
  }

  th {
    font-weight: ${({ theme }) => theme.fontWeights.bold};
  }

  input, textarea, select {
    color: inherit;
    font-family: inherit;
  }

  button {
    cursor: pointer;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  a {
    text-decoration: none;
  }
`;

export default GlobalStyle;
