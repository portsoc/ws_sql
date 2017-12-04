/*
 * insert two people in a transaction, print out count of people
 */

const contacts = require('./sql-contact-list');
const names = require('./names');

async function main() {
  const p1 = newRandomPerson();
  const p2 = newRandomPerson();

  await contacts.insertMultiple([p1, p2]);

  // for output, let's just log how many we know now
  const count = await contacts.getLength();
  console.log('now know ' + count + ' contacts');

  // close database connections that otherwise prevent Node from exiting
  contacts.shutDown();
}

function newRandomPerson() {
  const newPerson = {};
  newPerson.fname = names.randomFirstName();
  newPerson.lname = names.randomLastName();
  newPerson.phone = '0' + Math.floor(Math.random()*8999999999+1000000000); // random 10-digit number
  return newPerson;
}

main();
