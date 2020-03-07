import { remcalc } from '../utils';

const typography = {
  fontFamilies: {
    primary: 'Mukta, sans-serif',
  },
  fontSizes: {
    xxs: remcalc('8px'),
    xs: remcalc('10px'),
    sm: remcalc('12px'),
    md: remcalc('16px'),
    lg: remcalc('20px'),
    xl: remcalc('24px'),
    xxl: remcalc('28px'),
    xxxl: remcalc('32px'),
  },
  fontWeights: {
    light: 200,
    normal: 300,
    semiBold: 400,
    bold: 500,
    extraBold: 600,
  },
  letterSpaces: {
    sm: '0.2px',
    md: '0.5px',
    lg: '2px',
  },
  lineHeights: {
    sm: 1.2,
    md: 1.5,
    lg: 1.8,
  },
};

export default typography;
