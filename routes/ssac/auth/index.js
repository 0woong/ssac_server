var express = require("express");
const authController = require("../../../controllers/ssac/auth/authController");
var router = express.Router();

router.post("/signin", authController.signin);

router.post("/signup", authController.signup);

module.exports = router;
