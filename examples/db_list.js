/*
 * list all the contacts
 */

const contacts = require('./sql-contact-list');

async function main() {
  const people = await contacts.list();

  for (const p of people) {
    console.log(`${p.fname} ${p.lname} ${p.phone}`);
  }
  console.log(`There are ${people.length} contacts.`);

  // close database connections that otherwise prevent Node from exiting
  contacts.shutDown();
}

main();
