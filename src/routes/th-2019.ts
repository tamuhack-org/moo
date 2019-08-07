import { Request, Response } from "express";

export const th2019Route = async (req: Request, res: Response) => {
  res.render("th-2019.html");
};
