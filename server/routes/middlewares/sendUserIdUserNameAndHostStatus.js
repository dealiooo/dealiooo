module.exports = (_, response) => {
  const { id, name } = response.locals.user;
  const { host } = response.locals.player;
  response.json({ id, name, host });
  return null;
};
