// authRouter.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { check, validationResult } = require('express-validator');

router.post('/register', [
    check('username', 'Please enter a valid username').not().isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Please enter a password length more than 5').isLength({ min: 6 })

], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    };
    authController.register(req, res);
});

router.post('/login', authController.login);

module.exports = router;



