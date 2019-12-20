import {Request, Response} from 'express';

const SLACK_URL =
    'https://join.slack.com/t/howdyhack2019/shared_invite/enQtNzEwNjM5MzQyODM4LWRmNGI3N2YzNjA5ZmU1OTE3YjgxYzJmMzcyMmNlMWY2MmVkODYxNjY1YjY1NDk5YzFkYjYyZmRiYzhkMjYxMmE';

export const slackRoute = async (req: Request, res: Response) => {
  res.redirect(SLACK_URL);
};
