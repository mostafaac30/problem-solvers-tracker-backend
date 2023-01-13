const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const judgeController = require('../controllers/judgeController');
const { check, validationResult } = require('express-validator');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Route for requesting a password reset
const forgotPassword = async (req, res) => {

    // Check if a user with the provided email exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(404).json({ msg: 'User not found' });
    }
    try {

        // generate OTP
        const otp = Math.floor(1000 + Math.random() * 9000);
        const otpExpire = Date.now() + 3600000; // 1 hour from now

        // hash the OTP
        const salt = await bcrypt.genSalt(10);
        const hashedOtp = await bcrypt.hash(otp.toString(), salt);

        // save the hashed OTP to the user
        user.otp = hashedOtp;
        user.otpExpire = otpExpire;

        await user.save();

        // send OTP via email
        const msg = {
            to: user.email,
            from: 'mostafaac30@gmail.com',
            subject: 'Forgot Password OTP',
            text: `Your OTP is ${otp}`,
            html: `<p>Your OTP is ${otp}</p>`
        };
        await sgMail.send(msg).catch(err => res.status(500).send(err));

        res.status(200).json({ msg: 'OTP sent to email' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

}

const resetPassword = async (req, res) => {
    const { email, otp, password } = req.body;

    // Simple validation
    if (!email || !otp || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }
    console.log(email);
    console.log(otp);
    try {
        // Check for existing user
        User.findOne({ email }).then(user => {
            if (!user) return res.status(400).json({ msg: 'Email not found' });

            console.log(user.otp);

            // Compare OTP and check for expiration
            const isMatch = bcrypt.compareSync(otp, user.otp);

            if (!isMatch) {
                return res.status(400).json({ msg: 'Invalid OTP' });
            }
            if (user.otpExpire < Date.now()) {
                return res.status(400).json({ msg: 'OTP has expired' });
            }

            // Compare OTP
            // Hash the new password
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, (err, hash) => {
                    if (err) {
                        throw err;
                    };
                    user.password = hash;
                    user.otp = undefined;
                    user.otpExpire = undefined;
                    user.save()
                        .then(() => {
                            res.json({ msg: 'Password reset successful' });
                        })
                        .catch(err => {
                            res.status(500).json({ error: err.message });
                        });
                });
            });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

const register = (req, res) => {

    const { username, email, password, judge } = req.body;
    // Simple validation
    if (!username || !email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    // Check for existing user
    User.findOne({ email }).then(async user => {
        if (user) return res.status(400).json({ msg: 'User already exists' });
        const info = await judgeController.getSolvedProblemsByUsername(username);
        const rank = info.matchedUser.profile.ranking;
        const totalSolvedProblems = info.matchedUser.submitStats.acSubmissionNum[0].count;
        console.log(rank);
        console.log(totalSolvedProblems);
        const newUser = new User({
            username,
            email,
            password,
            judge,
            rank,
            totalSolvedProblems
        });

        // Hash the password
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser.save()
                    .then(user => {
                        jwt.sign(
                            { id: user.id },
                            process.env.JWT_SECRET,
                            { expiresIn: 3600 },
                            (err, token) => {
                                if (err) throw err;
                                res.json({
                                    token,
                                    user: {
                                        id: user.id,
                                        username: user.username,
                                        email: user.email,
                                        judge: user.judge,
                                        rank: user.rank,
                                        totalSolvedProblems: user.totalSolvedProblems
                                    }
                                });
                            }
                        )
                    })
                    .catch(err => {
                        res.status(500).json({ error: err.message });
                    });
            });
        });
    });
}

// @route   POST api/auth/login
// @desc    Login user
// @access  Public
const login = (req, res) => {
    const { email, password } = req.body;

    // Simple validation
    if (!email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    // Check for existing user
    User.findOne({ email }).then(user => {
        if (!user) return res.status(400).json({ msg: 'User does not exist' });

        // Validate password
        bcrypt.compare(password, user.password)
            .then(isMatch => {
                if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

                jwt.sign(
                    { id: user.id },
                    process.env.JWT_SECRET,
                    { expiresIn: 3600 },
                    (err, token) => {
                        if (err) throw err;
                        res.json({
                            token,
                            user: {
                                id: user.id,
                                username: user.username,
                                email: user.email
                            }
                        });
                    }
                )
            })
    })
}

const checkAuth = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

module.exports = {
    register,
    login,
    checkAuth,
    resetPassword,
    forgotPassword
}
