const require_authentication = (request, response, next) => {
  if (request.isAuthenticated()) {
    response.locals.user = request.user;
    next();
  } else {
    response.sendStatus(404);
  }
};

module.exports = require_authentication;
