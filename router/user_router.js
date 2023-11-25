const test = require("../controllers/user_controllers");

const router = require("express").Router();




router.get("/user" , test);

module.exports = router;