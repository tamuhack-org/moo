import {Request, Response} from 'express';

const VOLUNTEER_LINK =
    'https://www.signupgenius.com/go/60b0c48abab22a5fa7-tamuhack2';

export const volunteerRoute = async (req: Request, res: Response) => {
  res.redirect(VOLUNTEER_LINK);
};