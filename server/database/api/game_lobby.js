const find_game_by_id = db => game_id =>
  db.th_games.findOne({ where: { id: game_id } });

const find_all_player_names = db => game_id =>
  find_game_by_id(db)(game_id).then(game =>
    game.getUsers({ attributes: ['id', 'name'] })
  );

const find_game_lobby_status = db => game_id =>
  db.th_users.findAll({
    attributes: ['id', 'name'],
    include: [
      {
        model: db.th_players,
        as: 'Players',
        attributes: ['ready'],
        where: { th_game_id: game_id }
      }
    ]
  });

const player_size = db => game_id =>
  db.th_players.findAndCountAll({
    where: { th_game_id: game_id }
  });

const join_game = db => (game_id, user_id) =>
  player_size(db)(game_id).then(result => {
    if (result.count >= 5) {
      return Promise.reject(new Error('Game lobby is full'));
    } else {
      return db.sequelize.sync({ logging: false }).then(_ =>
        db.th_players.create({
          th_game_id: game_id,
          th_user_id: user_id,
          order: result.count + 1
        })
      );
    }
  });

const leave_game = db => (game_id, user_id) =>
  db.sequelize.sync({ logging: false }).then(_ =>
    db.th_players.destroy({
      where: {
        th_game_id: game_id,
        th_user_id: user_id
      }
    })
  );

const delete_game = db => game_id =>
  player_size(db)(game_id).then(result => {
    if (result.count) {
      return Promise.reject(new Error('Game is not empty'));
    } else {
      return db.sequelize
        .sync({ logging: false })
        .then(_ => db.th_games.destroy({ where: { id: game_id } }));
    }
  });

const run_game = db => game_id =>
  db.sequelize
    .sync({ logging: false })
    .then(_ =>
      db.th_games.update({ status: started }, { where: { id: game_id } })
    );

const game_ready = db => game_id =>
  find_all_player_names(db)(game_id).then(results =>
    results.map(result => get_player_ready(db)(game_id, result.id))
  );

const player_ready = db => (game_id, user_id) =>
  get_player_ready(db)(game_id, user_id).then(result =>
    db.sequelize.sync({ logging: false }).then(_ =>
      db.th_players.update(
        { ready: !result.ready },
        {
          where: {
            th_game_id: game_id,
            th_user_id: user_id
          },
          returning: true,
          plain: true
        }
      )
    )
  );

const get_player_ready = db => (game_id, user_id) =>
  db.th_players.findOne({
    attributes: ['ready'],
    where: {
      th_game_id: game_id,
      th_user_id: user_id
    }
  });

module.exports = db => ({
  find_game_by_id: find_game_by_id(db),
  find_all_player_names: find_all_player_names(db),
  find_game_lobby_status: find_game_lobby_status(db),
  player_size: player_size(db),
  join_game: join_game(db),
  leave_game: leave_game(db),
  delete_game: delete_game(db),
  run_game: run_game(db),
  game_ready: game_ready(db),
  player_ready: player_ready(db),
  get_player_ready: get_player_ready(db)
});
