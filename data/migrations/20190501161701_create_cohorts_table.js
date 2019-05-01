// implement changes to the schema
exports.up = function(knex, Promise) {
  return knex.schema.createTable("cohorts", tbl => {
    // each table needs a primary key
    // we'll call it id, integer, auto-increment
    tbl.increments();

    tbl
      .string("name", 128)
      .notNullable()
      .unique();
  });
};

// undo the changes
exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("cohorts");
};

// npx knex init
// npx knex migrate:make create_cohorts_table
// npx knex migrate:latest
