const router = require('express').Router();
const AuthRoute = require('./AuthRoute');
const SocketRoute = require('./SocketRoute');
const DefaultRoute = require('./DefaultRoute');

router.use(AuthRoute);
router.use(SocketRoute);
// All routes not specified above will default to this route
router.use(DefaultRoute);

module.exports = router;
