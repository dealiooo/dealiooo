import { remcalc } from './utils';

const constants = {
  spaces: {
    xxxs: remcalc('2px'),
    xxs: remcalc('4px'),
    xs: remcalc('6px'),
    sm: remcalc('8px'),
    md: remcalc('12px'),
    lg: remcalc('18px'),
    xl: remcalc('24px'),
    xxl: remcalc('32px'),
    xxxl: remcalc('40px'),
  },
  navbarHeight: '64.5px',
  borderRadiuses: {
    round: '4px',
    full: '9999px',
  },
  borderSizes: {
    thin: '0.5px',
    normal: '1px',
    thick: '1.5px',
  },
  transition: 'all 0.3s cubic-bezier(0.625, 0.050, 0.360, 1)',
};

export default constants;
