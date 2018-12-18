const getUsersNames = db => id =>
  db.th_games
    .findById(id)
    .then(game => game.getUsers({ attributes: ['id', 'name'] }));

const getPlayersStatus = db => th_game_id =>
  db.th_users.findAll({
    attributes: ['id', 'name'],
    include: [
      {
        model: db.th_players,
        as: 'Players',
        attributes: ['ready', 'host'],
        where: { th_game_id }
      }
    ]
  });

const joinGame = db => (th_game_id, th_user_id) =>
  db.th_games.findById(th_game_id).then(game =>
    game.getPlayers().then(players => {
      if (game.player_cap > players.length) {
        return db.th_players.create({
          th_game_id,
          th_user_id
        });
      } else {
        return Promise.reject(new Error('Game lobby is full'));
      }
    })
  );

const leaveGame = db => (th_game_id, th_user_id) =>
  db.th_players
    .findOne({
      where: {
        th_game_id,
        th_user_id
      }
    })
    .then(player => {
      if (player.host) {
        return db.th_players
          .destroy({ where: { th_game_id } })
          .then(_ => db.th_games.destroy({ where: { id: th_game_id } }));
      } else {
        return db.th_players.destroy({ where: { th_game_id, th_user_id } });
      }
    });

const startGame = db => id =>
  db.th_games.update({ status: started }, { where: { id } });

const getGameReady = db => id =>
  db.th_games
    .findOne({ where: { id } })
    .then(game =>
      game
        .getPlayers({ where: { ready: true } })
        .then(players => game.player_cap === players.length)
    );

const getPlayerReady = db => (th_game_id, th_user_id) =>
  db.th_players.findOne({
    attributes: ['ready'],
    where: {
      th_game_id,
      th_user_id
    }
  });

const togglePlayerReady = db => (th_game_id, th_user_id) =>
  getPlayerReady(db)(th_game_id, th_user_id).then(result =>
    db.th_players.update(
      { ready: !result.ready },
      {
        where: {
          th_game_id,
          th_user_id
        },
        returning: true,
        plain: true
      }
    )
  );

module.exports = db => ({
  getUsersNames: getUsersNames(db),
  getPlayersStatus: getPlayersStatus(db),
  joinGame: joinGame(db),
  leaveGame: leaveGame(db),
  startGame: startGame(db),
  getGameReady: getGameReady(db),
  getPlayerReady: getPlayerReady(db),
  togglePlayerReady: togglePlayerReady(db)
});
