const router = require('express').Router();
const requireAuthentication = require('../authentication/requireAuthentication');
const db = require('../database');

router.post('/register', (request, response) => {
  const { name, email, password } = request.body;
  db.insert_user(name, email, password)
    .then(_ => db.find_user_by_email(email))
    .then(user =>
      request.login(user, error => {
        if (error) {
          return response.json({ error });
        }
        return response.json({ user });
      })
    );
});

router.post('/forgot-password', (request, response) => {
  const { email } = request.body;
  // TODO
  response.sendStatus(200);
});

router.post('/new-password', (request, response, next) => {
  const { email, password } = request.body;
  db.update_password(email, password).then(_ => response.sendStatus(200));
});

router.post('/login', requireAuthentication);

router.post('/logout', (request, response) => {
  request.logout();
  response.sendStatus(200);
});

module.exports = router;
