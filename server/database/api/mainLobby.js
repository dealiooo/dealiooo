const findRunningGames = db => id =>
db.th_users
  .findByPk(id)
  .then(user => user.getGames({ where: { status: 'running' } }));

const findStartedGames = db => id =>
  db.th_users
    .findByPk(id)
    .then(user => user.getGames({ where: { status: 'started' } }));

const findOpenLobbies = db => () =>
  db.th_games.findAll({ where: { status: 'open' } });

const insertGame = db => (th_user_id, room_name, player_cap) =>
  db.th_games.create({ room_name, player_cap, status: 'open' }).then(game =>
    db.th_players.create({
      th_game_id: game.id,
      th_user_id,
      host: true
    })
  );

module.exports = db => ({
  findRunningGames: findRunningGames(db),
  findStartedGames: findStartedGames(db),
  findOpenLobbies: findOpenLobbies(db),
  insertGame: insertGame(db)
});
