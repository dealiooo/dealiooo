const { Game } = require('../../database/api');

const property_set = 'property_set';

const removeEmptyPropertySets = th_player_id =>
  Game.getPilesByTypes(th_player_id, [property_set]).then(piles =>
    Promise.all(piles.filter(Game.removeEmptySet))
  );

const getPropertySetValid = set =>
  Game.getRentByMainColor(set[0].main_color).then(rent => {
    if (
      set.filter(card => 'property-wildcard' === card.type).length ===
      rent.max_size
    ) {
      return 0;
    }
    return set.length >= rent.max_size;
  });

const getPropertySetStatus = set =>
  Game.getRentByMainColor(set[0].main_color).then(
    rent => set.length >= rent.max_size
  );

const getCanAddPropertyToPropertySet = card => set =>
  Game.getRentByMainColor(card.main_color).then(rent => {
    if (!set.length) {
      return 1;
    }
    if (card.main_color === set[0].main_color) {
      return set.length < rent.max_size;
    }
    return 0;
  });

const getHouseStatus = set =>
  Game.getRentByMainColor(set[0].main_color).then(
    rent => set.length >= rent.max_size + 1
  );

const getCanAddHouseToPropertySet = pile =>
  pile
    .getCards()
    .then(set =>
      getHouseStatus(set)
        .then(result => {
          if (!result) {
            return getPropertySetStatus(set);
          }
          return Promise.reject(new Error('Cant add house'));
        })
        .then(result => {
          if (result) {
            return (
              'railroad' === set[0].main_color ||
              'utility' === set[0].main_color
            );
          }
          return Promise.reject(new Error('Cant add house'));
        })
    )
    .catch(_ => 0);

const getHotelStatus = set =>
  Game.getRentByMainColor(set[0].main_color).then(
    rent => set.length >= rent.max_size + 2
  );

const getCanAddHotelToPropertySet = pile =>
  pile
    .getCards()
    .then(set =>
      getHotelStatus(set).then(result => {
        if (!result) {
          return getHouseStatus(set);
        }
        return Promise.reject(new Error('Cant add house'));
      })
    )
    .catch(_ => 0);

const getAllDestinations = ({ th_player_id }) =>
  Game.getPilesByTypes(th_player_id, [property_set]);

const getBuildingDestinations = ({ th_player_id, card }) =>
  Game.getPileById(card.th_pile_id).then(pile => {
    if ('building' !== pile.type) {
      return [];
    } else if ('house' === card.name) {
      return Game.getPilesByTypes(th_player_id, [property_set]).then(piles =>
        Promise.all(piles.filter(getCanAddHouseToPropertySet))
      );
    } else {
      return Game.getPilesByTypes(th_player_id, [property_set]).then(piles =>
        Promise.all(piles.filter(getCanAddHotelToPropertySet))
      );
    }
  });

const getPropertyDestinations = ({ th_player_id, card }) =>
  Game.getPilesByTypes(th_player_id, [property_set]).then(piles =>
    Promise.all(piles.filter(getCanAddPropertyToPropertySet(card)))
  );

const getRentDestinations = ({ th_player_id, card }) =>
  Game.getPilesByTypes(th_player_id, [property_set]).then(piles =>
    Promise.all(piles.filter(pile => pile[0].main_color === card.main_color))
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
