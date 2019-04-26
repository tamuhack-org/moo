import * as Knex from "knex";

interface KnexConfig {
  user: string;
  password: string;
  database: string;
  socketPath?: string;
}

function validateEmail(email: string) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

class DatabaseController {
  constructor(private knex: Knex) {}

  insertEmail(email: string) {
    if (validateEmail(email)) {
      const timestamp = new Date();
      return this.knex("emails").insert({ email, timestamp });
    }
    throw new Error("Email is invalid.");
  }
}

function connect() {
  if (
    process.env.SQL_USER &&
    process.env.SQL_PASSWORD &&
    process.env.SQL_DATABASE
  ) {
    const config: KnexConfig = {
      user: process.env.SQL_USER,
      password: process.env.SQL_PASSWORD,
      database: process.env.SQL_DATABASE
    };
    if (
      process.env.INSTANCE_CONNECTION_NAME &&
      process.env.NODE_ENV === "production"
    ) {
      config.socketPath = `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`;
    }
    return Knex({
      client: "mysql",
      connection: config
    });
  }
  throw new Error("Not all environment variables are set.");
}

const knex = connect();

const dbController = new DatabaseController(knex);

export { dbController };
