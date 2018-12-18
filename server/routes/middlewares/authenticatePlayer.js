const { Auth } = require('../../database/api');

module.exports = (request, response, next) => {
  return Auth.findPlayer(request.params.gameId, request.user.id)
    .then(result => {
      if (result) {
        response.locals.player = result;
        next();
        return result;
      } else {
        return response.sendStatus(404);
      }
    })
    .catch(error => response.json({ error }));
};
