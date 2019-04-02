const router = require('express').Router();
const fetch = require('../controllers/fetch.js');
const dateString = require('../components/dateString.js');

router.route('/:servername').get(async (req, res) => {
  try {
    console.log(dateString(), '-', req.method, req.originalUrl);
    let data = await fetch(req.params.servername);
    res.status(data.statuscode);
    if (data.statuscode === 200) res.json(data.users);
    res.end();
  }
  catch (error) {
    console.error(dateString(), '- got error');
    console.error(error);
    res.sendStatus(500);
  }
});

module.exports = router;