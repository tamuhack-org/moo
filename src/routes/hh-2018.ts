import { Request, Response } from "express";

export const hh2018Route = async (req: Request, res: Response) => {
  res.render("hh-2018.html");
};
