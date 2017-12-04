/*
 * insert two people in a transaction, print out count of people
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

// prepare query template
const insertQuery = 'INSERT INTO contact SET ? ;';

// generate two new people
const p1 = newRandomPerson();
const p2 = newRandomPerson();

// now add them to the database
// do it in a transaction (so if one fails, neither gets inserted)
// in the end, print out the number of persons currently in the database
sql.beginTransaction((err) => {
  if (err) {
    error('failed to begin transaction', err);
    return;
  }

  sql.query(sql.format(insertQuery, p1), (err) => {
    if (err) {
      error('failed first insert', err, true);
      return;
    }

    sql.query(sql.format(insertQuery, p2), (err) => {
      if (err) {
        error('failed second insert', err, true);
        return;
      }

      sql.commit((err) => {
        if (err) {
          error('failed second insert', err, true);
          return;
        }

        sql.query('select count(*) as count from contact', (err, data) => {
          if (err) {
            error('failed to check the current count', err);
            return;
          }

          console.log('now know ' + data[0].count + ' contacts');
          sql.end();
        });
      });
    });
  });
});

// the program ends here


// helpful functions

function error(msg, error, rollback) {
  console.error(msg + ': ' + error);
  if (rollback) sql.rollback();
  sql.end();
}

function newRandomPerson() {
  const newPerson = {};
  newPerson.fname = names.randomFirstName();
  newPerson.lname = names.randomLastName();
  newPerson.phone = '0' + Math.floor(Math.random()*8999999999+1000000000); // random 10-digit number
  return newPerson;
}
