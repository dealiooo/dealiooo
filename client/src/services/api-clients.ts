import api from './api';

// TODO: better naming?

export const AccountAPI = {
  getAuthenticate: () => api.get('/authenticate', {}),
};

export const MainLobbyAPI = {
  getMainLobbies: () => api.get('/main-lobby/lobbies', {}),
  postMainLobbyChat: message => api.post('/main-lobby/chat', { message }),
  postMainLobbyCreateGame: (roomName, playerCapacity) =>
    api.post('/main-lobby/create-game', { roomName, playerCapacity }),
};

export const GameLobbyAPI = {
  getGameLobbyInfo: gameId => api.get(`/game-lobby/${gameId}/info`, {}),
  getGameLobbyPlayerStatuses: gameId => api.get(`/game-lobby/${gameId}/statuses`, {}),
  postGameLobbyChat: (gameId, message) => api.post(`/game-lobby/${gameId}/chat`, { message }),
  postGameLobbyEnter: gameId => api.post(`/game-lobby/${gameId}/enter`, {}),
  postGameLobbyJoin: gameId => api.post(`/game-lobby/${gameId}/join`, {}),
  postGameLobbyLeave: gameId => api.post(`/game-lobby/${gameId}/leave`, {}),
  postGameLobbyStart: gameId => api.post(`/game-lobby/${gameId}/start`, {}),
  postGameLobbyTogglePlayerReady: gameId => api.post(`/game-lobby/${gameId}/toggle-ready`),
};

export const GameAPI = {
  getAuthenticate: gameId => api.get(`/game/${gameId}/authenticate`, {}),
  getGameChat: gameId => api.get(`/game/${gameId}/chat`, {}),
  postGameCancel: gameId => api.post(`/game/${gameId}/cancel`, {}),
  postGameChat: (gameId, message) => api.post(`/game/${gameId}/chat`, { message }),
  postGameClick: (gameId, clickInput) => api.post(`/game/${gameId}/click`, { clickInput }),
  postGameEndTurn: gameId => api.post(`/game/${gameId}/endTurn`, {}),
  postGameForfeit: gameId => api.post(`/game/${gameId}/forfeit`, {}),
  postGameJoin: gameId => api.post(`/game/${gameId}/join`, {}),
  postGameStartGame: gameId => api.post(`/game/${gameId}/startGame`, {}),
  postGameLoadGame: gameId => api.post(`/game/${gameId}/loadGame`, {}),
  postGameUpdate: gameId => api.post(`/game/${gameId}/update`, {}),
};
