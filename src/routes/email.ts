import { Request, Response } from "express";
import { dbController } from "../controllers/db";

export const emailRoute = async (req: Request, res: Response) => {
  const { email } = req.body;
  dbController
    .insertEmail(email)
    .then(() => {
      res.sendStatus(200);
    })
    .catch(err => {
      console.error(err);
    });
};
