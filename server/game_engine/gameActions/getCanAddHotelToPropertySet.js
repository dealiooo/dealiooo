const getHotelStatus = require('./getHotelStatus');
const getHouseStatus = require('./getHouseStatus');

module.exports = (Game, property_set) => {
  if (getHotelStatus(Game, property_set)) {
    return 0;
  }
  if (!getHouseStatus(Game, property_set)) {
    return 0;
  }
  if (
    property_set[0].mainColor === 'railroad' ||
    property_set[0].mainColor === 'utility'
  ) {
    return 0;
  }
  return 1;
};
