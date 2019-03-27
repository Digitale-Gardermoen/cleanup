require('dotenv').config();
const express = require('express');
const basicAuth = require('express-basic-auth');
const https = require('https');
const fs = require('fs');
const dateString = require('./components/dateString.js');
const getUnauthorizedResponse = require('./components/getUnauthorizedResponse.js');
const jsonParser = require('body-parser').json({ type: 'application/json' });

console.log('############### WEB SERVER START UP ###############');
console.log(dateString(), '- starting https server')

const app = new express();
app.disable('x-powered-by');

// get config data from env.
const serverCert = process.env.HTTPS_CERT;        // gets the path for the certificate
const serverKey = process.env.HTTPS_KEY;          // gets the path for the key
const httpsPort = process.env.HTTPS_PORT || 443;  // check if the port is set in .env, if not just use default.
const authUser = process.env.AUTH_USER;
const authPass = process.env.AUTH_PASS;

const options = {
  key: fs.readFileSync(serverKey),
  cert: fs.readFileSync(serverCert)
};

let basicAuthOptions = {
  users: {},                                      // we create the user later, so we can keep the user in .env
  unauthorizedResponse: getUnauthorizedResponse,  // generic 401 error when username/pw is wrong
  challenge: true                                 // challenge the user to authenticate
};

basicAuthOptions.users[authUser] = authPass;      // insert the authorization user into the users object.

app.use(jsonParser);                              // use a jsonparser bodyparser, this way we dont have to do JSON.parse
app.use(basicAuth(basicAuthOptions));             // setup basic auth

// require routes for the API paths
app.use('/insert', require('./routes/insert.js'));
app.use('/fetch', require('./routes/fetch.js'));
app.use('/deleteone', require('./routes/deleteOne.js'));
app.use('/eadmin', require('./routes/eadmin.js'));

// finally setup the https server with the current configuration
https.createServer(options, app).listen(httpsPort);
console.log(dateString(), '- listening on port', httpsPort);