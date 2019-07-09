import { Request, Response } from "express";

export const hubRoute = async (req: Request, res: Response) => {
  res.render("index.html");
};