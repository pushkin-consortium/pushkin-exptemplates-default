// const knex = require('knex')(require('./knex.config.js'));

exports.up = function(knex) {
  return knex.schema.createTable('newexp_stimulusGroupStimuli', table => {
    table.increments('id').primary();
		table.integer('group').references('id').inTable('newexp_stimulusGroups').notNullable();
    table.integer('stimulus').references('id').inTable('newexp_stimuli').notNullable();
		table.integer('position').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('newexp_stimulusGroupStimuli');
};
