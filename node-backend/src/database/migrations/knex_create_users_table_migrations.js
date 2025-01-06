/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('users', function (table) {
      table.increments('id').primary(); // Auto-incrementing ID
      table.string('first_name').notNullable(); // First name
      table.string('last_name').notNullable(); // Last name
      table.string('phone_number').notNullable(); // Phone number
      table.string('zip_code').notNullable(); // Zip code
      table.boolean('is_superadmin').defaultTo(false); // Superadmin flag
      table.string('email').unique().notNullable(); // Email with unique constraint
      table.timestamp('email_verified_at').nullable(); // Nullable timestamp
      table.string('password').notNullable(); // Password
      table.string('remember_token'); // Remember token
      table.timestamps(true, true); // Created and updated timestamps
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists('users'); // Drop table
  };
  