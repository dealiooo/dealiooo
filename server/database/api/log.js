const insertChatLog = db => (th_game_id, username, message) =>
  db.th_logs.create({
    th_game_id,
    game_flow: false,
    username,
    message,
  });

const insertGameLog = db => (th_game_id, message) =>
  db.th_logs.create({
    th_game_id,
    game_flow: true,
    message,
  });

const getChatLogs = db => id => db.th_games.findByPk(id).then(game => game.getLogs({ where: { game_flow: false } }));

const getGameLogs = db => id => db.th_games.findByPk(id).then(game => game.getLogs({ where: { game_flow: true } }));

module.exports = db => ({
  insertChatLog: insertChatLog(db),
  insertGameLog: insertGameLog(db),
  getChatLogs: getChatLogs(db),
  getGameLogs: getGameLogs(db),
});
