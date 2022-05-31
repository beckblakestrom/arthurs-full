var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
	res.send("respond with a resource");
});

router.get("/login/:email/:password", function (req, res) {
	res.send({
		email: req.params.email,
		password: req.params.password,
	});
});

router.get("/all", function (req, res) {
	res.send({
		name: "Peter",
		email: "pdiddy@gmail.com",
		password: "spiderman",
	});
});

module.exports = router;
