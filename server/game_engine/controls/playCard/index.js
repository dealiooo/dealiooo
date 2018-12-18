const playActionCard = require('./playActionCard');
const playBuildingCard = require('./playBuildingCard');
const playMoneyCard = require('./playMoneyCard');
const playPropertyCard = require('./playPropertyCard');
const playPropertyWildCard = require('./playPropertyWildCard');
const playDualColorRentCard = require('./playDualColorRentCard');
const playRentWildCard = require('./playRentWildCard');

const playCard = (Game, player, card, callback) => {
  const play = {
    action: playActionCard,
    building: playBuildingCard,
    money: playMoneyCard,
    property: playPropertyCard,
    property_wildcard: playPropertyWildCard,
    rent: playDualColorRentCard,
    rent_wildcard: playRentWildCard
  };
  play[card.type](Game, player, card, callback);
};

module.exports = playCard;
