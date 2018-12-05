const send_user_id_and_user_name = (request, response, next) => {
  const { id, name } = response.locals.user;
  response.json({ id, name });
};

module.exports = send_user_id_and_user_name;
