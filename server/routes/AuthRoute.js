const router = require('express').Router();
const empty_strings_to_null = require('./middlewares/empty_strings_to_null');
const requireAuthentication = require('./middlewares/require_authentication');
const db = require('../database');

router.post('/register', empty_strings_to_null, (request, response) => {
  const { name, email, password } = request.body;
  console.log('Register:');
  console.log(name);
  console.log(email);
  console.log(password);
  db.insert_user(name, email, password)
    .then(user =>
      request.login(user, error => {
        if (error) {
          return response.json({ error });
        }
        return response.json({ user });
      })
    )
    .catch(error => response.json({ error }));
});

router.post('/forgot-password', empty_strings_to_null, (request, response) => {
  const { email } = request.body;
  // TODO
  response.sendStatus(500);
});

router.post(
  '/new-password',
  empty_strings_to_null,
  (request, response, next) => {
    const { email, password } = request.body;
    db.update_password(email, password)
      .then(_ => response.sendStatus(200))
      .catch(error => response.json({ error }));
  }
);

router.post('/login', empty_strings_to_null, requireAuthentication);

router.post('/logout', (request, response) => {
  request.logout();
  response.sendStatus(200);
});

module.exports = router;
