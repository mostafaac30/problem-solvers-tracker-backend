const express = require('express');
const app = express();
const mongoose = require('mongoose');
var logger = require('morgan');
require('dotenv').config();

const userRouter = require('./routes/userRouter');
const authRouter = require('./routes/authRouter');
const judgeRouter = require('./routes/judgeRouter');

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Use the user router for requests to the /user endpoint
app.use('/user', userRouter);
// Use the auth router for requests to the /auth endpoint
app.use('/auth', authRouter);

app.use('/judge', judgeRouter);

// Start the server on a specific port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



