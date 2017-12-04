/*
 * list all the contacts (or filter by name if the -f argument is provided)
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
let query = 'select fname, lname, phone from contact';
if (process.argv[process.argv.length - 2] === '-f') {
  const filter = '%' + process.argv[process.argv.length - 1] + '%';
  query += sql.format(' where fname like ? or lname like ?', [filter, filter]);
}
query += ' order by lname, fname, phone';

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
