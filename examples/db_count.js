/*
 * print out the count of people we have in the contacts table
 */

const contacts = require('./sql-contact-list');

async function main() {
  const count = await contacts.getLength();
  console.log('now know ' + count + ' contacts');

  // close database connections that otherwise prevent Node from exiting
  contacts.shutDown();
}

main();
