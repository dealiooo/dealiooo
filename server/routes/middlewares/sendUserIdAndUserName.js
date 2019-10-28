module.exports = (_, response) => {
  const { id, username } = response.locals.user;
  response.json({ id, username });
  return null;
};
