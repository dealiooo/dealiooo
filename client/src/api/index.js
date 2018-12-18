const io = require('socket.io-client');
const serverAddress = require('./serverAddress');

const socket = io.connect(serverAddress);

const resolvePendingPromise = response => {
  if (response.ok) {
    return response.text().then(data => JSON.parse(data));
  }
  return response;
};

const requestConfiguration = (body = {}, method) => {
  const config = {
    method,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  if (Object.keys(body).length > 0) {
    config.body = JSON.stringify(body);
  }
  return config;
};

const build_url = endpoint => {
  return `${serverAddress}${endpoint}`;
};

const request = (endpoint, body, method = 'post') =>
  fetch(build_url(endpoint), requestConfiguration(body, method));

const jsonify = response => response.json();

export default {
  socket,
  getLogin: () => request('/login', {}, 'get'),
  getRegister: () => request('/register', {}, 'get'),
  getGame: gameId => request(`/game-lobby/${gameId}`, {}, 'get'),
  getGameLobby: gameId => request(`/game-lobby/${gameId}`, {}, 'get'),
  getMainLobby: () => request('/main-lobby', {}, 'get'),
  getGameLobbyInfo: gameId =>
    request(`/game-lobby/${gameId}/info`, {}, 'get').then(
      resolvePendingPromise
    ),
  getGameLobbyPlayersStatus: gameId =>
    request(`/game-lobby/${gameId}/status`, {}, 'get').then(
      resolvePendingPromise
    ),
  postLogin: (email, password) =>
    request('/login', { email, password }).then(jsonify),
  postRegister: (name, email, password) =>
    request('/register', { name, email, password }),
  postMainLobby: () => request('/main-lobby', {}).then(resolvePendingPromise),
  postMainLobbyChat: ({ message }) => request('/main-lobby/chat', { message }),
  postMainLobbyCreateGame: () =>
    request('/main-lobby/create-game', {}).then(resolvePendingPromise),
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
    request(`/game-lobby/${gameId}/toggle-ready`).then(resolvePendingPromise),
  postGameChat: ({ roomId: gameId, message }) =>
    request(`/game/${gameId}/chat`, { message }),
  postGameClick: (gameId, clickInput) =>
    request(`/game/${gameId}/click`, { clickInput }),
  postGameEndTurn: gameId => request(`/game/${gameId}/endTurn`, {}),
  postGameForfeit: gameId => request(`/game/${gameId}/forfeit`, {}),
  postGameJoin: gameId => request(`/game/${gameId}/join`, {}),
  postGameStartGame: gameId => request(`/game/${gameId}/startGame`, {}),
  postGameUpdate: gameId => request(`/game/${gameId}/update`, {})
};
