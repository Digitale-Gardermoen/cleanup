require('dotenv').config();
const https = require('https');

let data = {
  username: 'TESTUSER1',
  serverName: 'TESTSERVER1'
};

data = JSON.stringify(data);

const options = {
  host: 'cleanup.dgi.no',
  port: 8443,
  method: 'POST',
  path: '/insert',
  headers: {
    'Content-Length': Buffer.byteLength(data),
    'Content-Type': 'application/json'
  },
  auth: 'admin:supersecret'
};

const req = https.request(options, (res) => {
  console.log(res.headers);
  console.log(res.statusCode);

  res.on('data', (d) => console.log(`${d}`));
});

req.write(data);
req.end();