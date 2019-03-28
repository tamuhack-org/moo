import { Request, Response } from "express";

export const homeRoute = async (req: Request, res: Response) => {
  res.render("index", {});
};
