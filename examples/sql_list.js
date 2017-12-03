/*
 * list all the contacts
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

// prepare query
const query = 'select fname, lname, phone from contact order by lname, fname, phone';

// now query the table and output the results
sql.query(query, (err, data) => {
  if (err) {
    error('failed to run the query', err);
    return;
  }

  data.forEach((row) => {
    console.log(row.fname + ' ' + row.lname + '  ' + row.phone);
  });
  console.log('total ' + data.length + ' rows.');
  sql.end();
});

// the program ends here


// helpful function

function error(msg, error) {
  console.error(msg + ': ' + error);
  sql.end();
}
