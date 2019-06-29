const getPropertySetStatus = require('./getPropertySetStatus');
const getCanAddHotelToPropertySet = require('./getCanAddHotelToPropertySet');
const getCanAddHouseToPropertySet = require('./getCanAddHouseToPropertySet');

const getAllDestinations = ({ player }) => {
  let destinationIndexes = [];
  let destinations = player.field.propertyCards.filter((set, i) => {
    destinationIndexes.push(`${i}`);
    return set;
  });
  return { destinations, destinationIndexes };
};

const getPropertyDestinations = ({ Game, player, card }) => {
  let destinationIndexes = [];
  let destinations = player.field.propertyCards.filter((set, i) => {
    if (set.length) {
      if (set[0].mainColor === card.mainColor) {
        if (!getPropertySetStatus({ Game, propertySet: set })) {
          destinationIndexes.push(`${i}`);
          return true;
        }
      }
    } else {
      destinationIndexes.push(`${i}`);
      return true;
    }
    return false;
  });
  return { destinations, destinationIndexes };
};

const getBuildingDestinations = ({ Game, player, card, source }) => {
  let destinations = [];
  let destinationIndexes = [];
  if (player.field.buildingCards !== source) {
    destinations = [];
  } else if ('house' === card.name) {
    destinations = player.field.propertyCards.filter((set, i) => {
      let condition = getCanAddHouseToPropertySet({ Game, propertySet: set });
      if (condition) {
        destinationIndexes.push(`${i}`);
      }
      return condition;
    });
  } else {
    destinations = player.field.propertyCards.filter((set, i) => {
      let condition = getCanAddHotelToPropertySet({ Game, propertySet: set });
      if (condition) {
        destinationIndexes.push(`${i}`);
      }
      return condition;
    });
  }
  return { destinations, destinationIndexes };
};

const getRentDestinations = ({ player, card }) => {
  let destinationIndexes = [];
  let destinations = player.field.propertyCards.filter((set, i) => {
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
  rent_wildcard: getRentDestinations,
  all: getAllDestinations
};
