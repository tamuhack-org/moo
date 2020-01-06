import {Request, Response} from 'express';

const MAP_URL =
    '/th#map';

export const mapRoute = async (req: Request, res: Response) => {
  res.redirect(MAP_URL);
};
