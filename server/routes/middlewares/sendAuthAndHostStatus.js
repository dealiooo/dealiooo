module.exports = (_, response) => {
  const { id, username, email } = response.locals.user;
  const { host } = response.locals.player;
  response.json({ id, username, email, host });
  return null;
};
