const router = require('express').Router();
const insert = require('../controllers/insert.js');
const dateString = require('../components/dateString.js');

router.route('/').post(async (req, res) => {
  console.log(dateString(), req.method, req.originalUrl);
  try {
    let data = await insert(req.body.username, req.body.serverName);
    if (data[0] === 0) res.send(data);
    else res.send('Inserted user: ' + JSON.stringify(data));
  }
  catch (error) {
    console.error(dateString(), '- got error');
    console.error(error);
  }
});

module.exports = router;