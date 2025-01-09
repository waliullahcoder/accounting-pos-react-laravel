/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('purchase_order_details', function (table) {
      table.increments('id').primary(); // Auto-incrementing ID
      table.bigInteger('purchase_order_id').unsigned(); // Unsigned big integer for order ID
      table.bigInteger('product_id').unsigned(); // Unsigned big integer for product ID
      table.string('product_name'); // Product name
      table.bigInteger('purchase_order_quantity').unsigned(); // Unsigned big integer for product quantity
      table.float('purchase_order_amount', 8, 2); // Product price with two decimal places
      table.timestamps(true, true); // Created and updated timestamps
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists('purchase_order_details'); // Drop the product_orders table
  };
  