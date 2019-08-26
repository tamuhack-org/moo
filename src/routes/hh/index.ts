import { Request, Response, Router } from "express";

let howdyHackRouter = Router();

howdyHackRouter.get('/', async (req: Request, res: Response) => {
    res.render("hh-landing.html");
});

howdyHackRouter.get('/2019', async (req: Request, res: Response) => {
    res.redirect('/hh');
});

howdyHackRouter.get('/2018', async (req: Request, res: Response) => {
    res.render("hh-2018.html");
});

export default howdyHackRouter;