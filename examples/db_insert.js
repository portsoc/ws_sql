/*
 * insert a new random person
 * this doesn't give any address to the new contacts, feel free to add that
 */

const contacts = require('./sql-contact-list');
const names = require('./names');

async function main() {
  const fname = names.randomFirstName();
  const lname = names.randomLastName();
  const phone = '0' + Math.floor(Math.random()*8999999999+1000000000); // random 10-digit number

  await contacts.insert(fname, lname, phone);
  console.log('inserted ' + fname + ' ' + lname);

  // close database connections that otherwise prevent Node from exiting
  contacts.shutDown();
}

main();
