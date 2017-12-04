/*
 * insert a new random person
 */

const mysql = require('mysql2');

const config = require('./config.json');
const names = require('./names');

// create a connection to the database
const sql = mysql.createConnection(config.mysql);

// handle unexpected errors by just logging them
sql.on('error', (err) => {
  console.error(err);
  sql.end();
});

// generate a new random person
const person = newRandomPerson();

// make the insert query
const insertQuery = sql.format('INSERT INTO contact SET ? ;', person);

// now run the query
sql.query(insertQuery, (err) => {
  if (err) {
    error('failed insert', err);
    return;
  }
  console.log('inserted ' + person.fname + ' ' + person.lname);
  sql.end();
});

// the program ends here


// helpful functions

function error(msg, error) {
  console.error(msg + ': ' + error);
  sql.end();
}

function newRandomPerson() {
  const newPerson = {};
  newPerson.fname = names.randomFirstName();
  newPerson.lname = names.randomLastName();
  newPerson.phone = '0' + Math.floor(Math.random()*8999999999+1000000000); // random 10-digit number
  return newPerson;
}
