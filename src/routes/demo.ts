import {Request, Response} from 'express';

const DEVPOST_LINK = 'http://tamuhack2020.devpost.com/';

export const demoRoute = async (req: Request, res: Response) => {
  res.redirect(DEVPOST_LINK);
};
