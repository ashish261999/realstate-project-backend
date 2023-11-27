const Signup = require("../controllers/auth_controllers");
const Signin = require("../controllers/auth_controllers");

const router = require("express").Router();




router.post("/sign-up" , Signup);
router.post("/sign-in", Signin );

module.exports = router;