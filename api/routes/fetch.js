const router = require('express').Router();
const fetch = require('../controller/fetch.js');

router
  .route('/:servername')
  .get(async (req, res) => {
    console.log('fetching users...');
    let data = await fetch(req.params.servername);
    console.log(data);
    if (data.length <= 0) res.json('No data');
    else res.json(data);
  });

module.exports = router;