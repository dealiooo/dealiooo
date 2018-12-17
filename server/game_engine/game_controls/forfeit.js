const gameActions = require('./../game_actions');

module.exports = player =>
  player
    .getGame()
    .then(game =>
      game
        .decrement('player_count', { by: 1 })
        .then(_ => game.increment('turn', { by: 1 }))
    )
    .then(_ => player.getPiles())
    .then(piles =>
      Promise.all(piles.map(pile => gameActions.discardPile(player, pile)))
    )
    .then(_ => gameActions.removePlayer(player))
    .then(_ => gameActions.updateCurrentPlayer(player));
