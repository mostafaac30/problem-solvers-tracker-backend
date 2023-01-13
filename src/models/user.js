const mongoose = require('mongoose');
const mongoDbUrl = process.env.MONGODB_URL;

mongoose.connect(mongoDbUrl, { useNewUrlParser: true });

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    friendsIds: {
        type: [String]
    },
    pushToken: {
        type: String,
        required: false
    },
    deviceType: {
        type: String,
        required: false
    },
    judge: {
        type: String,
        required: true
    },
    rank: {
        type: Number,
        required: true
    },
    totalSolvedProblems: {
        type: Number,
        required: true
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
