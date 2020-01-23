import {Request, Response} from 'express';

const HISS_LINK = 'https://tamuhack-org.github.io/rattle/#/';

export const hissRoute = async (req: Request, res: Response) => {
  res.redirect(HISS_LINK);
};
