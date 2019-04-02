const router = require('express').Router();
const deleteUser = require('../controllers/deleteOne.js');
const dateString = require('../components/dateString.js');

router.route('/:serverName/:username').delete(async (req, res) => {
  console.log(dateString(), '-', req.method, req.originalUrl);
  try {
    let data = await deleteUser(req.params.username, req.params.serverName);
    res.status(data.statuscode);
    if (data.statuscode === 200) res.json(data);
    res.end();
  }
  catch (error) {
    console.error(dateString(), '- got error');
    console.error(error);
    res.sendStatus(500);
  }
});

module.exports = router;