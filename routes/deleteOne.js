const router = require('express').Router();
const deleteUser = require('../controllers/deleteOne.js');
const dateString = require('../components/dateString.js');

router.route('/').delete(async (req, res) => {
  console.log(dateString(), req.method, req.originalUrl);
  try {
    console.log(req.body);
    let data = await deleteUser(req.body.username, req.body.serverName);
    if (data[0] === 0) res.send(data);
    else res.send('deleted user: ' + JSON.stringify(data));
  }
  catch (error) {
    console.error(dateString(), '- got error');
    console.error(error);
    res.send([0, 'got error, check if user was removed with fetch']);
  }
});

module.exports = router;