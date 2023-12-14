// TASK 5: Database seeding
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("order_lines").del();
  await knex("orders").del();
  const users = await knex.select("id").from("users");
  const products = await knex.select("id").from("products");
  const discount_codes = await knex.select("id").from("discount_codes");
  const orders = Array.from({ length: 10 }, (x, i) => ({
    user_id: users[i % users.length].id,
    discount_id: discount_codes[i % discount_codes.length].id,
  }));
  await knex("orders").insert(orders);
  const created_orders = await knex.select("id").from("orders");
  const order_lines = Array.from({ length: 10 }, (_, i) => ({
    order_id: created_orders[i % created_orders.length].id,
    product_id: products[i % products.length].id,
  }));
  await knex("order_lines").insert(order_lines);
};
