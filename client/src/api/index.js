const connection_type = 'http://';
const website = 'localhost';
const port_num = ':8000';

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
  return `${connection_type}${website}${port_num}${endpoint}`;
};

const request = (endpoint, body, method = 'post') =>
  fetch(build_url(endpoint), request_configuration(body, method));

const jsonify = response => response.json();

export default {
  get_register: () => request('/register', {}, 'get'),
  get_login: () => request('/login', {}, 'get'),
  get_game_lobby_list: () => request('/main-lobby', {}, 'get'),
  get_game_lobby_info: game_id =>
    request(`game-lobby/${game_id}/info`, {}, 'get').then(jsonify),
  get_create_game: () => request('/main-lobby/create-game', {}, 'get'),
  //get_join_game: () => request('games/create', {}),
  //get_leave_game: () => request('games/create', {}, 'get'),
  //get_run_game: () => request('games/create', {}, 'get'),
  post_register: (name, email, password) =>
    request('/register', { name: name, email: email, password: password }).then(
      jsonify
    ),
  post_login: (email, password) =>
    request('/login', { email: email, password: password }).then(jsonify),
  send_chat: (room_id, message) => request(`/chat/${room_id}`, { message }),
  post_create_game: game_id => request(`/create-game/${game_id}`, {}),
  post_join_game: game_id => request(`/join-game/${game_id}`, {}),
  post_leave_game: game_id => request(`/leave-game/${game_id}`, {}),
  post_run_game: game_id => request(`/run-game/${game_id}`, {})
};
