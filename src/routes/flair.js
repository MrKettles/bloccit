const express = require('express');
const router = express.Router();

const flairController = require('../controllers/flairController');

router.get('/topics/:topicId/posts/:id/addFlair', flairController.addFlair);
router.get('/topics/:topicId/posts/:id/:flairId/editFlair', flairController.editFlair);
router.post('/topics/:topicId/posts/:id/updateFlair', flairController.updateFlair);
router.post('/topics/:topicId/posts/:id/:flairId/deleteFlair', flairController.deleteFlair);

module.exports = router;