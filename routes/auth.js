const express = require("express");
const authController = require("../controllers/auth.js");

const router = express.Router();

router.post('../public/register', authController.register);
router.post('../public/login', authController.login);
router.get('../public/logout', authController.logout);

module.exports = router;