module.exports = (_, response) => {
  const { id, name } = response.locals.user;
  response.json({ id, name });
  return null;
};
