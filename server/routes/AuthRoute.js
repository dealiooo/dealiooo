const router = require('express').Router();
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

const emptyStringsToNull = require('./middlewares/emptyStringsToNull');
const notAuthenticatedUser = require('./middlewares/notAuthenticatedUser');
const authenticateUser = require('./middlewares/authenticateUser');
const sendAuth = require('./middlewares/sendAuth');
const { Auth } = require('../database/api');

// TODO: input validation

router.get('/api/authenticate', authenticateUser, sendAuth);

router.post('/api/sign-up', emptyStringsToNull, (request, response) => {
  const { username, email, password } = request.body;

  return Auth.insertUser(username, email, password)
    .then(user =>
      request.login(user, error => {
        if (error) {
          throw error;
        }

        const { password, ...auth } = user.dataValues;
        return response.json({ auth });
      }),
    )
    .catch(error => response.status(500).send({ error }));
});

router.post('/api/forgot-password', notAuthenticatedUser, emptyStringsToNull, (request, response) => {
  const { email } = request.body;
  const SALT_FACTOR = 10;

  return Auth.findUserByEmail(email)
    .then(user => {
      if (!user) {
        return response.sendStatus(401);
      }

      const { email, password } = user.dataValues;

      var today = new Date();
      var expire = new Date(today.getTime() + 24 * 60 * 60 * 1000);

      return bcrypt.hash(email + password + today, SALT_FACTOR, (error, hash) => {
        if (error) {
          throw error;
        }

        const sid = hash.replace('/', '-');
        const sess = { sid: sid, email: email };

        return Auth.insertSession(sid, sess, expire)
          .then(session => {
            if (!session) {
              return response.sendStatus(401);
            }

            let resetPasswordUrl;
            if (process.env.NODE_ENV === 'development') {
              resetPasswordUrl = `http://localhost:3000/reset-password/${sid}`;
            } else {
              resetPasswordUrl = `http://${request.headers.host}/reset-password/${sid}`;
            }

            const transporter = nodemailer.createTransport({
              service: 'Gmail',
              auth: {
                user: process.env.MAILER_EMAIL,
                pass: process.env.MAILER_PASSWORD,
              },
            });

            const mailData = {
              from: process.env.MAILER_EMAIL,
              to: email,
              subject: 'Forgot Password',
              html: `Click <a href="${resetPasswordUrl}">here</a> to reset your password`,
            };

            transporter.sendMail(mailData, (error, _) => {
              if (error) {
                throw error;
              }

              return response.sendStatus(204);
            });
          })
          .catch(error => {
            throw error;
          });
      });
    })
    .catch(error => response.status(500).send({ error }));
});

router.get('/api/reset-password/:sessionId', notAuthenticatedUser, emptyStringsToNull, (request, response) => {
  const { sessionId } = request.params;

  return Auth.findSessionById(sessionId)
    .then(session => {
      if (!session) {
        return response.sendStatus(401);
      }

      return response.sendStatus(200);
    })
    .catch(error => response.status(500).send({ error }));
});

router.post('/api/reset-password/:sessionId', notAuthenticatedUser, emptyStringsToNull, (request, response) => {
  const { password } = request.body;
  const { sessionId } = request.params;

  return Auth.findSessionById(sessionId)
    .then(session => {
      if (!session) {
        return response.sendStatus(401);
      }

      const { sid, sess, expire } = session.dataValues;
      const { email } = sess;
      const today = new Date();

      if (sid === sessionId && today < expire) {
        return Auth.deleteSession(sid)
          .then(_ =>
            Auth.updatePassword(email, password)
              .then(user => {
                if (!user) {
                  return response.sendStatus(401);
                }

                return response.sendStatus(201);
              })
              .catch(error => {
                throw error;
              }),
          )
          .catch(error => {
            throw error;
          });
      }

      return session;
    })
    .catch(error => response.status(500).send({ error }));
});

router.post('/api/sign-in', emptyStringsToNull, (request, response) => {
  const { identifier, password } = request.body;

  return Auth.findUserByUsernameOrEmail(identifier)
    .then(user => {
      bcrypt
        .compare(password, user.password)
        .then(isEqual => {
          if (isEqual) {
            return user;
          }

          return response.status(401).send({ error: new Error('invalid credentials') });
        })
        .then(user =>
          request.login(user, error => {
            if (error) {
              throw error;
            }

            const { password, ...auth } = user.dataValues;
            return response.json({ auth });
          }),
        )
        .catch(error => {
          throw error;
        });
    })
    .catch(error => response.status(500).send({ error }));
});

router.post('/api/sign-out', (request, response) => {
  request.logout();
  response.sendStatus(200);
  return null;
});

// TODO: deprecated use /api/authenticated instead
// router.get('/api/sign-up', notAuthenticatedUser, (request, response) => response.sendStatus(200));
// router.get('/api/sign-in', notAuthenticatedUser, (request, response) => response.sendStatus(200));
// router.get('/api/forgot-password', notAuthenticatedUser, (request, response) => response.sendStatus(200));
// router.get('/api/reset-password', authenticateUser, sendAuth);
// router.get('/api/sign-out', authenticateUser, sendAuth);

module.exports = router;
