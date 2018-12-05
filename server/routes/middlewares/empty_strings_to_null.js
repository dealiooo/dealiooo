const empty_strings_to_null = (request, response, next) => {
  for (var key in request.body) {
    if (request.body[key] === '') {
      if (key !== 'password') {
        request.body[key] = null;
      }
    }
  }
  next();
};

module.exports = empty_strings_to_null;
