const router = require('express').Router();
const deleteUser = require('../controller/deleteUser.js');

router
  .route('/')
  .delete((req, res) => {
    let userData;

    req.on('data', (chunk) => {
      userData = JSON.parse(chunk);
    });

    req.on('end', async () => {
      console.log();
      let data = await deleteUser(userData.username, userData.serverName);
      if (data === null) res.send('did not find user: ' + JSON.stringify(userData));
      else res.send('deleted user: ' + JSON.stringify(data));
    });
  });

module.exports = router;