var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
	res.json({
		name: "Thom",
		age: 27,
	});
});

module.exports = router;
