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
router.post('/forget-password', [
    check('email', 'Please enter a valid email').isEmail(),

], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    };
    authController.forgotPassword(req, res);
});
router.post('/reset-password', [
    check('email', 'Please enter a valid email').isEmail(),
    check('otp', 'Please enter a valid otp').isLength({ min: 4, max: 4 }),
    check('password', 'Please enter a password length more than 5').isLength({ min: 6 })

], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    };
    authController.resetPassword(req, res);
});

module.exports = router;



