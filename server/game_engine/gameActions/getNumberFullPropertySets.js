const getPropertySetStatus = require('./getPropertySetStatus');

module.exports = (Game, player) => {
  let sum = 0;
  player.field.property_cards.map(
    property_set =>
      (sum += getPropertySetStatus(Game, property_set))
  );
  return sum;
};
