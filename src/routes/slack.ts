import {Request, Response} from 'express';

const SLACK_URL =
    'http://tamuhack2020.slack.com/';

export const slackRoute = async (req: Request, res: Response) => {
  res.redirect(SLACK_URL);
};
