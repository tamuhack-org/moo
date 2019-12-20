import {Request, Response, Router} from 'express';

const howdyHackRouter = Router();

howdyHackRouter.get('/', async (req: Request, res: Response) => {
  res.render('hh-2019.html');
});

howdyHackRouter.get('/2018', async (req: Request, res: Response) => {
  res.render('hh-2018.html');
});

howdyHackRouter.get('/2019', async (req: Request, res: Response) => {
  res.redirect('/hh');
});

export {howdyHackRouter};