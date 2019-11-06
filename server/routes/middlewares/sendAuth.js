module.exports = (_, response) => {
  const { id, username, email } = response.locals.user;
  response.json({ id, username, email });
  return null;
};
