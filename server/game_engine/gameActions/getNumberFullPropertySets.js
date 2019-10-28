const getPropertySetStatus = require('./getPropertySetStatus');

module.exports = ({ Game, player }) => {
  let sum = 0;
  player.field.propertyCards.map(
    propertySet => (sum += getPropertySetStatus({ Game, propertySet }))
  );
  return sum;
};
