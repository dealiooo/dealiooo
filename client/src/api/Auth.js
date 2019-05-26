const request = require('./request');

const jsonify = response => response.json();

module.exports = {
  getLogin: () => request('/login', {}, 'get'),
  getRegister: () => request('/register', {}, 'get'),
  getForgotPassword: () => request('/forgot-password', {}, 'get'),
  getNewPassword: sid => request(`/new-password/${sid}`, {}, 'get'),
  postLogin: (identifier, password) =>
    request('/login', { identifier, password }).then(jsonify),
  postRegister: (username, email, password) =>
    request('/register', { username, email, password }),
  postForgotPassword: email => request('/forgot-password', { email }),
  postNewPassword: (sid, password) =>
    request(`/new-password/${sid}`, { password }),
  postLogout: () => request('/logout', {})
};
