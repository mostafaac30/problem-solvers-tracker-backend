const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const judgeController = require('../controllers/judgeController');

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

module.exports = {
    register,
    login
}
