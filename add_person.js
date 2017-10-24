const ENV         = process.env.ENV || "development";
const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);

const [firstName, lastName, birthDate] = process.argv.slice(2)

  knex('famous_people')
  .insert({first_name:firstName, last_name:lastName, birthdate:birthDate})
  .then(function(){
    console.log('Person has been inserted into database')
  })
  .finally(function(){
    knex.destroy();
  })
