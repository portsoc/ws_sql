/*
 * list all the contacts (or filter by name if the -f argument is provided)
 */

if (process.argv.length !== 3) {
  console.error('Required parameter:   a search string');
  console.error('Will list contacts whose first or last name matches the given string.');
  process.exit(-1);
}

const contacts = require('./sql-contact-list');

async function main() {
  const searchString = process.argv[2];

  const people = await contacts.search(searchString);

  for (const p of people) {
    console.log(p.fname + ' ' + p.lname + '  ' + p.phone);
  }
  console.log(`total ${people.length} persons matching "${searchString}".`);

  // close database connections that otherwise prevent Node from exiting
  contacts.shutDown();
}

main();
