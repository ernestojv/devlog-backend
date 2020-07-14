const express = require('express');
const config = require('../config.js');
const app = express();
const user = require('./components/user/network');
//ROUTES
app.use('/api/user', user);

app.listen(config.api.port, () => {
    console.log('listen at port: ', config.api.port);
});