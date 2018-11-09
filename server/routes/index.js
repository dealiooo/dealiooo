const router = require('express').Router();
const AuthRoute = require('./AuthRoute');
const DefaultRoute = require('./DefaultRoute');

router.use(AuthRoute);
// All routes not specified above will default to this route
router.use(DefaultRoute);

module.exports = router;
