const getHotelStatus = require('./getHotelStatus');
const getHouseStatus = require('./getHouseStatus');

module.exports = ({Game, propertySet}) => {
  let offset =
    getHouseStatus({Game, propertySet}) +
    getHotelStatus({Game, propertySet});
  return (
    Game.rentValues[propertySet[0].mainColor].rentValues[
      propertySet.length - offset
    ] +
    offset * 2
  );
};
