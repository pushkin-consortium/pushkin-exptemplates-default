// const knex = require('knex')(require('./knex.config.js'));

exports.up = function(knex) {
  return knex.schema.createTable('newexp_TUQ', table => {
    table.integer('user_id').references('id').inTable('newexp_users').primary();
    table.integer('stim_group').references('id').inTable('newexp_stimulusGroups').notNullable();
    table.timestamp('started_at').notNullable();
    table.timestamp('finished_at');
		table.integer('cur_position').unsigned().notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('newexp_TUQ');
};
