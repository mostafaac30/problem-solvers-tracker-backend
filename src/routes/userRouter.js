const express = require('express');
const router = express.Router();
const userModel = require('../models/user.js');
const controller = require('../controllers/modelController');
const routerPath = "/users";

router.post(routerPath, controller.create(userModel));
router.get(routerPath, controller.find(userModel));
router.get(routerPath + '/:id', controller.findOne(userModel));
router.put(routerPath + '/:id', controller.update(userModel));
router.delete(routerPath + '/:id', controller.remove(userModel));

module.exports = router;
