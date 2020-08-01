const express = require('express');
const response = require('../../../network/response');
const Controller = require('./index');
const router = express.Router();
//ROUTES
router.get('/', async (req, res) => {
    try {
        const result = await Controller.list();
        response.sucess(req, res, result, 200);
    } catch (error) {
        response.error(req, res, error.message, 500);
    }
});
module.exports = router;