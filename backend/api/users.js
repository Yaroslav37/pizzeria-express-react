const express = require("express");
const router = express.Router();
const UsersService = require("../services/UsersService");

router.get("/", async (req, res) => {
  const users = await UsersService.getAllSortedBy();

  res.status(200).json(users);
});

module.exports = router;
