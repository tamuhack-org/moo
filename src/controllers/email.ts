import { Datastore } from "@google-cloud/datastore";

export interface EmailEntity {
  email: string;
  howdyHackInterest: boolean;
}

function emailIsValid(email: string): boolean {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

class EmailController {
  datastore: Datastore;

  constructor() {
    this.datastore = new Datastore();
  }

  async insert(email: string, howdyHackInterest = false) {
    if (emailIsValid(email)) {
      await this.datastore.insert({
        key: this.datastore.key(["Email", email]),
        data: { email, howdyHackInterest }
      });
    } else {
      throw Error("The email provided was not valid.");
    }
  }
}

const emailController = new EmailController();

export { emailController };
