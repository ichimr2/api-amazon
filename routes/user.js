const express = require("express");
const router = express.Router();

const {
  createUser,
  logUser,
} = require("../controllers/user");


router.post("/register", createUser);
router.post("/login", logUser);

module.exports = router;
