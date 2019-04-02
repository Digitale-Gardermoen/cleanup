const router = require('express').Router();
const EAdmin = require('../controllers/eadmin.js');
const dateString = require('../components/dateString.js');

const eadmin = new EAdmin();

router.route('/:username').delete(async (req, res) => {
  console.log(dateString(), '-', req.method, req.originalUrl);
  try {
    let data = await eadmin.deleteAll(req.params.username);
    res.status(data.statuscode);
    if (data.statuscode === 200) res.json(data.removed);
    res.end();
  }
  catch (error) {
    console.error(dateString(), '- got error');
    console.error(error);
    res.sendStatus(500);
  }

}).post(async (req, res) => {
  console.log(dateString(), '-', req.method, req.originalUrl);
  try {
    let data = await eadmin.insertAll(req.params.username);
    res.status(data.statuscode);
    if (data.statuscode === 200) res.json(data.inserted);
    res.end();
  }
  catch (error) {
    console.error(dateString(), '- got error');
    console.error(error);
    res.sendStatus(500);
  }
});

module.exports = router;