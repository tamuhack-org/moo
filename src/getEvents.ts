import * as redis from "redis";
import { readFileSync } from "fs";
import { promisify } from "util";
import * as rp from "request-promise";

let PERSONAL_OAUTH_TOKEN: string;

if (!process.env.PERSONAL_OAUTH_TOKEN_FILE) {
  throw Error("Missing PERSONAL_OAUTH_TOKEN_FILE environment variable.");
} else {
  PERSONAL_OAUTH_TOKEN = readFileSync(
    process.env.PERSONAL_OAUTH_TOKEN_FILE,
    "utf8"
  ).trim();
  if (PERSONAL_OAUTH_TOKEN === "") {
    throw Error("The PERSONAL_OAUTH_TOKEN_FILE is empty.");
  }
}

const eventListUrl = `https://www.eventbriteapi.com/v3/organizations/269923607939/events?time_filter=current_future`;

const OPTIONS = {
  uri: eventListUrl,

  headers: {
    Authorization: `Bearer ${PERSONAL_OAUTH_TOKEN}`
  }
};

const DURATION = 60 * 60; // One hour

const client = redis.createClient({ host: "redis" });
const getAsync = promisify(client.get).bind(client);

client.on("error", err => {
  console.error(err);
});


/**
 * Retrieves a list of TAMUhack events from Eventbrite. To minimize API usage,
 * this function will cache the results of the API call for 1 hour before
 * calling the API again.
 */
export async function getEvents(): Promise<Array<{}>> {
  const events: string | undefined = await getAsync("events");
  if (!events) {
    try {
      const response = await rp.get(OPTIONS);
      const { events } = JSON.parse(response);
      client.set("events", JSON.stringify(events), "EX", DURATION, err => {
        if (err) {
          console.error(err);
        }
      });
      return events;
    } catch (err) {
      console.error("ERROR: ", err);
      return [];
    }
  } else {
    return JSON.parse(events);
  }
}
