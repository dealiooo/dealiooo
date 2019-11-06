// @deprecated in v1.5
// all lobbies should be visible in the main lobby
// thus no longer needing this api's
//
// const findRunningGames = db => id =>
//   db.th_users
//     .findByPk(id)
//     .then(user => user.getGames({ where: { status: 'running' } }));

// const findStartedGames = db => id =>
//   db.th_users
//     .findByPk(id)
//     .then(user => user.getGames({ where: { status: 'started' } }));

// const findOpenLobbies = db => () =>
//   db.th_games.findAll({ where: { status: 'open' } });

const findAllGamesNotEnded = db => () =>
  db.th_games.findAll({
    where: {
      [db.Sequelize.Op.not]: [
        {
          status: 'ended',
        },
      ],
    },
  });

const insertGame = db => (th_user_id, room_name, player_cap) =>
  db.th_games.create({ room_name, player_cap, status: 'open' }).then(game =>
    Promise.resolve(
      db.th_players
        .create({
          th_game_id: game.id,
          th_user_id,
          host: true,
          ready: true,
        })
        .then(_ => Promise.resolve(game)),
    ),
  );

module.exports = db => ({
  findAllGamesNotEnded: findAllGamesNotEnded(db),
  insertGame: insertGame(db),
});
