const express = require('express');
const router = express.Router();
const contactCtrl = require('../controllers/Contact');

router.post('/', contactCtrl.sendContactMessage);

module.exports = router;