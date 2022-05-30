var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
	res.send("Balance bro");
});

router.get("/fun", function (req, res, next) {
	res.send("fun balance");
});

module.exports = router;
