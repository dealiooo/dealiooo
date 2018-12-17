const not_authenticated = (request, response, next) => {
  if (!request.isAuthenticated()) {
    next();
  } else {
    response.sendStatus(404);
  }
  return null;
};

module.exports = not_authenticated;
