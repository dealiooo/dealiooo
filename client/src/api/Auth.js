const request = require("./request");

const jsonify = response => response.json();

module.exports = {
  getLogin: () => request("/login", {}, "get"),
  getRegister: () => request("/register", {}, "get"),
  getForgotPassword: () => request("/forgot-password", {}, "get"),
  getNewPassword: sid => request(`/new-password/${sid}`, {}, "get"),
  postLogin: (email, password) =>
    request("/login", { email, password }).then(jsonify),
  postRegister: (name, email, password) =>
    request("/register", { name, email, password }),
  postForgotPassword: email => request("/forgot-password", { email }),
  postNewPassword: (sid, password) =>
    request(`/new-password/${sid}`, { password }),
  postLogout: () => request("/logout", {})
};
