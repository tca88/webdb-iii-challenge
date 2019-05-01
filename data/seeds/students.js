exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("students")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("students").insert([
        { id: 1, name: "rowValue1", cohorts_id: 1 },
        { id: 2, name: "rowValue2", cohorts_id: 1 },
        { id: 3, name: "rowValue3", cohorts_id: 2 }
      ]);
    });
};
