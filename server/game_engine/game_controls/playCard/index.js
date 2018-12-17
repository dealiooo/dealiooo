const action = require('./playActionCard');
const building = require('./playBuildingCard');
const money = require('./playMoneyCard');
const property = require('./playPropertyCard');
const property_wildcard = require('./playPropertyWildCard');
const rent = require('./playDualColorRentCard');
const rent_wildcard = require('./playRentWildCard');

module.exports = (player, card, callback) => {
  const play = {
    action,
    building,
    money,
    property,
    property_wildcard,
    rent,
    rent_wildcard
  };
  return play[card.type](player, card, callback);
};
