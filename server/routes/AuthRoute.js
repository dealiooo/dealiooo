const router = require('express').Router();
const authenticate = require('../authentication/authenticate');
const dummyAccount = require('./dummyAccount');
router.get('/register', dummyAccount, (request, response) => {
  console.log(
    'creating dummyAccount for testing <-- delete this once a proper registration is implemented'
  );
  console.log('Cookies: ', request.cookies);
  response.send('on register page <-- shouldnt happen');
});

router.get('/main-lobby', authenticate, (request, response) => {
  response.send('auth success');
});

router.get('/', (request, response) => {
  response.send('home');
});

module.exports = router;
