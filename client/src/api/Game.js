const request = require('./request');

const jsonify = response => response.json();

module.exports = {
  getGame: gameId => request(`/game/${gameId}`, {}, 'get'),
  getGameChat: gameId =>
    request(`/game/${gameId}/chat`, {}, 'get').then(jsonify),
  postGameCancel: gameId => request(`/game/${gameId}/cancel`, {}),
  postGameChat: ({ roomId: gameId, message }) =>
    request(`/game/${gameId}/chat`, { message }),
  postGameClick: (gameId, clickInput) =>
    request(`/game/${gameId}/click`, { clickInput }),
  postGameEndTurn: gameId => request(`/game/${gameId}/endTurn`, {}),
  postGameForfeit: gameId => request(`/game/${gameId}/forfeit`, {}),
  postGameJoin: gameId => request(`/game/${gameId}/join`, {}),
  postGameStartGame: gameId => request(`/game/${gameId}/startGame`, {}),
  postGameLoadGame: gameId => request(`/game/${gameId}/loadGame`, {}),
  postGameUpdate: gameId => request(`/game/${gameId}/update`, {})
};
