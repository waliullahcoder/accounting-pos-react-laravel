/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('failed_jobs', function (table) {
      table.increments('id').primary(); // Auto-incrementing ID
      table.string('uuid').unique(); // Unique UUID
      table.text('connection'); // Connection field
      table.text('queue'); // Queue field
      table.longtext('payload'); // Payload field
      table.longtext('exception'); // Exception field
      table.timestamp('failed_at').defaultTo(knex.fn.now()); // Timestamp for when the job failed
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists('failed_jobs'); // Drop the failed_jobs table
  };
  