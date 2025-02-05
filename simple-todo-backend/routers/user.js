const express = require("express");
const { Register, Login } = require("../controllers/userController");
const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);

module.exports = router;
