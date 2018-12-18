const gameActions = require('./');

module.exports = (Game, property_set) => {
  let offset =
    gameActions.getHouseStatus(Game, property_set) +
    gameActions.getHotelStatus(Game, property_set);
  return (
    Game.rent_values[property_set[0].mainColor].rentValues[
      property_set.length - offset
    ] +
    offset * 2
  );
};
