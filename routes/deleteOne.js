const router = require('express').Router();
const deleteUser = require('../controllers/deleteOne.js');
const dateString = require('../components/dateString.js');

router.route('/').delete((req, res) => {
  console.log(dateString(), req.method, req.originalUrl);
  let userData;

  req.on('data', (chunk) => {
    userData = JSON.parse(chunk);
  });

  req.on('end', async () => {
    try {
      let data = await deleteUser(userData.username, userData.serverName);
      if (data === null) res.send([ 'did not find user: ' + JSON.stringify(userData) ]);
      else res.send([ 'deleted user: ' + JSON.stringify(data) ]);
    }
    catch (error) {
      console.error(dateString(), '- got error');
      console.error(error);
      res.send([ 0, 'got error, check if user was removed with fetch' ]);
    }
  });
});

module.exports = router;