const express = require('express');
const secure = require('./secure');
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
router.get('/:id', async (req, res) => {
    try {
        const user = await Controller.get(req.params.id);
        response.sucess(req, res, user, 200);
    } catch (error) {
        response.error(req, res, error.message, 500);
    }

});
router.post('/', async (req, res) => {
    try {
        const user = await Controller.upsert(req.body);
        response.sucess(req, res, user, 201);
    } catch (error) {
        response.error(req, res, error.message, 500);
    }
});
router.put('/', secure('update'), async (req, res) => {
    try {
        const user = await Controller.upsert(req.body);
        response.sucess(req, res, user, 201);
    } catch (error) {
        response.error(req, res, error.message, 500);
    }
});
router.delete('/:id', async (req, res) => {
    try {
        const result = await Controller.remove(req.params.id);
        response.sucess(req, res, result, 200);
    } catch (error) {
        response.error(req, res, error.message, 500);
    }
});
router.post('/follow/:id', secure('follow'), async (req, res) => {
    try {
        const result = await Controller.follow(req.user.id, req.params.id);
        response.sucess(req, res, result, 201);
    } catch (error) {
        response.error(req, res, error.message, 500);
    }
});
router.get('/:id/following', async (req, res, next) => {
    try {
        const result = await Controller.following(req.params.id);
        return response.sucess(req, res, result, 200);
    } catch (error) {
        response.error(req, res, error.message, 500);
    }
})
module.exports = router;