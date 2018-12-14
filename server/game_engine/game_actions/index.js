const { Game } = require('../../database/api');

const property_set = 'property_set';

const filterAsync = (array, filter) =>
  Promise.all(array.map(element => filter(element))).then(result =>
    array.filter(_ => result.shift())
  );

const removeEmptyPropertySets = th_player_id =>
  Game.getPilesByTypes(th_player_id, [property_set]).then(piles =>
    filterAsync(piles, Game.removeEmptySet)
  );

const getPropertySetValid = (set, rent) =>
  set.filter(card => 'property-wildcard' === card.type).length !==
    rent.max_size && set.length >= rent.max_size;

const getPropertySetStatus = (set, rent) => set.length >= rent.max_size;

const getHouseStatus = (set, rent) => set.length >= rent.max_size + 1;

const getHotelStatus = (set, rent) => set.length >= rent.max_size + 2;

const getCanAddPropertyToPropertySet = card => set =>
  Game.getRentByMainColor(card.main_color).then(rent => {
    if (!set.length) {
      return 1;
    }
    return card.main_color === set[0].main_color && set.length < rent.max_size;
  });

const getCanAddHouseToPropertySet = pile =>
  pile
    .getCards()
    .then(set =>
      Game.getRentByMainColor(card.main_color).then(
        rent =>
          !getHouseStatus(set, rent) &&
          getPropertySetStatus(set, rent) &&
          ('railroad' === set[0].main_color || 'utility' === set[0].main_color)
      )
    );

const getCanAddHotelToPropertySet = pile =>
  pile
    .getCards()
    .then(set =>
      Game.getRentByMainColor(card.main_color).then(
        rent => !getHotelStatus(set, rent) && getHouseStatus(set)
      )
    );

const getAllDestinations = ({ th_player_id }) =>
  Game.getPilesByTypes(th_player_id, [property_set]);

const getBuildingDestinations = ({ th_player_id, card }) =>
  Game.getPileById(card.th_pile_id).then(pile => {
    if ('building' !== pile.type) {
      return [];
    } else if ('house' === card.name) {
      return Game.getPilesByTypes(th_player_id, [property_set]).then(piles =>
        filterAsync(piles, getCanAddHouseToPropertySet)
      );
    } else {
      return Game.getPilesByTypes(th_player_id, [property_set]).then(piles =>
        filterAsync(piles, getCanAddHotelToPropertySet)
      );
    }
  });

const getPropertyDestinations = ({ th_player_id, card }) =>
  Game.getPilesByTypes(th_player_id, [property_set]).then(piles =>
    filterAsync(piles, getCanAddPropertyToPropertySet(card))
  );

const getRentDestinations = ({ th_player_id, card }) =>
  Game.getPilesByTypes(th_player_id, [property_set]).then(piles =>
    piles.filter(pile => pile[0].main_color === card.main_color)
  );

const getDestinations = {
  all: getAllDestinations,
  building: getBuildingDestinations,
  property: getPropertyDestinations,
  property_wildcard: getPropertyDestinations,
  rent: getRentDestinations
};

module.exports = {
  removeEmptyPropertySets,
  getDestinations
};
