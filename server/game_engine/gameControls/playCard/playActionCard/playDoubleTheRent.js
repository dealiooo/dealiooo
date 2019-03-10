const gameActions = require('../../../gameActions');

module.exports = (Game, player, card, callback) => {
  var playerActionCounter = i => {
    if (player.id !== Game.players[i].id) {
      gameActions.avoidAction(Game, Game.players[i], player, (_, __) => done(i));
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
