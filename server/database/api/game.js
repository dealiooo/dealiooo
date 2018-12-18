const getUserIds = db => id =>
  db.th_games.findById(id).then(game => game.getUsers({ attributes: ['id'] }));

const removePlayer = db => (th_game_id, th_user_id) =>
  db.th_games
    .findById(th_game_id)
    .then(game => game.decrement('player_count'))
    .then(_ => db.th_players.destroy({ where: { th_game_id, th_user_id } }));

const endGame = db => id =>
  db.th_games.update({ status: ended }, { where: { id } });

module.exports = db => ({
  getUserIds: getUserIds(db),
  removePlayer: removePlayer(db),
  endGame: endGame(db)
});
