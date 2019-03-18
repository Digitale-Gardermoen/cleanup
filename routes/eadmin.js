const router = require('express').Router();
const EAdmin = require('../controllers/eadmin.js');
const dateString = require('../components/dateString.js');

const eadmin = new EAdmin();

router.route('/').delete(async (req, res) => {
  console.log(dateString(), req.method, req.originalUrl);
  try {
    let data = await eadmin.deleteAll(req.body.username);
    res.send(JSON.stringify(data));
  }
  catch (error) {
    console.error(dateString(), '- got error');
    console.error(error);
    if (!data || data === null) res.send([0, 'user was not deleted']);
    else if (data.ok === 1 || data.deletedCount > 0) res.send([0, 'user was removed but error was caught']);
  }

}).post(async (req, res) => {
  console.log(dateString(), req.method, req.originalUrl);
  try {
    let data = await eadmin.insertAll(req.body.username);
    if (data[0] === 0) res.send(data);
    else res.send('Inserted user(s): ' + JSON.stringify(data));
  }
  catch (error) {
    console.error(dateString(), '- got error');
    console.error(error);
  }
});

module.exports = router;