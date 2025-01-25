/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('permissions', function (table) {
      table.increments('id').primary(); // Auto-incrementing ID
      table.bigInteger('role_id').unsigned(); 
      table.string('module_id'); 
      table.string('module_name');
      table.boolean('create'); 
      table.boolean('listing'); 
      table.boolean('edit'); 
      table.boolean('view'); 
      table.boolean('delete'); 
      table.boolean('allow'); 
      table.timestamps(true, true); // Created and updated timestamps
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists('permissions'); // Drop the products table
  };
  