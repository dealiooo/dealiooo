const getPlayerIds = db => th_game_id =>
  db.th_players.findAll({ attributes: ['id'], where: { th_game_id } });

const removePlayer = db => id =>
  db.th_players
    .findById(id)
    .then(player =>
      player.getGame().then(game => game.decrement('player_count'))
    )
    .then(_ => db.th_players.destroy({ where: { id } }));

const endGame = db => id =>
  db.th_games.update({ status: ended }, { where: { id } });

module.exports = db => ({
  getPlayerIds: getPlayerIds(db),
  removePlayer: removePlayer(db),
  endGame: endGame(db)
});
