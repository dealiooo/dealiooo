const { Auth } = require('../../database/api');

const require_authentication = (request, response, next) => {
  return Auth.user_belong_to_game_id(request.params.game_id, request.user.id)
    .then(result => {
      if (result.count) {
        next();
        return result;
      } else {
        return response.sendStatus(404);
      }
    })
    .catch(error => response.json({ error }));
};

module.exports = require_authentication;
