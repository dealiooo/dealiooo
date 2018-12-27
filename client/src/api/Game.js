const request = require('./request');

module.exports = {
    getGame: gameId => request(`/game/${gameId}`, {}, 'get'),
    postGameChat: ({ roomId: gameId, message }) =>
    request(`/game/${gameId}/chat`, { message }),
    postGameClick: (gameId, clickInput) =>
    request(`/game/${gameId}/click`, { clickInput }),
    postGameEndTurn: gameId => request(`/game/${gameId}/endTurn`, {}),
    postGameForfeit: gameId => request(`/game/${gameId}/forfeit`, {}),
    postGameJoin: gameId => request(`/game/${gameId}/join`, {}),
    postGameStartGame: gameId => request(`/game/${gameId}/startGame`, {}),
    postGameUpdate: gameId => request(`/game/${gameId}/update`, {})
}