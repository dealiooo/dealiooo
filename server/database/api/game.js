const getUserIdsAndUsernames = db => id =>
  db.th_games
    .findByPk(id)
    .then(game => game.getUsers({ attributes: ['id', 'username'] }));

const removePlayer = db => (th_game_id, th_user_id) =>
  db.th_games
    .findByPk(th_game_id)
    .then(game => game.decrement('player_cap'))
    .then(_ => db.th_players.destroy({ where: { th_game_id, th_user_id } }));

const startGame = db => id =>
  db.th_games.findByPk(id).then(game => {
    if ('started' !== game.status) {
      return Promise.reject(
        new Error(`cannot run game ${id}, status: ${game.status}`)
      );
    } else {
      return db.th_games.update({ status: 'running' }, { where: { id } });
    }
  });

const endGame = db => id =>
  db.th_games.update({ status: 'ended' }, { where: { id } });

const getStatus = db => id =>
  db.th_games.findByPk(id).then(game => game.status);

module.exports = db => ({
  getUserIdsAndUsernames: getUserIdsAndUsernames(db),
  removePlayer: removePlayer(db),
  startGame: startGame(db),
  endGame: endGame(db),
  getStatus: getStatus(db)
});
