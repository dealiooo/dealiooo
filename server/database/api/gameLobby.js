const getPlayers = db => id =>
  db.th_games.findByPk(id, {
    include: [
      {
        model: db.th_players,
        as: "Players",
        attributes: ["host"],
        include: [
          {
            model: db.th_users,
            as: "User",
            attributes: ["id", "name"]
          }
        ]
      }
    ]
  });

const getPlayersStatus = db => th_game_id =>
  db.th_users.findAll({
    attributes: ["id", "name"],
    include: [
      {
        model: db.th_players,
        as: "Players",
        attributes: ["ready", "host"],
        where: { th_game_id }
      }
    ]
  });

const joinGame = db => (th_game_id, th_user_id) =>
  db.th_games.findByPk(th_game_id).then(game =>
    game.getPlayers().then(players => {
      if (game.player_cap > players.length) {
        return db.th_players.create({
          th_game_id,
          th_user_id
        });
      } else {
        return Promise.reject(new Error("Game lobby is full"));
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
  db.th_games.update({ status: "started" }, { where: { id } });

const getGameReady = db => id =>
  db.th_games.findOne({ where: { id } }).then(game =>
    game.getPlayers().then(players => {
      if (players.length < game.player_cap) {
        return {
          ready: false,
          status: "there are not enough players"
        };
      }
      let ready = 0;
      for (let i = 0; i < players.length; i++) {
        if (players[i].ready) {
          ready++;
        }
      }
      if (game.player_cap === ready) {
        return {
          ready: true,
          status: "game is ready to start"
        };
      } else {
        return {
          ready: false,
          status: "not all players are ready"
        };
      }
    })
  );

const getPlayerReady = db => (th_game_id, th_user_id) =>
  db.th_players.findOne({
    attributes: ["ready"],
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
  getPlayers: getPlayers(db),
  getPlayersStatus: getPlayersStatus(db),
  joinGame: joinGame(db),
  leaveGame: leaveGame(db),
  startGame: startGame(db),
  getGameReady: getGameReady(db),
  getPlayerReady: getPlayerReady(db),
  togglePlayerReady: togglePlayerReady(db)
});
