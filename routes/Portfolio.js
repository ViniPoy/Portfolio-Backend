const express = require('express');
const router = express.Router();
const portfolioCtrl = require('../controllers/Portfolio')
const auth = require('../middleware/Auth');

router.get("/", portfolioCtrl.getAllProjects);
router.get("/:id", portfolioCtrl.getOneProject);
router.post("/", auth, portfolioCtrl.createProject);
router.put("/:id", auth, portfolioCtrl.updateProject);
router.delete("/:id", auth, portfolioCtrl.deleteProject);

module.exports = router;