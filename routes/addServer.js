const router = require('express').Router();
const addServer = require('../controllers/addServer.js');
const dateString = require('../components/dateString.js');

router.route('/').post(async (req, res) => {
  console.log(dateString(), '-', req.method, req.originalUrl, req.body);
  try {
    let data = await addServer(req.body.serverName);
    if (data[0] === 0) res.send(data);
    else res.send(JSON.stringify(data));
  }
  catch (error) {
    console.error(dateString(), '- got error');
    console.error(error);
    res.send([0, 'got error, check the webserver log']);
  }
});

module.exports = router;