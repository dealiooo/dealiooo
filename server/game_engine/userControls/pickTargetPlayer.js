const userActions = require('./../userActions');

module.exports = ({Game, player, forced, callback}) =>
  userActions.pickOption({
    Game,
    player,
    forced,
    options: Game.players.reduce((filtered, e) => {
      if (e.id !== player.id) {
        filtered.push(e.id);
      }
      return filtered;
    }, []),
    callback: ({error, option, cancelled, forced}) => {
      if (error) {
        callback({error});
      } else if (cancelled) {
        callback({cancelled});
      } else if (forced) {
        callback({
          targetPlayer: Game.players.reduce((filtered, e) => {
            if (e.id !== player.id) {
              filtered.push(e.id);
            }
            return filtered;
          }, [])[0],
          forced
        });
      } else {
        callback({
          targetPlayer: Game.players.filter(player => player.id === option)[0]
        });
      }
    }
  });
