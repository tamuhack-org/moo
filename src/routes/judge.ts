import { Request, Response } from "express";

const JUDGE_FORM_LINK = "https://docs.google.com/forms/d/e/1FAIpQLSc2rBJejvgEVRZLeenaDeEII8_a9yXzgM3oJys5fy5eXVvvyg/viewform?usp=sf_link"

export const judgeRoute = async (req: Request, res: Response) => {
    res.redirect(JUDGE_FORM_LINK);
}
