const Signup = require("../controllers/auth_controllers");

const router = require("express").Router();




router.post("/sign-up" , Signup);

module.exports = router;