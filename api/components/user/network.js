const express = require('express');
const response = require('../../../network/response');
const router = express.Router();
router.get('/', (req, res) => {
    response.sucess(req, res, 'All Rigth!', 200);
});

module.exports = router;