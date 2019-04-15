const userActions = require('./../userActions');

module.exports = ({Game, player, card, forced, callback}) => {
  userActions.pickOption({
    Game,
    player,
    options: card.colors,
    forced,
    callback
  });
};
