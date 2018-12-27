const getHouseStatus = require('./getHouseStatus');
const getPropertySetStatus = require('./getPropertySetStatus');

module.exports = (Game, property_set) => {
  if (getHouseStatus(Game, property_set)) {
    return 0;
  }
  if (!getPropertySetStatus(Game, property_set)) {
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
