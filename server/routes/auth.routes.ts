const express = require('express');
import * as controller from '../controllers/auth.controller';
export const authRouter = express();

authRouter.post('/login', controller.login);

authRouter.post('/signup', controller.signup);

authRouter.post('/existAlready', controller.existAlready);
