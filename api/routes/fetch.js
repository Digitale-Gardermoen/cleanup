const router = require('express').Router();
const fetch = require('../controllers/fetch.js');
const dateString = require('../../components/dateString.js');

router.route('/:servername').get(async (req, res) => {
  console.log(dateString(), req.method, req.originalUrl);
  console.log(req);
  let data = await fetch(req.params.servername);
  if (data.length <= 0) res.json('No data');
  else res.json(data);
});

module.exports = router;