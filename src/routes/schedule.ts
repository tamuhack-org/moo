import {Request, Response} from 'express';

const SCHEDULE_URL =
    '/th#schedule';

export const scheduleRoute = async (req: Request, res: Response) => {
  res.redirect(SCHEDULE_URL);
};
