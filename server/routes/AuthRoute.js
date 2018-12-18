const router = require('express').Router();
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

const emptyStringsToNull = require('./middlewares/emptyStringsToNull');
const authenticateUser = require('./middlewares/authenticateUser');
const notAuthenticated = require('./middlewares/notAuthenticated');
const sendUserIdAndUserName = require('./middlewares/sendUserIdAndUserName');
const { Auth } = require('../database/api');

router.get('/register', authenticateUser, sendUserIdAndUserName);
router.get('/login', authenticateUser, sendUserIdAndUserName);
router.get('/forgot-password', authenticateUser, sendUserIdAndUserName);
router.get('/new-password', authenticateUser, sendUserIdAndUserName);
router.get('/logout', authenticateUser, sendUserIdAndUserName);

router.post('/register', emptyStringsToNull, (request, response) => {
  const { name, email, password } = request.body;
  return Auth.insertUser(name, email, password)
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

router.post(
  '/forgot-password',
  notAuthenticated,
  emptyStringsToNull,
  (request, response) => {
    const { email } = request.body;
    const SALT_FACTOR = 10;

    return Auth.findUserByEmail(email)
      .then(user => {
        if (!user) {
          return response.sendStatus(400);
        }

        const { email, password } = user.dataValues;

        var today = new Date();
        var expire = new Date(today.getTime() + 24 * 60 * 60 * 1000);

        return bcrypt.hash(
          email + password + today,
          SALT_FACTOR,
          (error, hash) => {
            if (error) {
              return response.json({ error });
            }

            const sid = hash.replace('/', '&slash;');
            const sess = { email: email };

            return Auth.insertSession(sid, sess, expire)
              .then(session => {
                if (!session) {
                  return response.sendStatus(400);
                }
                const resetPasswordUrl = `http://${
                  request.headers.host
                }/forgot-password/${sid}`;

                const transporter = nodemailer.createTransport({
                  service: 'Gmail',
                  auth: {
                    user: process.env.MAILER_EMAIL,
                    pass: process.env.MAILER_PASSWORD
                  }
                });

                const mailData = {
                  from: process.env.MAILER_EMAIL,
                  to: email,
                  subject: 'Forgot Password',
                  html: `Click <a href="${resetPasswordUrl}">here</a> to reset your password`
                };

                transporter.sendMail(mailData, (error, _) => {
                  if (error) {
                    return response.json({ error });
                  }
                  return response.sendStatus(200);
                });
              })
              .catch(error => response.json({ error }));
          }
        );
      })
      .catch(error => response.json({ error }));
  }
);

router.post(
  '/new-password/:sessionId',
  notAuthenticated,
  emptyStringsToNull,
  (request, response) => {
    const { email, password } = request.body;
    const { sessionId } = request.params;

    return Auth.findSessionById(sessionId)
      .then(session => {
        if (!session) {
          return response.sendStatus(400);
        }

        const { sid, sess, expire } = session.dataValues;
        const { email: sessionEmail } = sess;
        const today = new Date();

        if (sid === sessionId && email === sessionEmail && today < expire) {
          return Auth.deleteSession(sid)
            .then(_ =>
              Auth.updatePassword(email, password)
                .then(user => {
                  if (!user) {
                    return response.sendStatus(400);
                  }
                  return response.sendStatus(201);
                })
                .catch(error => response.json({ error }))
            )
            .catch(error => response.json({ error }));
        }
        return session;
      })
      .catch(error => response.json({ error }));
  }
);

router.post('/login', emptyStringsToNull, (request, response) => {
  const { email, password } = request.body;
  return Auth.findUserByEmail(email)
    .then(user => {
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
    })
    .catch(error => response.json({ error }));
});

router.post('/logout', (request, response) => {
  request.logout();
  response.sendStatus(200);
  return null;
});

module.exports = router;
