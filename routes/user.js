const express = require("express");
const auth = require("../middleware/auth");
const {
  registerUser,
  loginUser,
  userDetails,
  logoutUser,
} = require("../controllers/user");

const router = express.Router();

router.get("/details", auth, userDetails);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

module.exports = router;
