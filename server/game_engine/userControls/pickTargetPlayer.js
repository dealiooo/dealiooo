const userActions = require('./../userActions');

module.exports = (Game, player, callback) =>
  userActions.pick_option(Game, {
    player,
    options: Game.players.reduce((filtered, e) => {
      if (e.id !== player.id) {
        filtered.push(e.id);
      }
      return filtered;
    }, []),
    callback: (error, player_id) => {
      if (error) {
        callback(error);
      } else {
        callback(
          null,
          Game.players.filter(player => player.id === player_id)[0]
        );
      }
    }
  });
