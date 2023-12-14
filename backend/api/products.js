const express = require("express");
const router = express.Router();
const ProductsService = require("../services/ProductsService");

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

module.exports = router;
