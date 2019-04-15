const getNumberFullPropertySets = require('./getNumberFullPropertySets');

module.exports = ({Game, playerId}) =>
  3 <= getNumberFullPropertySets({Game, playerId});
