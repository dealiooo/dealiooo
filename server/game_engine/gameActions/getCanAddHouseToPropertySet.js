const getHouseStatus = require('./getHouseStatus');
const getPropertySetStatus = require('./getPropertySetStatus');

module.exports = ({Game, propertySet}) => {
  if (getHouseStatus({Game, propertySet})) {
    return 0;
  }
  if (!getPropertySetStatus({Game, propertySet})) {
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
