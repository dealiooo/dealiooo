const gameActions = require('./');

module.exports = (Game, player, property_set) => {
  return (
    gameActions.getPropertySetValue(Game, property_set) *
    Math.pow(2, gameActions.getDoubleTheRentStatus(player.field.action_cards))
  );
};
