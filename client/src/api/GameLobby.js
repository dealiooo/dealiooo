const request = require('./request');
const resolvePendingPromise = require('./resolvePendingPromise');

module.exports = {
    getGameLobby: gameId => request(`/game-lobby/${gameId}`, {}, 'get'),
    getGameLobbyInfo: gameId =>
      request(`/game-lobby/${gameId}/info`, {}, 'get').then(
        resolvePendingPromise
      ),
    getGameLobbyPlayersStatus: gameId =>
      request(`/game-lobby/${gameId}/status`, {}, 'get').then(
        resolvePendingPromise
      ),
    postGameLobbyChat: ({ roomId: gameId, message }) =>
      request(`/game-lobby/${gameId}/chat`, { message }),
    postGameLobbyEnter: gameId => request(`/game-lobby/${gameId}/enter`, {}),
    postGameLobbyJoin: gameId =>
      request(`/game-lobby/${gameId}/join`, {}).then(resolvePendingPromise),
    postGameLobbyLeave: gameId =>
      request(`/game-lobby/${gameId}/leave`, {}).then(resolvePendingPromise),
    postGameLobbyStart: gameId =>
      request(`/game-lobby/${gameId}/start`, {}).then(resolvePendingPromise),
    postGameLobbyTogglePlayerReady: gameId =>
      request(`/game-lobby/${gameId}/toggle-ready`).then(resolvePendingPromise)
}