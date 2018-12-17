const server_address = require('./server_address');

const resolvePendingPromise = response => {
  if (response.ok) {
    return response.text().then(data => JSON.parse(data));
  }
  return response;
};

const request_configuration = (body = {}, method) => {
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
  return `${server_address}${endpoint}`;
};

const request = (endpoint, body, method = 'post') =>
  fetch(build_url(endpoint), request_configuration(body, method));

const jsonify = response => response.json();

export default {
  get_register: () => request('/register', {}, 'get'),
  get_login: () => request('/login', {}, 'get'),
  get_main_lobby: () => request('/main-lobby', {}, 'get'),
  get_game_lobby: game_id => request(`/game-lobby/${game_id}`, {}, 'get'),
  get_game_lobby_info: game_id =>
    request(`/game-lobby/${game_id}/info`, {}, 'get').then(
      resolvePendingPromise
    ),
  get_game_lobby_player_status: game_id =>
    request(`/game-lobby/${game_id}/status`, {}, 'get').then(
      resolvePendingPromise
    ),
  post_register: (name, email, password) =>
    request('/register', { name, email, password }),
  post_login: (email, password) =>
    request('/login', { email, password }).then(jsonify),
  post_logout: () => request('/logout', {}),
  post_main_lobby: () => request('/main-lobby', {}).then(resolvePendingPromise),
  post_create_game: () =>
    request('/main-lobby/create-game', {}).then(resolvePendingPromise),
  post_join_game: game_id =>
    request(`/game-lobby/${game_id}/join`, {}).then(resolvePendingPromise),
  post_leave_game: game_id =>
    request(`/game-lobby/${game_id}/leave`, {}).then(resolvePendingPromise),
  post_run_game: game_id =>
    request(`/game-lobby/${game_id}/run`, {}).then(resolvePendingPromise),
  post_delete_game: game_id =>
    request(`/game-lobby/${game_id}/delete`, {}).then(resolvePendingPromise),
  post_player_ready: game_id =>
    request(`/game-lobby/${game_id}/ready`).then(resolvePendingPromise)
};
