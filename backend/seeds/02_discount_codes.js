/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('discount_codes').insert([
    {code: 'code10', discount: 10},
    {code: 'code20', discount: 20},
    {code: 'code30', discount: 30}
  ]);
};
