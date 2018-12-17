var router = require('express').Router();
var path = require('path');

router.all('*', (request, response) => {
  response.sendFile(path.join(__dirname + '../../../client/public/index.html'));
  return null;
});

module.exports = router;
