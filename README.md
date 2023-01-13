ProblemSolvers-Tracker
============

ProblemSolvers-Tracker is an API with user authentication using Node.js, Express, MongoDB and JSON Web Tokens (JWT).

Getting Started
---------------

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have Node.js and MongoDB installed on your machine.

### Installing

1.  Clone the repository

Copy code

`git clone https://github.com/mostafaac30/problem-solvers-tracker-backend.git`

2.  Install the dependencies

Copy code

`npm install`

3.  Start the MongoDB server

Copy code

`mongod`

4.  Create a .env file in the root of the project and add the following:

Copy code

```
JWT_SECRET=yoursecret
NODE_ENV=production
MONGODB_URL=mongodb://127.0.0.1:27017/appDbName
PORT=1234
```


5.  Start the server

Copy code

`npm start`

Features
--------

*   User registration
*   User login
*   JSON Web Token (JWT) authentication
*   Hashing of password
*   Error handling

Built With
----------

*   [Node.js](https://nodejs.org/) - JavaScript runtime
*   [Express](https://expressjs.com/) - Web framework for Node.js
*   [MongoDB](https://www.mongodb.com/) - Database
*   [Mongoose](https://mongoosejs.com/) - MongoDB object modeling for Node.js
*   [bcryptjs](https://www.npmjs.com/package/bcryptjs) - Library for hashing and comparing passwords
*   [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - Library for handling JSON Web Tokens
*   [LeetCode-Query](https://github.com/JacobLinCool/LeetCode-Query) - Library for handling Leetcode requests

Authors
-------

*   **Mostafa Mahmoud** - [MostafaAC30](https://github.com/mostafaac30)

License
-------

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

Acknowledgments
---------------

*   PS community
*   Leetcode
