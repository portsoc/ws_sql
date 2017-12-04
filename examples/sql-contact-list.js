'use strict';

const mysql = require('mysql2/promise');

const config = require('./config.json');


async function getContactsLength() {
  const sql = await init();
  const [rows] = await sql.query('SELECT COUNT(*) AS count FROM Contact');
  return Number(rows[0].count);
}


async function listContacts() {
  const sql = await init();

  // prepare query, always list people by last name
  const query = 'SELECT fname, lname, phone, address FROM Contact ORDER BY lname, fname, phone';
  const [rows] = await sql.query(query);
  return rows;
}


async function insertContact(fname, lname, phone, address) {
  const sql = await init();
  const insertQuery = sql.format('INSERT INTO Contact SET ? ;', { fname, lname, phone, address });
  await sql.query(insertQuery);
}


async function insertMultiple(persons) {
  // use a local SQL connection so that other callers
  // do not insert queries into this transaction
  const sql = await newConnection();

  try {
    await sql.beginTransaction();
    for (const p of persons) {
      const insertQuery = sql.format('INSERT INTO Contact SET ? ;', {
        fname: p.fname,
        lname: p.lname,
        phone: p.phone,
        address: p.address,
      });
      await sql.query(insertQuery); // eslint-disable-line no-await-in-loop
    }
    await sql.commit();
  } catch (e) {
    await sql.rollback();
  }
  releaseConnection(sql); // this requires no await, insertMultiple can already finish
}


async function searchContacts(search) {
  const sql = await init();

  const filter = '%' + search + '%';
  const query = sql.format(`SELECT fname, lname, phone, address FROM Contact
                            WHERE fname LIKE ? OR lname LIKE ?
                            ORDER BY lname, fname, phone`, [filter, filter]);
  const [rows] = await sql.query(query);
  return rows;
}


// create one connection to the database
let sqlPromise = null;

async function init() {
  if (sqlPromise) return sqlPromise;

  sqlPromise = newConnection();
  return sqlPromise;
}

async function shutDown() {
  if (!sqlPromise) return;
  const stashed = sqlPromise;
  sqlPromise = null;
  await releaseConnection(await stashed);
}

async function newConnection() {
  // todo: this should really use connection pools
  const sql = await mysql.createConnection(config.mysql);

  // handle unexpected errors by just logging them
  sql.on('error', (err) => {
    console.error(err);
    sql.end();
  });

  return sql;
}

async function releaseConnection(connection) {
  await connection.end();
}


// for debugging, we should log unhandled promise rejections
process.on('unhandledRejection', console.error);


/* eslint-disable object-shorthand */
module.exports = {
  getLength: getContactsLength,
  list: listContacts,
  insert: insertContact,
  insertMultiple: insertMultiple,
  search: searchContacts,
  shutDown: shutDown,
};
