import { css } from 'styled-components';

import constants from './constants';

const { borderSizes, borderRadiuses, transition } = constants;

const mixins = {
  flexRowCenter: css`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  `,
  flexColCenter: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
  roundBox: css`
    border: ${borderSizes.normal} solid ${({ theme }) => theme.palette.outline};
    border-radius: ${borderRadiuses.round};
  `,
  imageResponsive: css`
    max-width: 100%;
    height: auto;
  `,
  link: css`
    color: inherit;
    cursor: pointer;
    width: 100%;
    transition: ${transition};

    &.underline {
      border-bottom: ${borderSizes.thick} solid transparent;
      &:hover {
        border-bottom: ${borderSizes.thick} solid ${({ theme }) => theme.palette.primary};
      }
    }
  `,
  border: css`
    border-width: ${borderSizes.normal};
    border-style: solid;
    border-color: ${({ theme, color }) => theme.palette[color] || color || theme.palette.outline};
    &:focus {
      border-width: ${borderSizes.thick};
    }
    &:disabled {
      border-color: ${({ theme }) => theme.palette.gray};
    }
  `,
  // TODO: use classes instead
  elementHoverDisplay: element => css`
    & > ${element} {
      display: none;
    }

    &:hover {
      & > ${element} {
        display: block;
      }
    }
  `,
};

export default mixins;
