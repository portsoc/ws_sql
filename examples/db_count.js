/*
 * print out the count of people we have in the contacts table
 */

const mysql = require('mysql2');

const config = require('./config.json');

// create a connection to the database
const sql = mysql.createConnection(config.mysql);

// handle unexpected errors by just logging them
sql.on('error', (err) => {
  console.error(err);
  sql.end();
});

// now query the table
sql.query('select count(*) as count from contact', (err, data) => {
  if (err) {
    error('failed to check the current count', err);
    return;
  }

  console.log('now know ' + data[0].count + ' contacts');
  sql.end();
});

// the program ends here


// helpful function

function error(msg, error) {
  console.error(msg + ': ' + error);
}
