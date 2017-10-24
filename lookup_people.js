const pg = require('pg')
const settings = require('./settings')

const client = new pg.Client ({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect((err) => {
  if (err) {
    return console.error('Connection Error', err)
  }
  searchPeople();
});


// -------------------------------- Search People ------------------------------
function searchPeople() {
  client.query('SELECT * FROM famous_people WHERE first_name = $1 OR last_name = $1',[process.argv[2]],(err, result) => {
      if (err) {
        return console.error('error running query', err);
      }
      console.log('Searching.....')
      console.log(`Found ${result.rows.length} results in database`)
      for (let people of result.rows) {
        printPeople(people);
      }
      client.end();
    });
}

function printPeople(people) {
  console.log(`- ${people.id}: ${people.first_name} ${people.last_name}, born: ${people.birthdate.getFullYear()}-${people.birthdate.getMonth()+1}-${people.birthdate.getDate()}`)
}
