let knex = require('knex')
const pg = require('pg')
const settings = require('./settings')

knex = require('knex')({
  client: 'pg',
  connection: {
    host : settings.hostname,
    user : settings.user,
    password : settings.password,
    database : settings.database
  }
});

const [firstName, lastName, birthDate] = process.argv.slice(2)

  knex('famous_people')
  .insert({first_name:firstName, last_name:lastName, birthdate:birthDate})
  .then(function(){
    console.log('Person has been inserted into database')
  })
  .finally(function(){
    knex.destroy();
  })
