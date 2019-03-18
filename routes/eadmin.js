const router = require('express').Router();
const EAdmin = require('../controllers/eadmin.js');
const dateString = require('../components/dateString.js');

const eadmin = new EAdmin();

router.route('/').delete(async (req, res) => {
  console.log(dateString(), req.method, req.originalUrl);
  try {
    let data = await eadmin.deleteAll(req.body.username);
    if (data[0] === 0) res.send(data);                          // check if the first entry in the array is 0, this means mongoDB returned an error.
    else res.send('removed user(s): ' + JSON.stringify(data));
  }
  catch (error) {
    console.error(dateString(), '- got error');
    console.error(error);
  }

}).post(async (req, res) => {
  console.log(dateString(), req.method, req.originalUrl);
  try {
    let data = await eadmin.insertAll(req.body.username);
    if (data[0] === 0) res.send(data);                          // check if the first entry in the array is 0, this means mongoDB returned an error.
    else res.send('Inserted user(s): ' + JSON.stringify(data)); // returns an array of objects.
  }
  catch (error) {
    console.error(dateString(), '- got error');
    console.error(error);
  }
});

module.exports = router;