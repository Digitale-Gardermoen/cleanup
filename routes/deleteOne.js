const router = require('express').Router();
const deleteUser = require('../controllers/deleteOne.js');
const dateString = require('../components/dateString.js');

router.route('/:serverName/:username').delete(async (req, res) => {
  console.log(dateString(), '-', req.method, req.originalUrl);
  try {
    let data = await deleteUser(req.params.username, req.params.serverName);
    res.send(data);
  }
  catch (error) {
    console.error(dateString(), '- got error');
    console.error(error);
    res.send([0, 'got error, check if user was removed with fetch']);
  }
});

module.exports = router;