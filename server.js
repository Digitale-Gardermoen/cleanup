require('dotenv').config();
const express = require('express');
const basicAuth = require('express-basic-auth');
const https = require('https');
const fs = require('fs');
//const jsonParser = require('body-parser').json();

const app = new express();

const serverCert = process.env.HTTPS_CERT;
const serverKey = process.env.HTTPS_KEY;
const httpsPort = process.env.HTTPS_PORT;

const options = {
  key: fs.readFileSync(serverKey),
  cert: fs.readFileSync(serverCert)
};

//app.use(jsonParser);
app.use(basicAuth({ users: { 'admin': 'supersecret' } }));
app.use('/insert', require('./api/routes/insert.js'));
app.use('/fetch', require('./api/routes/fetch.js'));
app.use('/deleteOne', require('./api/routes/deleteOne.js'));
app.use('/eadmin', require('./api/routes/eadmin.js'));

https.createServer(options, app).listen(httpsPort);
console.log('listening on port', httpsPort);