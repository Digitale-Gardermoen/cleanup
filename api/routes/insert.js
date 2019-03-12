const router = require('express').Router();
const insert = require('../controller/insert.js');

router
  .route('/')
  .post((req, res) => {
    let userData;

    req.on('data', (chunk) => {
      userData = JSON.parse(chunk);
    });

    req.on('end', () => {
      insert(userData.username, userData.serverName);
      res.send('Inserted user: ' + JSON.stringify(userData));
    });
  });

module.exports = router;