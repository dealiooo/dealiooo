const gameActions = require('../../../gameActions');

module.exports = ({ Game, player, card, callback }) => {
  gameActions.moveCard({
    source: player.hand,
    destination: player.field.actionCards,
    card
  });
  gameActions.onNonCounterCardPlayed({ Game, card });
  var playerActionCounter = i => {
    if (player.id !== Game.players[i].id) {
      gameActions.avoidAction({
        Game,
        player: Game.players[i],
        sourcePlayer: player,
        callback: ({ avoid, forced }) => {
          if (avoid || forced) {
            done(i);
          } else {
            gameActions.payRent({
              Game,
              payee: Game.players[i],
              player,
              amount: 2,
              callback: _ => done(i)
            });
          }
        }
      });
    } else {
      done(i);
    }
  };
  var done = i => {
    if (i === Game.players.length - 1) {
      callback({ card });
    } else {
      playerActionCounter(i + 1);
    }
  };
  playerActionCounter(0);
};
