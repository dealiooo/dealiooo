const router = require('express').Router();
const AuthRoute = require('./AuthRoute');
const SocketRoute = require('./SocketRoute');
const DefaultRoute = require('./DefaultRoute');

const connection_type = 'http://';
const website = 'localhost';
const port_num = ':3000';

router.use(function(request, response, next) {
  response.header(
    'Access-Control-Allow-Origin',
    `${connection_type}${website}${port_num}`
  );
  response.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  response.header('Access-Control-Allow-Credentials', true);
  next();
});

router.use(AuthRoute);
router.use(SocketRoute);
// All routes not specified above will default to this route
router.use(DefaultRoute);

module.exports = router;
