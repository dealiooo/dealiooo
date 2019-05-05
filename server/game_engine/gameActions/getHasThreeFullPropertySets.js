const getNumberFullPropertySets = require('./getNumberFullPropertySets');

module.exports = ({ Game, player }) =>
  3 <= getNumberFullPropertySets({ Game, player });
