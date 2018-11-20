const router = require('express').Router();
const empty_strings_to_null = require('./middlewares/empty_strings_to_null');
const requireAuthentication = require('./middlewares/require_authentication');
const db = require('../database');
const bcrypt = require('bcrypt');

router.get('/register', requireAuthentication);
router.get('/login', requireAuthentication);
router.get('/forgot-password', requireAuthentication);
router.get('/new-password', requireAuthentication);
router.get('/logout', requireAuthentication);

router.post('/register', empty_strings_to_null, (request, response) => {
  const { name, email, password } = request.body;
  db.insert_user(name, email, password, (error, user) => {
    if (error) {
      response.json({ error });
    } else {
      return request.login(user, error => {
        if (error) {
          response.json({ error });
        }
        response.json({ user });
      });
    }
  });
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

router.post('/login', empty_strings_to_null, (request, response) => {
  const { email, password } = request.body;
  db.find_user_by_email(email, (error, user) => {
    if (error) {
      response.json({ error });
    } else {
      bcrypt
        .compare(password, user.password)
        .then(isEqual => {
          if (isEqual) {
            return user;
          }
          return Promise.reject(new Error('Invalid credentials.'));
        })
        .then(user =>
          request.login(user, error => {
            if (error) {
              return response.json({ error });
            }
            return response.json({ user });
          })
        )
        .catch(error => response.json({ error }));
    }
  });
});

router.post('/logout', (request, response) => {
  request.logout();
  response.sendStatus(200);
});

module.exports = router;
