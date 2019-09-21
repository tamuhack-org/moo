import { Request, Response } from "express";

const FACEBOOK_LINK = "https://www.facebook.com/groups/2606547856036002/"

export const facebookRoute = async (req: Request, res: Response) => {
    res.redirect(FACEBOOK_LINK);
}
