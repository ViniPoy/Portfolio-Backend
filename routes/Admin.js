const express = require('express');
const router = express.Router();
const adminCtrl = require('../controllers/Admin');

router.post('/login', adminCtrl.login);

module.exports = router;