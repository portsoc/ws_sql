# Examples of using SQL in Node.js: a simple contact list

In MySQL, we have a simple table of people – a contact list.

In Node.js, we have a module called `sql-contact-list` that gives us
a nice contact list interface to the SQL table.

Finally, in the files `db_*` we have simple command-line scripts that
use the interface to do trivial tasks with the contact list.

## List of Examples

* `config.json` — Contains database configuration
* `createdb.sql` — Initializes the database
* `db_count.js` — Counts people in the contact list
* `db_insert.js` — Inserts a person with a random name and phone number
* `db_insert2.js` — Inserts two randomly generated people in a transaction
* `db_list.js` — Lists all people in the database
* `db_search.js` — Lists all people with an optional filter
* `names.js` — A module that gives us random names
* `sql-contact-list.js` — A module that gives us a simple API for manipulating the contact list.
  * getLength
  * list
  * insert
  * insertMultiple
  * search
  * shutDown

To prepare the database to run the examples:
```bash
npm run initsql
```

Run these examples with `node`, for example like this:

```bash
node db_count
node db_insert
node db_list
node db_search Jo
```
