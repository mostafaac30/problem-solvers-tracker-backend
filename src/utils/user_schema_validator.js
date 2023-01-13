// const { check, validationResult } = require('express-validator');

// const userValidator = (body) => {
//     [
//         check('username', 'Please enter a valid username').not().isEmpty(),
//         check('email', 'Please enter a valid email').isEmail(),
//         check('password', 'Please enter a password length more than 5').isLength({ min: 6 })
//     ]

//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(422).json({ errors: errors.array() });
//     };

//     controller.update(userModel)(req, res);
// }