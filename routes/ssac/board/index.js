var express = require("express");
const boardController = require("../../../controllers/ssac/board/boardController");
var router = express.Router();

router.get("/", boardController.readAllBoard);

router.get("/:idx", boardController.detaileBoard);

router.post("/", boardController.createBoard);

router.delete("/:idx", boardController.deleteBoard);

module.exports = router;
