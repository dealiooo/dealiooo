import { RentValue } from '../../../types';
import CardColorsMap from './card-colors-map';

const RentValuesMap: { [key in CardColorsMap]: RentValue } = {
  green: {
    rentValues: [2, 4, 7],
    maxSetSize: 3,
  },
  blueDark: {
    rentValues: [3, 8],
    maxSetSize: 2,
  },
  blueLight: {
    rentValues: [1, 2, 3],
    maxSetSize: 3,
  },
  red: {
    rentValues: [2, 3, 6],
    maxSetSize: 3,
  },
  greenLight: {
    rentValues: [1, 2],
    maxSetSize: 2,
  },
  yellow: {
    rentValues: [2, 4, 6],
    maxSetSize: 3,
  },
  orange: {
    rentValues: [1, 3, 5],
    maxSetSize: 3,
  },
  brown: {
    rentValues: [1, 2],
    maxSetSize: 2,
  },
  purple: {
    rentValues: [1, 2, 4],
    maxSetSize: 3,
  },
  black: {
    rentValues: [1, 2, 3, 4],
    maxSetSize: 4,
  },
};

export default RentValuesMap;
