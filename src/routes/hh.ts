import { Request, Response } from "express";

export const howdyHackRoute = async (req: Request, res: Response) => {
  res.render("hh-landing.html");
};
