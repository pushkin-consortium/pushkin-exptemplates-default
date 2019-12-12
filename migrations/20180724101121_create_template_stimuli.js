exports.up = function(knex) {
  return knex.schema.createTable('newexp_stimuli', table => {
    table.increments('id').primary();
		table.string('stimulus').unique().notNullable();
		table.string('correct');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('newexp_stimuli');
};
