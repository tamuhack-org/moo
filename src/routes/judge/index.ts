import {Request, Response, Router} from 'express';

const judgeRouter = Router();

judgeRouter.get('/', async (req: Request, res: Response) => {
    res.redirect('https://forms.gle/GSNEFZ1P1V5BqG7y7');
});

judgeRouter.get('/main', async (req: Request, res: Response) => {
    res.redirect('https://gavel-tamuhack-main.herokuapp.com/');
});

judgeRouter.get('/aa', async (req: Request, res: Response) => {
    res.redirect('https://gavel-tamuhack-aa.herokuapp.com/');
});

judgeRouter.get('/beginner', async (req: Request, res: Response) => {
    res.redirect('https://gavel-tamuhack-beginner.herokuapp.com/');
});
  
judgeRouter.get('/bh', async (req: Request, res: Response) => {
    res.redirect('https://gavel-tamuhack-bh.herokuapp.com/');
});

judgeRouter.get('/cbre', async (req: Request, res: Response) => {
    res.redirect('https://gavel-tamuhack-cbre.herokuapp.com/');
});

judgeRouter.get('/contrary', async (req: Request, res: Response) => {
    res.redirect('https://gavel-tamuhack-contrary.herokuapp.com/');
});

judgeRouter.get('/credera', async (req: Request, res: Response) => {
    res.redirect('https://gavel-tamuhack-credera.herokuapp.com/');
});

judgeRouter.get('/gartner', async (req: Request, res: Response) => {
    res.redirect('https://gavel-tamuhack-gartner.herokuapp.com/');
});

judgeRouter.get('/hackerfav', async (req: Request, res: Response) => {
    res.redirect('https://gavel-tamuhack-hackerfav.herokuapp.com/');
});

judgeRouter.get('/hardware', async (req: Request, res: Response) => {
    res.redirect('https://gavel-tamuhack-hardware.herokuapp.com/');
});

judgeRouter.get('/innovative', async (req: Request, res: Response) => {
    res.redirect('https://gavel-tamuhack-innovative.herokuapp.com/');
});

judgeRouter.get('/jpmc', async (req: Request, res: Response) => {
    res.redirect('https://gavel-tamuhack-jpmc.herokuapp.com/');
});

judgeRouter.get('/microsoft', async (req: Request, res: Response) => {
    res.redirect('https://gavel-tamuhack-microsoft.herokuapp.com/');
});

judgeRouter.get('/pariveda', async (req: Request, res: Response) => {
    res.redirect('https://gavel-tamuhack-pariveda.herokuapp.com/');
});

judgeRouter.get('/pwc', async (req: Request, res: Response) => {
    res.redirect('https://gavel-tamuhack-pwc.herokuapp.com/');
});

judgeRouter.get('/statefarm', async (req: Request, res: Response) => {
    res.redirect('https://gavel-tamuhack-statefarm.herokuapp.com/');
});

judgeRouter.get('/sw', async (req: Request, res: Response) => {
    res.redirect('https://gavel-tamuhack-swairlines.herokuapp.com/');
});

judgeRouter.get('/uiux', async (req: Request, res: Response) => {
    res.redirect('https://gavel-tamuhack-uiux.herokuapp.com/');
});

judgeRouter.get('/usaa', async (req: Request, res: Response) => {
    res.redirect('https://gavel-tamuhack-usaa.herokuapp.com/');
});

judgeRouter.get('/wolfram', async (req: Request, res: Response) => {
    res.redirect('https://gavel-tamuhack-wolfram.herokuapp.com/');
});

export {judgeRouter};