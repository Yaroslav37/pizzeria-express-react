const express = require("express");
const router = express.Router();
const ProductsService = require("../services/ProductsService");
const { verifyToken } = require("../lib/jwt");

// TASK 4. Search, read, sort
router.get("/", async (req, res) => {
  const search = req.query.search;
  const sort = req.query.sort;
  let sortDirection = "ASC";
  let sortField = "id";
  if (sort) {
    [sortField, sortDirection] = sort.split("__");
  }
  const products = await ProductsService.getAll(
    search,
    sortDirection,
    sortField
  );

  res.status(200).json(products);
});

// TASK 3. CRUD
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const product = await ProductsService.getById(id);

  if (!product) {
    res.status(404).json({ error: "The product doesn't exist" });
    return;
  }

  res.status(200).json(product);
});

router.put("/:id", verifyToken, async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  if (!data.product_name || !data.description || !data.price) {
    res.status(400).json({ error: "Missing fields" });
    return;
  }

  const product = await ProductsService.update(id, data);

  if (!product) {
    res.status(404).json({ error: "The product doesn't exist" });
    return;
  }

  res.status(200).json(product);
});

router.post("/", verifyToken, async (req, res) => {
  const data = req.body;

  if (!data.product_name || !data.description || !data.price) {
    res.status(400).json({ error: "Missing fields" });
    return;
  }

  const product = await ProductsService.create(data);

  res.status(200).json(product);
});

router.delete("/:id", verifyToken, async (req, res) => {
  const id = req.params.id;

  const product = await ProductsService.deleteProduct(id);

  res.status(200).json(product);
});

module.exports = router;
