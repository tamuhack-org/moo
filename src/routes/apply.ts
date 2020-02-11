import {Request, Response} from 'express';

const APP_URL =
    'https://forms.gle/VyMdmd1Ls8tXEywPA';

export const applyRoute = async (req: Request, res: Response) => {
  res.redirect(APP_URL);
};
