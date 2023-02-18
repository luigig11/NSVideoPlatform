import { Router } from "express";
import { httpAddFollower, httpGetFollower, httpUnFollow } from "../controllers/follower.controller";

const followerRouter: Router = Router();

followerRouter.get('/', httpGetFollower);
followerRouter.post('/', httpAddFollower);
followerRouter.post('/unfollow', httpUnFollow);

export {
    followerRouter
}