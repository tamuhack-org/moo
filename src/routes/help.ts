import {Request, Response} from 'express';

const HELP_LINK = 'https://help.tamuhack.com';

export const helpRoute = async (req: Request, res: Response) => {
  res.redirect(HELP_LINK);
};
