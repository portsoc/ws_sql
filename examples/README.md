# Examples of using SQL in Node.js: a simple contact list

In MySQL, we have a simple table of people – a contact list.

In Node.js, we have a module called `sql-contact-list` that gives us
a nice contact list interface to the SQL table.

Finally, in the files `db_*` we have simple command-line scripts that
use the interface to do trivial tasks with the contact list.

## List of Examples

* `config.json` — Contains database configuration
* `createdb.sql` — Initializes the database
* `db_count.js` — Counts the persons
* `db_insert.js` — Inserts a random person
* `db_insert2.js` — Inserts two random persons in a transaction
* `db_list.js` — Lists all persons
* `db_search.js` — Lists all persons with an optional filter
* `names.js` — A module that gives us random names
* `sql-contact-list.js` — A module that gives us a simple

Run these examples with `node`, for example like this:

```bash
node db_count
node db_insert
node db_list
node db_search Jo
```
