import {Request, Response} from 'express';

const MENTOR_LINK = 'https://forms.gle/R58kPpMMGDmCbE1L8';

export const mentorRoute = async (req: Request, res: Response) => {
  res.redirect(MENTOR_LINK);
};