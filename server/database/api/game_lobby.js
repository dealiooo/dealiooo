const find_game_by_id = db => id => db.th_games.findOne({ where: { id } });

const find_all_player_names = db => game_id =>
  find_game_by_id(db)(game_id).then(game =>
    game.getUsers({ attributes: ['id', 'name'] })
  );

const find_game_lobby_status = db => th_game_id =>
  db.th_users.findAll({
    attributes: ['id', 'name'],
    include: [
      {
        model: db.th_players,
        as: 'Players',
        attributes: ['ready'],
        where: { th_game_id }
      }
    ]
  });

const join_game = db => (th_game_id, th_user_id) =>
  find_game_by_id(db)(th_game_id).then(game =>
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

const leave_game = db => (th_game_id, th_user_id) =>
  db.th_players
    .findOne({
      where: {
        th_game_id,
        th_user_id
      }
    })
    .then(player => {
      if (player.host) {
        return db.th_players.destroy({ where: { th_game_id } });
      } else {
        return db.th_players.destroy({ where: { th_game_id, th_user_id } });
      }
    });

const delete_game = db => id =>
  db.th_players.findAll({ where: { th_game_id: id } }).then(players => {
    if (players.length) {
      return Promise.reject(new Error('Game is not empty'));
    } else {
      return db.th_games.destroy({ where: { id } });
    }
  });

const run_game = db => id =>
  db.th_games.update({ status: started }, { where: { id } });

const game_ready = db => id =>
  db.th_games
    .findOne({ where: { id } })
    .then(game =>
      game
        .getPlayers({ where: { ready: true } })
        .then(players => game.player_cap === players.length)
    );

const player_ready = db => (th_game_id, th_user_id) =>
  get_player_ready(db)(th_game_id, th_user_id).then(result =>
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

const get_player_ready = db => (th_game_id, th_user_id) =>
  db.th_players.findOne({
    attributes: ['ready'],
    where: {
      th_game_id,
      th_user_id
    }
  });

module.exports = db => ({
  find_game_by_id: find_game_by_id(db),
  find_all_player_names: find_all_player_names(db),
  find_game_lobby_status: find_game_lobby_status(db),
  join_game: join_game(db),
  leave_game: leave_game(db),
  delete_game: delete_game(db),
  run_game: run_game(db),
  game_ready: game_ready(db),
  player_ready: player_ready(db),
  get_player_ready: get_player_ready(db)
});
