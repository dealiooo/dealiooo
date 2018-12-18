const find_all_game_lobbies = db => () =>
  db.th_games.findAll({ where: { state: open } });

const insert_game = db => (user_id, player_cap) =>
  db.sequelize
    .sync({ logging: false })
    .then(_ => db.th_games.create({ player_cap }))
    .then(game =>
      db.th_players.create({
        th_game_id: game.id,
        th_user_id: user_id,
        state: open
      })
    );

module.exports = db => ({
  find_all_game_lobbies: find_all_game_lobbies(db),
  insert_game: insert_game(db)
});
