var router = require('express').Router();
var path = require('path');

router.all('*', function(_, response) {
  response.sendFile(path.resolve(__dirname, '../../client/build', 'index.html'));
});

module.exports = router;
