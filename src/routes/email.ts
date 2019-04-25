import { Request, Response } from "express";
import { emailController, SubscriptionStatus } from "../controllers/email";
import { RequestResponse } from "request";
import { StatusCodeError } from "request-promise/errors";

export const registerEmail = async (req: Request, res: Response) => {
  const { email } = req.body;
  emailController.checkIfContactSubscribed(email).then(isSubscribed => {
    if (!isSubscribed) {
      emailController
        .addContactToList(email, SubscriptionStatus.Subscribed)
        .then((response: RequestResponse) => {
          res.sendStatus(200);
        })
        .catch(err => {
          if (err instanceof StatusCodeError) {
            res.json({ error: JSON.parse((err.response as any).body).title });
          }
        });
    }
  });
};
