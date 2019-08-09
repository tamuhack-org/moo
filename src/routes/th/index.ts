import { Request, Response, Router } from "express";

let tamuHackRouter = Router();

tamuHackRouter.get('/', async (req: Request, res: Response) => {
    res.redirect('/th/2019');
});

tamuHackRouter.get('/2018', async (req: Request, res: Response) => {
    res.render("th-2018.html");
});

tamuHackRouter.get('/2019', async (req: Request, res: Response) => {
    res.render("th-2019.html");
});

export default tamuHackRouter;