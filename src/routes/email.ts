import {Request, Response} from 'express';
import {emailController} from '../controllers/email';

export const emailRoute = async (req: Request, res: Response) => {
  const {email, howdyHackInterest} = req.body;
  emailController.upsert(email, howdyHackInterest ? howdyHackInterest : false)
      .then(() => {
        res.sendStatus(200);
      })
      .catch(err => {
        console.error(err);
        // TODO: Send more informative errors back to the user
        res.sendStatus(400);
      });
};
