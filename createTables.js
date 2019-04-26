const Knex = require("knex");
const prompt = require("prompt");

const FIELDS = ["user", "password", "database"];

prompt.get(FIELDS, (err, config) => {
  if (err) {
    console.error(err);
    return;
  }

  const knex = Knex({ client: "mysql", connection: config });

  knex.schema
    .createTable("emails", table => {
      table.increments();
      table.timestamp("timestamp");
      table
        .string("email")
        .unique()
        .notNullable();
      table.boolean("wants_HH_news");
    })
    .then(() => {
      console.log(`Successfully created 'emails' table.`);
      return knex.destroy();
    })
    .catch(err => {
      console.error(`Failed to create 'emails' table:`, err);
      if (knex) {
        knex.destroy();
      }
    });
});
