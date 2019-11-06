module.exports = (_, response, next) => {
  return response.locals.player.getGame().then(game => {
    if ('closed' !== game.status && response.locals.player.host) {
      return next();
    } else {
      return response.sendStatus(401);
    }
  });
};
