const router = require('express').Router();
const AuthRoute = require('./AuthRoute');
const GameRoute = require('./GameRoute');
const GameLobbyRoute = require('./GameLobbyRoute');
const MainLobbyRoute = require('./MainLobbyRoute');
const DefaultRoute = require('./DefaultRoute');

router.use(AuthRoute);
router.use(GameRoute);
router.use(GameLobbyRoute);
router.use(MainLobbyRoute);
router.use(DefaultRoute);

module.exports = router;
