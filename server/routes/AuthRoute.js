const router = require('express').Router();
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

const empty_strings_to_null = require('./middlewares/empty_strings_to_null');
const requireAuthentication = require('./middlewares/require_authentication');
const not_authenticated = require('./middlewares/not_authenticated');
const send_user_id_and_user_name = require('./middlewares/send_user_id_and_user_name');
const { Auth } = require('../database/api');

router.get('/register', requireAuthentication, send_user_id_and_user_name);
router.get('/login', requireAuthentication, send_user_id_and_user_name);
router.get(
  '/forgot-password',
  requireAuthentication,
  send_user_id_and_user_name
);
router.get('/new-password', requireAuthentication, send_user_id_and_user_name);
router.get('/logout', requireAuthentication, send_user_id_and_user_name);

router.post('/register', empty_strings_to_null, (request, response) => {
  const { name, email, password } = request.body;
  return Auth.insert_user(name, email, password)
    .then(user =>
      request.login(user, error => {
        if (error) {
          return response.json({ error });
        }
        return response.json({ user });
      })
    )
    .catch(error => {
      console.log(error);
      return response.json({ error });
    });
});

router.post(
  '/forgot-password',
  not_authenticated,
  empty_strings_to_null,
  (request, response) => {
    const { email } = request.body;
    const SALT_FACTOR = 10;

    return Auth.find_user_by_email(email)
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

            console.log(sid);

            return Auth.insert_session(sid, sess, expire)
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

                transporter.sendMail(mailData, (error, info) => {
                  if (error) {
                    console.log(error);
                  }

                  if (info) {
                    console.log(info);
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
  '/new-password/:session_id',
  not_authenticated,
  empty_strings_to_null,
  (request, response, next) => {
    const { email, password } = request.body;
    const { session_id } = request.params;

    return Auth.find_session_by_sid(session_id)
      .then(session => {
        if (!session) {
          return response.sendStatus(400);
        }

        const { sid, sess, expire } = session.dataValues;
        const { email: sessionEmail } = sess;
        const today = new Date();

        if (sid === session_id && email === sessionEmail && today < expire) {
          return Auth.delete_session(sid)
            .then(_ =>
              Auth.update_password(email, password)
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

router.post('/login', empty_strings_to_null, (request, response) => {
  const { email, password } = request.body;
  return Auth.find_user_by_email(email)
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
