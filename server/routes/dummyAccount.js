const db = require('../database');

const dummyAccount = (request, response, next) => {
  db.insert_user('dummy', 'dummy@dummy.io', 'hashme')
    .then(_ => db.find_user_by_email('dummy@dummy.io'))
    .then(user =>
      request.login(user, error => {
        if (error) {
          return next(error);
        }
        return response.redirect('/main-lobby');
      })
    );
};

module.exports = dummyAccount;
