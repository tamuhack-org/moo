import { Request, Response } from "express";
import { join } from "path";

export const hubRoute = async (req: Request, res: Response) => {
  res.render("index.html");
};
