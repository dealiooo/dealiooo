module.exports = (_, response) => {
  const { id, username } = response.locals.user;
  const { host } = response.locals.player;
  response.json({ id, username, host });
  return null;
};
