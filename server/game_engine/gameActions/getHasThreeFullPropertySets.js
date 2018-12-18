const gameActions = require('./');

module.exports = (Game, player_id) =>
  3 <= gameActions.getNumberFullPropertySets(Game, player_id);
