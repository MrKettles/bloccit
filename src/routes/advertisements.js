const express = require('express');
const router = express.Router();

const adController = require('../controllers/adController');

router.get('/advertisements', adController.showAll);
router.get('/advertisements/new', adController.showNew);
router.get('/advertisements/:id', adController.show);
router.get('/advertisements/:id/edit', adController.edit);
router.post('/advertisements/createAd', adController.createAd);
router.post('/advertisements/:id/update', adController.update);
router.post('/advertisements/:id/destroy', adController.destroy);

module.exports = router;