const userActions = require('../userActions');

module.exports = ({ Game, player, question, forced, callback }) =>
  userActions.pickOption({
    Game,
    requiredPlayerId: player.id,
    options: ['Yes', 'No'],
    message: question + '\n1. Yes\n2. No',
    forced,
    callback: ({ error, option, forced }) => {
      if (error) {
        callback({ error });
      } else if ('Yes' === option) {
        callback({ play: true });
      } else {
        callback({ play: false, forced });
      }
    }
  });
