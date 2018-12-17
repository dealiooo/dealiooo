const gameActions = require('./../game_actions');

module.exports = player_id =>
  gameActions
    .startGame(player_id)
    .then(game =>
      game
        .getPlayers({ where: 'order > 0' })
        .then(players =>
          Promise.all(
            players.map(player =>
              [1, 2, 3, 4, 5].map(_ => gameActions.drawCard(player))
            )
          )
        )
    );
