const gameActions = require('./');

const getAllDestinations = (player, card, source) => {
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
        if (!gameActions.getPropertySetStatus(Game, set)) {
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
  let destination = [];
  let destinationIndexes = [];
  if (player.field.building_cards !== source) {
    destination = [];
  } else if ('house' === card.name) {
    destination = player.field.property_cards.filter((set, i) => {
      let condition = gameActions.getCanAddHouseToPropertySet(Game, set);
      if (condition) {
        destinationIndexes.push(`${i}`);
      }
      return condition;
    });
  } else {
    destination = player.field.property_cards.filter((set, i) => {
      let condition = gameActions.getCanAddHotelToPropertySet(Game, set);
      if (condition) {
        destinationIndexes.push(`${i}`);
      }
      return condition;
    });
  }
  return { destination, destinationIndexes };
};

const getRentDestinations = (player, card, source) => {
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
