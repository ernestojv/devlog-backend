const express = require('express');
const response = require('../../../network/response');
const Controller = require('./controller');
const router = express.Router();
router.get('/', (req, res) => {
    const result = Controller.list();
    response.sucess(req, res, result, 200);
});

module.exports = router;