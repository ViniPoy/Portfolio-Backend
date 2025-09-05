const express = require('express');
const router = express.Router();
const portfolioCtrl = require('../controllers/Portfolio')
const auth = require('../middleware/Auth');
const multer = require('../middleware/Multer');

router.get("/", portfolioCtrl.getAllProjects);
router.get("/:id", portfolioCtrl.getOneProject);
router.post("/", auth, multer, portfolioCtrl.createProject);
router.put("/:id", auth, multer, portfolioCtrl.updateProject);
router.delete("/:id", auth, portfolioCtrl.deleteProject);

module.exports = router;