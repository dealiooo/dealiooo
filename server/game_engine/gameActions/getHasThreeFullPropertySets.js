const getNumberFullPropertySets = require('./getNumberFullPropertySets');

module.exports = (Game, player_id) =>
  3 <= getNumberFullPropertySets(Game, player_id);
