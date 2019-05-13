import { Request, Response } from "express";
import { join } from "path";

export const howdyHackRoute = async (req: Request, res: Response) => {
  res.render("hh-landing.html");
};
