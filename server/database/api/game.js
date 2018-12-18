const getPlayerIds = db => th_game_id =>
  db.th_players.findAll({ attributes: ['id'], where: { th_game_id } });

const removePlayer = db => id => db.th_player_id.destroy({ where: { id } });

const endGame = db => id =>
  db.th_games.update({ state: ended }, { where: { id } });

module.exports = db => ({
  getPlayerIds: getPlayerIds(db),
  removePlayer: removePlayer(db),
  endGame: endGame(db)
});
