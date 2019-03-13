const router = require('express').Router();
const EAdmin = require('../controllers/eadmin.js');
const dateString = require('../components/dateString.js');

router.route('/').delete((req, res) => {
  console.log(dateString(), req.method, req.originalUrl);
  let userData;

  req.on('error', (err) => console.err(err));

  req.on('data', (chunk) => {
    userData = JSON.parse(chunk);
  });

  req.on('end', async () => {
    try {
      let data = await EAdmin.deleteAll(userData.username);
      res.send([ JSON.stringify(data) ]);
    }
    catch (error) {
      console.error(dateString(), '- got error');
      console.error(error);
      if (!data || data === null) res.send([ 0, 'user was not deleted' ]);
      else if (data.ok === 1 || data.deletedCount > 0) res.send([ 0, 'user was removed but error was caught' ]);
    }
  });
}).post((req, res) => {
  console.log(dateString(), req.method, req.originalUrl);
  let userData;

  req.on('data', (chunk) => {
    userData = JSON.parse(chunk);
  });

  req.on('end', () => {
    try {
      EAdmin.insert(userData.username);
      res.send([ 'Inserted user: ' + JSON.stringify(userData) ]);
    }
    catch (error) {
      console.error(dateString(), '- got error');
      console.error(error);
      res.send([ 0, 'user was not inserted' ]);
    }
  });
});

module.exports = router;