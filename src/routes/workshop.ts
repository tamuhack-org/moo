import {Request, Response} from 'express';
import {eventbriteController} from '../controllers/eventbrite';

export const workshopRoute = async (req: Request, res: Response) => {
  let events;
  try {
    events = await eventbriteController.fetchEvents();
  } catch (err) {
    console.error('Error fetching events', err);
  } finally {
    res.render('workshop.hbs', {events, cache: true});
  }
};
