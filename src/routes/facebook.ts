import {Request, Response} from 'express';

const FACEBOOK_LINK = 'https://www.facebook.com/groups/1173997689655556/?source_id=452096011588482';

export const facebookRoute = async (req: Request, res: Response) => {
  res.redirect(FACEBOOK_LINK);
};
