const authenticate = (request, response, next) => {
  if (request.isAuthenticated()) {
    response.locals.user = request.user;
    next();
  } else {
    response.redirect('/');
  }
};

module.exports = authenticate;
