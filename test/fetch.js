require('dotenv').config();
const https = require('https');

const options = {
  host: 'cleanup.dgi.no',
  port: 8443,
  method: 'GET',
  path: '/fetch/testserver1',
  auth: 'admin:supersecret'
};

const req = https.request(options, (res) => {
  console.log(res.headers);
  console.log(res.statusCode);

  res.on('data', (d) => console.log(`${d}`));
});

req.end();