const userActions = require('./../userActions');

module.exports = ({ Game, player, card, forced, callback }) => {
  userActions.pickOption({
    Game,
    requiredPlayerId: player.id,
    message: 'Picking a color',
    options: card.colors,
    forced,
    callback
  });
};
