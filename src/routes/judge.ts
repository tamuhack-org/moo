import { Request, Response } from "express";

export const judgeRoute = async (req: Request, res: Response) => {
    res.redirect("https://docs.google.com/forms/d/e/1FAIpQLSc2rBJejvgEVRZLeenaDeEII8_a9yXzgM3oJys5fy5eXVvvyg/viewform?usp=sf_link");
}