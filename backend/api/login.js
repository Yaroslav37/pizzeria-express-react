const express = require("express");
const createJwtToken = require("../lib/jwt");
const router = express.Router();
const UserService = require("../services/UsersService");

// TASK 2. Login/password
router.post("/", async (req, res) => {
  const { email, password } = req.body;

  const user = await UserService.getByEmail(email);

  // TASK 11 - Backend validation
  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  if (user.password_hash !== password) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  return res.status(200).json({ jwt: createJwtToken(user) });
});

module.exports = router;
