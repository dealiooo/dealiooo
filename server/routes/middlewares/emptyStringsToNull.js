module.exports = (request, _, next) => {
  for (var key in request.body) {
    if ('' === request.body[key]) {
      if ('password' !== key) {
        request.body[key] = null;
      }
    }
  }
  next();
  return null;
};
