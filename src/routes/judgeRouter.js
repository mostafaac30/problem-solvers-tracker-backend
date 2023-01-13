const express = require('express');
const router = express.Router();
const judgeController = require('../controllers/judgeController');
const routerPath = "/solved-problems";
router.get(routerPath + '/:username', async (req, res) => {
    const username = req.params.username;
    try {
        const solvedProblems = await judgeController.getSolvedProblemsByUsername(username);
        res.json(solvedProblems);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
module.exports = router;