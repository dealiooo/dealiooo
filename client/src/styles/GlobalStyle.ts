import { createGlobalStyle } from 'styled-components';
import { normalize } from 'polished';

import { lineHeight, letterSpace, fontSize, fontWeight } from './typography';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Mukta:300,400,500,600,700&display=swap');

  ${normalize()}

  html {
    font-family: 'Mukta';
    word-wrap: break-word;
    box-sizing: border-box;
  }

  *, *:after, *:before {
    box-sizing: inherit;
  }

  body {
    color: ${({ theme }) => theme.text};
    background-color: ${({ theme }) => theme.backgroundLightest};
    font-size: ${fontSize.primary};
    line-height: ${lineHeight.normal};
    letter-spacing: ${letterSpace.normal};
  }

  th {
    font-weight: ${fontWeight.bold};
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

  // customize react-perfect-scrollbar
  .scrollbar-container {
    width: 100%;
  }
`;

/* eslint-disable import/first */
import 'react-perfect-scrollbar/dist/css/styles.css';

export default GlobalStyle;
