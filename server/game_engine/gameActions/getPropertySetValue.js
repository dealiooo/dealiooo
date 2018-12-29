const getHotelStatus = require('./getHotelStatus');
const getHouseStatus = require('./getHouseStatus');

module.exports = (Game, property_set) => {
  let offset =
    getHouseStatus(Game, property_set) +
    getHotelStatus(Game, property_set);
  return (
    Game.rent_values[property_set[0].mainColor].rentValues[
      property_set.length - offset
    ] +
    offset * 2
  );
};
