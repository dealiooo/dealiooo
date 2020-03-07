import api from './api';

export const AccountAPI = {
  getAuthenticate: () => api.get('/authenticate', {}),
};

export const MainLobbyAPI = {
  getLobbies: () => api.get('/main-lobby/lobbies', {}),
  postChat: message => api.post('/main-lobby/chat', { message }),
  postCreateGame: (roomName, playerCapacity) => api.post('/main-lobby/create-game', { roomName, playerCapacity }),
};

export const GameLobbyAPI = {
  getInfo: gameId => api.get(`/game-lobby/${gameId}/info`, {}),
  getStatuses: gameId => api.get(`/game-lobby/${gameId}/statuses`, {}),
  postChat: (gameId, message) => api.post(`/game-lobby/${gameId}/chat`, { message }),
  postEnter: gameId => api.post(`/game-lobby/${gameId}/enter`, {}),
  postJoin: gameId => api.post(`/game-lobby/${gameId}/join`, {}),
  postLeave: gameId => api.post(`/game-lobby/${gameId}/leave`, {}),
  postStart: gameId => api.post(`/game-lobby/${gameId}/start`, {}),
  postReady: gameId => api.post(`/game-lobby/${gameId}/toggle-ready`),
};

export const GameAPI = {
  getAuthenticate: gameId => api.get(`/game/${gameId}/authenticate`, {}),
  getChat: gameId => api.get(`/game/${gameId}/chat`, {}),
  postCancel: gameId => api.post(`/game/${gameId}/cancel`, {}),
  postChat: (gameId, message) => api.post(`/game/${gameId}/chat`, { message }),
  postClick: (gameId, clickInput) => api.post(`/game/${gameId}/click`, { clickInput }),
  postEndTurn: gameId => api.post(`/game/${gameId}/endTurn`, {}),
  postForfeit: gameId => api.post(`/game/${gameId}/forfeit`, {}),
  postJoin: gameId => api.post(`/game/${gameId}/join`, {}),
  postStartGame: gameId => api.post(`/game/${gameId}/startGame`, {}),
  postLoadGame: gameId => api.post(`/game/${gameId}/loadGame`, {}),
  postUpdate: gameId => api.post(`/game/${gameId}/update`, {}),
};
