import {Request, Response, Router} from 'express';

const judgeRouter = Router();

judgeRouter.get('/', async (req: Request, res: Response) => {
    res.redirect('https://forms.gle/GSNEFZ1P1V5BqG7y7');
});

judgeRouter.get('/main', async (req: Request, res: Response) => {
    res.redirect('https://gavel-tamuhack-main.herokuapp.com/admin');
});

judgeRouter.get('/beginner', async (req: Request, res: Response) => {
    res.redirect('https://gavel-tamuhack-beginner.herokuapp.com/admin');
});

judgeRouter.get('/hardware', async (req: Request, res: Response) => {
    res.redirect('https://gavel-tamuhack-hardware.herokuapp.com/admin');
});

judgeRouter.get('/innovative', async (req: Request, res: Response) => {
    res.redirect('https://gavel-tamuhack-innovative.herokuapp.com/admin');
});

judgeRouter.get('/uiux', async (req: Request, res: Response) => {
    res.redirect('https://gavel-tamuhack-uiux.herokuapp.com/admin');
});

judgeRouter.get('/innovative', async (req: Request, res: Response) => {
    res.redirect('https://gavel-tamuhack-innovative.herokuapp.com/admin');
});

export {judgeRouter};