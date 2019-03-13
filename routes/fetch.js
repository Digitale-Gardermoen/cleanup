const router = require('express').Router();
const fetch = require('../controllers/fetch.js');
const dateString = require('../components/dateString.js');

router.route('/:servername').get(async (req, res) => {
  try {
    console.log(dateString(), req.method, req.originalUrl);

    let data = await fetch(req.params.servername);
    
    if (data.length <= 0) res.json('No data');
    else res.json(data);
  }
  catch (error) {
    console.error(dateString(), '- got error');
    console.error(error);
    res.send([ 0, 'caught error']);
  }
});

module.exports = router;