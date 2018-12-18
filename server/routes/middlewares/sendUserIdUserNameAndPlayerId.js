module.exports = (_, response) => {
  const { id, name } = response.locals.user;
  const { id: playerId } = response.locals.player;
  response.json({ id, name, playerId });
  return null;
};
