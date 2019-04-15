import { Request, Response } from "express";
import { Email, sequelize } from "../models";
import { MailOptions } from "nodemailer/lib/stream-transport";
import { emailController } from "../controllers/email";

const EMAIL_REGEX = /^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+.)?[a-zA-Z]+.)?(tamu|email.tamu|neo.tamu).edu$/g;

const mailOptions: MailOptions = {
  from: "The TAMUhack Team <hello@tamuhack.com>",
  to: "",
  subject: "Howdy!",
  text: "Body Text",
  html: "<b>BODY TEXT</b>"
};

const emailIsValid = (email: string): boolean => {
  return EMAIL_REGEX.test(email);
};

const respondWithError = (res: Response, errMsg: string) => {
  res.json({
    error: errMsg
  });
};

export const registerEmail = async (req: Request, res: Response) => {
  await sequelize.sync();
  const { email } = req.body;
  if (emailIsValid(email)) {
    const count = await Email.count({ where: { email } });
    if (count < 1) {
      await Email.create({ email });
      mailOptions.to = email;
      await emailController.sendEmail(mailOptions);
      res.sendStatus(200);
    } else {
      respondWithError(res, "You've already joined our mailing list!");
    }
  } else {
    respondWithError(res, "We only accept tamu.edu domains.");
  }
};
