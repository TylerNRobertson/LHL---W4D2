const ENV         = process.env.ENV || "development";
const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);

let queryString = process.argv[2]
  knex.select()
  .from('famous_people')
  .where('first_name','=',queryString)
  .orWhere('last_name', '=',queryString)
  .then(function(rows) {
    console.log('Searching.....')
    console.log(`Found ${rows.length} results in database`)
    for (let people of rows) {
      printPeople(people);
    }
  knex.destroy();
  })


// -------------------------------Callbacks ------------------------------------

  function printPeople(people) {
    console.log(`- ${people.id}: ${people.first_name} ${people.last_name}, born: ${people.birthdate.getFullYear()}-${people.birthdate.getMonth()+1}-${people.birthdate.getDate()}`)
  }
