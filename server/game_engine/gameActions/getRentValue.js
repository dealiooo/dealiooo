const getPropertySetValue = require('./getPropertySetValue');
const getDoubleTheRentStatus = require('./getDoubleTheRentStatus');

module.exports = (Game, targetPlayer, sourcePlayer, property_set) => {
  return (
    getPropertySetValue(Game, property_set) *
    Math.pow(2, getDoubleTheRentStatus(Game, targetPlayer, sourcePlayer))
  );
};
