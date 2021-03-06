const addEmptyPropertySet = require('./addEmptyPropertySet');
const avoidAction = require('./avoidAction');
const drawCard = require('./drawCard');
const getCanAddHotelToPropertySet = require('./getCanAddHotelToPropertySet');
const getCanAddHouseToPropertySet = require('./getCanAddHouseToPropertySet');
const getDeckEmpty = require('./getDeckEmpty');
const getDestinations = require('./getDestinations');
const getDiscardEmpty = require('./getDiscardEmpty');
const getDoubleTheRentStatus = require('./getDoubleTheRentStatus');
const getHasPlayedThreeCards = require('./getHasPlayedThreeCards');
const getHasSevenOrLessCards = require('./getHasSevenOrLessCards');
const getHasThreeFullPropertySets = require('./getHasThreeFullPropertySets');
const getHasTwoToFivePlayers = require('./getHasTwoToFivePlayers');
const getHotelStatus = require('./getHotelStatus');
const getHouseStatus = require('./getHouseStatus');
const getNumberFullPropertySets = require('./getNumberFullPropertySets');
const getPileValue = require('./getPileValue');
const getPropertyColorMatchesRentColor = require('./getPropertyColorMatchesRentColor');
const getPropertyPileValue = require('./getPropertyPileValue');
const getPropertySetStatus = require('./getPropertySetStatus');
const getPropertySetValue = require('./getPropertySetValue');
const getRentValue = require('./getRentValue');
const isPileNotEmpty = require('./isPileNotEmpty');
const moveCard = require('./moveCard');
const movePile = require('./movePile');
const onCounterCardPlayed = require('./onCounterCardPlayed');
const onNonCounterCardPlayed = require('./onNonCounterCardPlayed');
const payRent = require('./payRent');
const removeEmptyPropertySets = require('./removeEmptyPropertySets');
const removePlayer = require('./removePlayer');
const shufflePile = require('./shufflePile');
const swapPropertyCards = require('./swapPropertyCards');
const switchColor = require('./switchColor');

module.exports = {
  addEmptyPropertySet,
  avoidAction,
  drawCard,
  getCanAddHotelToPropertySet,
  getCanAddHouseToPropertySet,
  getDeckEmpty,
  getDestinations,
  getDiscardEmpty,
  getDoubleTheRentStatus,
  getHasPlayedThreeCards,
  getHasSevenOrLessCards,
  getHasThreeFullPropertySets,
  getHasTwoToFivePlayers,
  getHotelStatus,
  getHouseStatus,
  getNumberFullPropertySets,
  getPileValue,
  getPropertyColorMatchesRentColor,
  getPropertyPileValue,
  getPropertySetStatus,
  getPropertySetValue,
  getRentValue,
  isPileNotEmpty,
  onCounterCardPlayed,
  onNonCounterCardPlayed,
  moveCard,
  movePile,
  payRent,
  removeEmptyPropertySets,
  removePlayer,
  shufflePile,
  swapPropertyCards,
  switchColor
};
