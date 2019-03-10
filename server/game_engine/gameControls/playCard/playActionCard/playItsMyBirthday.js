const gameActions = require('../../../gameActions');

module.exports = (Game, player, card, callback) => {
  var playerActionCounter = i => {
    if (player.id !== Game.players[i].id) {
      gameActions.avoidAction(Game, Game.players[i], player, (_, avoid) => {
        if (avoid) {
          done(i);
        } else {
          gameActions.payRent(Game, Game.players[i], player, 2, _ =>
            done(i)
          );
        }
      });
    } else {
      done(i);
    }
  }
  var done = i => {
    if (i == Game.players.length) {
      callback(null, card);
    } else {
      playerActionCounter(i + 1);
    }
  }
  playerActionCounter(0);
};
