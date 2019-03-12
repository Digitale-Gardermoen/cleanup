const router = require('express').Router();
const deleteAll = require('../controllers/eadmin.js');
const dateString = require('../../components/dateString.js');

router.route('/').delete((req, res) => {
  console.log(dateString(), req.method, req.originalUrl);
  let userData;

  req.on('error', (err) => console.err(err));

  req.on('data', (chunk) => {
    userData = JSON.parse(chunk);
  });

  req.on('end', async () => {
    let data = await deleteAll(userData.username);
    res.send(JSON.stringify(data));
  });
});

module.exports = router;