const gameActions = require('../../../actions');

module.exports = (Game, player, card, callback) => {
  for (let i = 0; i < Game.players.length; i++) {
    let done = error => {
      if (error) {
        callback(error);
      } else if (i + 1 === Game.players.length) {
        callback(null, card);
      }
    };
    if (player.id !== Game.players[i].id) {
      gameActions.payRent(Game, Game.players[i], player, 2, error =>
        done(error)
      );
    }
  }
};
