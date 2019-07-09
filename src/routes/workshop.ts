import { Request, Response } from "express";

export const workshopRoute = async (req: Request, res: Response) => {
  res.render("workshop.html");
};