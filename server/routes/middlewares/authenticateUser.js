module.exports = (request, response, next) => {
  if (request.isAuthenticated()) {
    response.locals.user = request.user;
    next();
  } else {
    response.sendStatus(401);
  }
  return null;
};
