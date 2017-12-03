'use strict';

const fs = require('fs');
const mysql = require('mysql2');


/**
 * In the `worksheet` folder, make a module called `cardb.js`
 * that implements a simple database of cars, as defined below.
 *
 * The module exports two functions:
 *  1. `saveCar` with the following parameters: `reg`, `make`,
 *     `model`, `year`, `price`, and `cb`. The function stores
 *     the information (except `cb`) in a suitable database table
 *     that you create. When it's done, the function must call
 *     the callback `cb()`. In case of an error, it should call
 *     `cb('error')`, possibly replacing `'error'` with a better
 *     error message.
 *
 *  2. `getAveragePrice` with two parameters: `year` and `cb`.
 *     The function should find out the average price of all known cars
 *     from the given year. When done, it will call `cb(null, price)` where
 *     `price` is the computed average price. In case of an error (such as
 *     that we don't have any cars from the given year) it should call
 *     `cb('error')` or another error message to indicate that it failed.
 *
 * Put your database initialization SQL code in `worksheet/cardb_init.sql`.
 * Run the database initialization code in your MySQL.
 *
 * Put your database configuration in `worksheet/config.json`.
 * Inside the `mysql` object in `config.json` you should have
 * an extra property called `table` which contains the name
 * of the database table where you store the information about cars,
 * so that our tests can inspect that.
 *
 * PLEASE NOTE THAT OUR TESTS WILL DELETE ALL EXISTING DATA from the table
 * of car information. For your testing, feel free to have an SQL script
 * or a JS script that puts in some testing data.
 */

/* global test, ok, expect, stop, start, equal, strictEqual */
/* eslint-disable no-restricted-globals */


test(
  'Create a file `worksheet/config.json`',
  () => {
    try {
      fs.accessSync('./worksheet/config.json', fs.F_OK);
      ok(true, '`worksheet/config.json` created');
    } catch (e) {
      ok(false, '`worksheet/config.json` is missing - please create it');
    }

    const config = require('./worksheet/config.json'); // eslint-disable-line global-require
    ok(config.mysql.table, '`worksheet/config.json` needs a property `table` within `mysql`');
  },
);


test(
  'Create a file `worksheet/cardb_init.sql`',
  () => {
    try {
      fs.accessSync('./worksheet/cardb_init.sql', fs.F_OK);
      ok(true, '`worksheet/cardb_init.sql` created');
    } catch (e) {
      ok(false, '`worksheet/cardb_init.sql` is missing - please create it');
    }
  },
);


test(
  'Create a file `worksheet/cardb.js`',
  () => {
    try {
      fs.accessSync('./worksheet/cardb.js', fs.F_OK);
      ok(true, '`worksheet/cardb.js` created');
    } catch (e) {
      ok(false, '`worksheet/cardb.js` is missing - please create it');
    }

    const cardb = require('./worksheet/cardb'); // eslint-disable-line global-require

    ok(typeof cardb.saveCar === 'function', 'cardb.js must export a function called `saveCar`');
    ok(typeof cardb.getAveragePrice === 'function', 'cardb.js must export a function called `getAveragePrice`');
  },
);


test(
  'Clear the database',
  () => {
    const config = require('./worksheet/config.json'); // eslint-disable-line global-require
    const sql = mysql.createConnection(config.mysql);
    expect(2);
    stop();
    sql.query(sql.format('select count(*) from ??', [config.mysql.table]), (err, data) => {
      if (err) {
        ok(false, 'Error checking that table ' + config.mysql.table + ' exists: ' + err);
      } else {
        ok('count(*)' in data[0], 'Table ' + config.mysql.table + ' exists');
      }

      sql.query(sql.format('delete from ??', [config.mysql.table]), (err) => {
        if (err) {
          ok(false, 'Error deleting data from table ' + config.mysql.table + ': ' + err);
        } else {
          ok(true, 'Table ' + config.mysql.table + ' cleared');
        }
        start();
      });
    });
  },
);


test(
  'saveCar',
  () => {
    const cardb = require('./worksheet/cardb'); // eslint-disable-line global-require
    const config = require('./worksheet/config.json'); // eslint-disable-line global-require
    const sql = mysql.createConnection(config.mysql);
    expect(9);
    stop();
    const timeout = setTimeout(() => {
      ok(false, 'Timeout - are you calling the callbacks?');
      start();
    }, 3000);
    cardb.saveCar('han 5010', 'Ford', 'Harrison', 1980, 8999.99, (err) => {
      if (checkError('saving car', err, timeout)) return;

      sql.query(sql.format('select count(*) from ??', [config.mysql.table]), (err, data) => {
        if (checkError('checking count', err, timeout)) return;

        equal(data[0]['count(*)'], 1, 'Expecting one car in the table');

        // beware sql injection with spurious " and '
        cardb.saveCar('bn18 qqq"', 'Brand', 'New', 2018, 15000, (err) => {
          if (checkError('saving car', err, timeout)) return;

          sql.query(sql.format('select count(*) from ??', [config.mysql.table]), (err, data) => {
            if (checkError('checking count', err, timeout)) return;

            equal(data[0]['count(*)'], 2, 'Expecting two cars in the table');

            cardb.saveCar('abcd efg', 'Luxurius', 'Novus\'', 2018, 47000, (err) => {
              if (checkError('saving car', err, timeout)) return;

              sql.query(sql.format('select count(*) from ??', [config.mysql.table]), (err, data) => {
                if (checkError('checking count', err, timeout)) return;

                equal(data[0]['count(*)'], 3, 'Expecting three cars in the table');
                start();
                clearTimeout(timeout);
              });
            });
          });
        });
      });
    });
  },
);


test(
  'getAveragePrice',
  () => {
    // test average for one car
    // test average for two cars
    // test average for nonexistent year
    const cardb = require('./worksheet/cardb'); // eslint-disable-line global-require
    expect(10);
    stop();
    const timeout = setTimeout(() => {
      ok(false, 'Timeout - are you calling the callbacks?');
      start();
    }, 3000);
    cardb.getAveragePrice(1980, (err, avg) => {
      if (checkError('getting average', err, timeout)) return;
      strictEqual(avg, 8999.99, 'the average price of cars from 1980 is 8999.99');

      cardb.getAveragePrice(2018, (err, avg) => {
        if (checkError('getting average', err, timeout)) return;
        strictEqual(avg, 31000, 'the average price of cars from 2018 is 31k');

        cardb.getAveragePrice(3000, (err, avg) => {
          ok(err != null, 'no cars from 3000: if the query does not return anything, treat it as an error');
          ok(avg == null, 'in case of error, must not return an average');

          cardb.getAveragePrice('\'30', (err, avg) => {
            ok(err != null, 'no cars from \'30 - beware sql injection');
            ok(avg == null, 'in case of error, must not return an average');

            cardb.getAveragePrice('"30', (err, avg) => {
              ok(err != null, 'no cars from "30 - beware sql injection');
              ok(avg == null, 'in case of error, must not return an average');
              start();
              clearTimeout(timeout);
            });
          });
        });
      });
    });
  },
);


function checkError(msg, err, timeout) {
  if (err) {
    ok(false, 'Error ' + msg + ': ' + err);
    if (timeout) clearTimeout(timeout);
    start();
    return true;
  }

  ok(true, 'Success ' + msg);
  return false;
}
