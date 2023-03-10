import {Router} from 'express';

import {authRouter} from '../routes/auth.router';
import {creatorRouter} from '../routes/creator.router';
import {videoRouter} from '../routes/video.router';
import { followerRouter } from './follower.router';
import { likevideoRouter } from './likevideo.router';

const api = Router();

api.use('/auth', authRouter);
api.use('/creator', creatorRouter);
api.use('/video', videoRouter);
api.use('/like', likevideoRouter);
api.use('/follower', followerRouter);

export {
    api
}