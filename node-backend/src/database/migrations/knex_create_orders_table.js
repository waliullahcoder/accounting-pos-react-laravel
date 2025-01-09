/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('orders', function (table) {
      table.increments('id').primary(); // Auto-incrementing ID
      table.bigInteger('customer_id').unsigned(); 
      table.bigInteger('total_quantity');
      table.float('total_amount', 8, 2);
      table.integer('discount_persantage');
      table.float('discount_amount', 8, 2);
      table.integer('tax_persantage');
      table.float('tax_amount', 8, 2);
      table.float('net_amount', 8, 2);
      table.timestamps(true, true); // Created and updated timestamps
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists('orders'); // Drop the orders table
  };
  