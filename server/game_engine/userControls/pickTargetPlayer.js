const userActions = require('./../userActions');

module.exports = ({ Game, player, forced, callback }) =>
  userActions.pickOption({
    Game,
    requiredPlayerId: player.id,
    message: 'picking a target player',
    forced,
    options: Game.players.reduce((filtered, e) => {
      if (e.username !== player.username) {
        filtered.push(e.username);
      }
      return filtered;
    }, []),
    callback: ({ error, option, cancelled, forced }) => {
      if (error) {
        callback({ error });
      } else if (cancelled) {
        callback({ cancelled });
      } else if (forced) {
        callback({
          targetPlayer: Game.players.reduce((filtered, e) => {
            if (e.username !== player.username) {
              filtered.push(e.username);
            }
            return filtered;
          }, [])[0],
          forced
        });
      } else {
        callback({
          targetPlayer: Game.players.filter(
            player => player.username === option
          )[0]
        });
      }
    }
  });
