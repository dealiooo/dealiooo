module.exports = player =>
  player
    .getGame()
    .then(game => game.increment('cards_played', { by: 1 }))
    .then(_ => player);
