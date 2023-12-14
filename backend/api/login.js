const express = require("express");
const { use } = require("passport");
const router = express.Router();

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  const user = await UsersService.getByEmail(email);

  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  if (user.password_hash !== password) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const product = await ProductsService.create(name, price, description, image);
  res.status(201).json(product);
});
