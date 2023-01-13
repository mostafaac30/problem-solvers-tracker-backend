const express = require('express');
const router = express.Router();
const judgeController = require('../controllers/judgeController');
const routerPath = "/solved-problems";
router.get(routerPath + '/:username', judgeController.getSolvedProblemsByUsername);

module.exports = router;