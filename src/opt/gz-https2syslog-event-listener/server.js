'use strict';

const express = require('express');
const app = express();
const fs = require('fs');
const https = require("https");
const path = require('path');
const textParser = express.json({limit: '50mb'});
const epsSyslogHelper = require('./api/epsSyslogHelper');

if (!process.argv[2]) {
    throw "Missing input file parameter";
}
let configPath = process.argv[2];
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

console.log('Load Config file');
console.log('\n');
console.log(config);
console.log('\n');

// use basic HTTP auth to secure the api
app.use('/api', (req, res, next) => {

    console.log(req.headers.authorization);
    // check for basic auth header
    if (!req.headers.authorization) {
        return res.status(401).json({ message: 'Missing Authorization Header' });
    }

    // verify auth credentials
    const authorizationString =  req.headers.authorization;
    if (config.authorization_string !== authorizationString) {
        return res.status(401).json({ message: 'Invalid Authentication Credentials' });
    }

    next();
});

// url: http://localhost:3000/api/
app.post('/api', textParser, (request, response) => {

    const body = request.body;
    let syslogHelper = new epsSyslogHelper(config);
    syslogHelper.log(body);
    response.sendStatus(200);
});

if (!config.secure || !config.secure.key || !config.secure.cert) {

    console.error(`please provide secure options in the config file: ${JSON.stringify(config)}`)
    process.exit(1)
}

try{
    const options = {
        key: fs.readFileSync(path.resolve(__dirname, config.secure.key)),
        cert: fs.readFileSync(path.resolve(__dirname, config.secure.cert)),
        passphrase: config.secure.passphrase
    };

https
    .createServer(options, app)
    .listen(config.port, () => console.log(`Listening on port ${config.port}`));

} catch (e) {
    console.error('error on starting server')
    process.exit(1)
}
