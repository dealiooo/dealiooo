const getPropertySetStatus = require('./getPropertySetStatus');
const getCanAddHotelToPropertySet = require('./getCanAddHotelToPropertySet');
const getCanAddHouseToPropertySet = require('./getCanAddHouseToPropertySet');

const getAllDestinations = (Game, player, card, source) => {
  let destinationIndexes = [];
  let destinations = player.field.property_cards.filter((set, i) => {
    destinationIndexes.push(`${i}`);
    return set;
  });
  return { destinations, destinationIndexes };
};

const getPropertyDestinations = (Game, player, card, source) => {
  let destinationIndexes = [];
  let destinations = player.field.property_cards.filter((set, i) => {
    if (set.length) {
      if (set[0].mainColor === card.mainColor) {
        if (!getPropertySetStatus(Game, set)) {
          destinationIndexes.push(`${i}`);
        }
      }
    } else {
      destinationIndexes.push(`${i}`);
    }
    return set;
  });
  return { destinations, destinationIndexes };
};

const getBuildingDestinations = (Game, player, card, source) => {
  let destinations = [];
  let destinationIndexes = [];
  if (player.field.building_cards !== source) {
    destinations = [];
  } else if ('house' === card.name) {
    destinations = player.field.property_cards.filter((set, i) => {
      let condition = getCanAddHouseToPropertySet(Game, set);
      if (condition) {
        destinationIndexes.push(`${i}`);
      }
      return condition;
    });
  } else {
    destinations = player.field.property_cards.filter((set, i) => {
      let condition = getCanAddHotelToPropertySet(Game, set);
      if (condition) {
        destinationIndexes.push(`${i}`);
      }
      return condition;
    });
  }
  return { destinations, destinationIndexes };
};

const getRentDestinations = (Game, player, card, source) => {
  let destinationIndexes = [];
  let destinations = player.field.property_cards.filter((set, i) => {
    let condition = set.length && set[0].mainColor === card.mainColor;
    if (condition) {
      destinationIndexes.push(`${i}`);
    }
    return condition;
  });

  return { destinations, destinationIndexes };
};

module.exports = {
  property: getPropertyDestinations,
  property_wildcard: getPropertyDestinations,
  building: getBuildingDestinations,
  rent: getRentDestinations,
  all: getAllDestinations
};
