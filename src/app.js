const express = require('express');
const app = express();
const mongoose = require('mongoose');
var logger = require('morgan');
require('dotenv').config();

const userRouter = require('./routes/userRouter');
const authRouter = require('./routes/authRouter');
const judgeRouter = require('./routes/judgeRouter');
const checkAuth = require('./controllers/authController').checkAuth;

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/auth', authRouter);
app.use(checkAuth);
app.use('/api', userRouter);
app.use('/api', judgeRouter);

//handle errors
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

// Start the server on a specific port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



