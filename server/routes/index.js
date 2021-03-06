const router = require('express').Router();
const AuthRoute = require('./AuthRoute');
const GameRoute = require('./GameRoute');
const GameLobbyRoute = require('./GameLobbyRoute');
const MainLobbyRoute = require('./MainLobbyRoute');
const DefaultRoute = require('./DefaultRoute');

if (process.env.LOCAL_SERVER) {
  const connection_type = 'http://';
  const website = 'localhost';
  const port_num = ':3000';

  router.use((_, response, next) => {
    response.header(
      'Access-Control-Allow-Origin',
      `${connection_type}${website}${port_num}`
    );
    response.header('Access-Control-Allow-Methods', 'GET, POST');
    response.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    response.header('Access-Control-Allow-Credentials', true);
    next();
    return null;
  });
}

router.use(AuthRoute);
router.use(GameRoute);
router.use(GameLobbyRoute);
router.use(MainLobbyRoute);
router.use(DefaultRoute);

module.exports = router;
