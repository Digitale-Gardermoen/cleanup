const router = require('express').Router();
const insert = require('../controllers/insert.js');
const dateString = require('../components/dateString.js');

router.route('/').post(async (req, res) => {
  console.log(dateString(), '-', req.method, req.originalUrl, req.body);
  try {
    let data = await insert(req.body.username, req.body.serverName);
    res.status(data.statuscode);
    if (data.statuscode === 200) res.json(data.inserted);
  }
  catch (error) {
    console.error(dateString(), '- got error');
    console.error(error);
    res.sendStatus(500);
  }
});

module.exports = router;