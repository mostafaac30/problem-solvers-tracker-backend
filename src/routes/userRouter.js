const express = require('express');
const router = express.Router();
const userModel = require('../models/user.js');
const controller = require('../controllers/modelController');
const routerPath = "/users";
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

// Create validation schema for update request body

const validationChain = [
    check('username', 'Please enter a valid username').optional().not().isEmpty(),
    check('email', 'Please enter a valid email').optional().isEmail(),
    check('password', 'Please enter a password length more than 5').optional().isLength({ min: 6 }),
];


const hashPassword = async (req, res, next) => {
    const { password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedOtp = await bcrypt.hash(password.toString(), salt);
    req.body.password = hashedOtp;
    next();
};


router.post(routerPath, validationChain, hashPassword, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    };
    controller.create(userModel)(req, res);
});

router.get(routerPath, controller.find(userModel));
router.get(routerPath + '/:id', controller.findOne(userModel));

router.put(routerPath + '/:id', validationChain, hashPassword, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    };

    controller.update(userModel)(req, res);
});

router.delete(routerPath + '/:id', controller.remove(userModel));

module.exports = router;
