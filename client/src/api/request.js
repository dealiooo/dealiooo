const serverAddress = require('./serverAddress');

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
  return `${serverAddress}/api${endpoint}`;
};

module.exports = (endpoint, body, method = 'post') =>
  fetch(build_url(endpoint), requestConfiguration(body, method));
