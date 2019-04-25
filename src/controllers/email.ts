import * as rp from "request-promise";
import * as crypto from "crypto";
import request = require("request");
import { readFileSync } from "fs";
import { join } from "path";
import { StatusCodeError, RequestError } from "request-promise/errors";

const HEADERS: request.Headers = {};

export enum SubscriptionStatus {
  Subscribed = "subscribed",
  Unsubscribed = "unsubscribed",
  Pending = "pending",
  Cleaned = "cleaned"
}

class EmailController {
  datacenter!: string;
  rootUrl!: string;
  headers!: request.Headers;

  constructor(public apiKey: string, public listId: string) {
    const [_, dc] = apiKey.split("-");
    this.datacenter = dc;
    this.rootUrl = `https://${this.datacenter}.api.mailchimp.com/3.0/`;

    const headers = HEADERS;
    headers.Authorization =
      "Basic " + Buffer.from("tamuhack:" + this.apiKey).toString("base64");
    this.headers = headers;
  }

  async checkIfContactSubscribed(email: string): Promise<boolean> {
    const hash = crypto
      .createHash("md5")
      .update(email.toLowerCase())
      .digest("hex");
    const URL = this.rootUrl + `lists/${this.listId}/members/${hash}`;
    try {
      const response: request.Response = await rp.get(URL, {
        headers: this.headers
      });
      if (response.body.status === SubscriptionStatus.Subscribed) {
        return true;
      }
      return false;
    } catch (err) {
      if (err instanceof StatusCodeError) {
        if (err.statusCode === 404) {
          return false;
        }
      }
    }
    return false;
  }

  async addContactToList(email: string, status: SubscriptionStatus) {
    const URL = this.rootUrl + `lists/${this.listId}/members/`;
    const body = {
      email_address: email,
      status
    };

    return rp.post(URL, {
      headers: this.headers,
      body: JSON.stringify(body)
    });
  }
}

const MAIL_API_KEY = readFileSync("/run/secrets/MAIL_API_KEY").toString();
const AUDIENCE_ID = readFileSync("/run/secrets/AUDIENCE_ID").toString();

const emailController = new EmailController(MAIL_API_KEY, AUDIENCE_ID);

export { emailController };
