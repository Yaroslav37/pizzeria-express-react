const express = require("express");
const router = express.Router();
const OrdersService = require("../services/OrdersService");

router.get("/", async (req, res) => {
  const orders = await OrdersService.getAllSortedBy();

  res.status(200).json(orders);
});

module.exports = router;
