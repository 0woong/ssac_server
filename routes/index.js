// ssacRouter

var express = require("express");
var router = express.Router();

const authRouter = require("./ssac/auth/index");
const boardRouter = require("./ssac/board/index");

router.use("/board", boardRouter);
router.use("/", authRouter);

module.exports = router;
