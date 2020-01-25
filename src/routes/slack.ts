import {Request, Response} from 'express';

const SLACK_URL =
    'https://join.slack.com/t/tamuhack2020/shared_invite/enQtODA0Njk4MzU3MDEwLWExZTdkODQyNmEyMzQ1ZWRiMGRjM2JkNjNlZDQxYTEwNzEzZWJjMTYwMjY5Y2ExZTJkNDcyNTdhYzE3ZGQ3Yzc';

export const slackRoute = async (req: Request, res: Response) => {
  res.redirect(SLACK_URL);
};
