import { Request, Response } from "express";
import { eventbriteController } from "../controllers/eventbrite";

export const workshopRoute = async (req: Request, res: Response) => {
  const events = await eventbriteController.fetchEvents();
  res.render("workshop.hbs", { events, cache: true });
};


