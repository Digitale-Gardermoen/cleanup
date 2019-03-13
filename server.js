require('dotenv').config();
const express = require('express');
const basicAuth = require('express-basic-auth');
const https = require('https');
const fs = require('fs');
const dateString = require('./components/dateString.js');
//const jsonParser = require('body-parser').json();

console.log('############### CLEANUP.DGI.NO START UP ###############');
console.log(dateString(), '- starting https server')

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
app.use('/insert', require('./routes/insert.js'));
app.use('/fetch', require('./routes/fetch.js'));
app.use('/deleteOne', require('./routes/deleteOne.js'));
app.use('/eadmin', require('./routes/eadmin.js'));

https.createServer(options, app).listen(httpsPort);
console.log(dateString(), '- listening on port', httpsPort);