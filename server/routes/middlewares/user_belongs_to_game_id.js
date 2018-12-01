const db = require('../../database');

const require_authentication = (request, response, next) => {
  return db.user_belong_to_game_id(
    request.params.game_id,
    request.user.id,
    (error, result) => {
      if (result) {
        return next();
      } else {
        return response.sendStatus(404);
      }
    }
  );
};

module.exports = require_authentication;
