const getHotelStatus = require('./getHotelStatus');
const getHouseStatus = require('./getHouseStatus');

module.exports = ({Game, propertySet}) => {
  if (getHotelStatus({Game, propertySet})) {
    return 0;
  }
  if (!getHouseStatus({Game, propertySet})) {
    return 0;
  }
  if (
    propertySet[0].mainColor === 'railroad' ||
    propertySet[0].mainColor === 'utility'
  ) {
    return 0;
  }
  return 1;
};
