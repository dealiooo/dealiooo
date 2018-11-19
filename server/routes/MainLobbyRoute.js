const router = require('express').Router();
const requireAuthentication = require('./middlewares/require_authentication');
const db = require('../database');

router.get('/main-lobby', requireAuthentication, (request, response) => {
  db.find_all_game_lobbies()
    .then(result => response.json({ result }))
    .catch(error => response.json({ error }));
});

module.exports = router;
