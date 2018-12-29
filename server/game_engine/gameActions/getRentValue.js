const getPropertySetValue = require('./getPropertySetValue');
const getDoubleTheRentStatus = require('./getDoubleTheRentStatus');

module.exports = (Game, player, property_set) => {
  return (
    getPropertySetValue(Game, property_set) *
    Math.pow(2, getDoubleTheRentStatus(player.field.action_cards))
  );
};
