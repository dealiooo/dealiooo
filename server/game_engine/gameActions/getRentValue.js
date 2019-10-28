const getPropertySetValue = require('./getPropertySetValue');
const getDoubleTheRentStatus = require('./getDoubleTheRentStatus');

module.exports = ({ Game, targetPlayer, sourcePlayer, propertySet }) => {
  return (
    getPropertySetValue({ Game, propertySet }) *
    Math.pow(2, getDoubleTheRentStatus({ Game, targetPlayer, sourcePlayer }))
  );
};
