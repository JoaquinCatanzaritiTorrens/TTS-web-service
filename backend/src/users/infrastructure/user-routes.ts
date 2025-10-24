import { Router } from 'express';
import { registerUser, loginUser, logoutUser, getProfile } from './user-controller';
import { sendVerificationCode } from './verification-controller';
import { checkJwt } from '../../__shared__/middleware/checkJWT';

const router = Router();

router.post('/register', registerUser);
router.post('/send-verification-code', sendVerificationCode);
router.post('/login', loginUser);
router.post('/logout', checkJwt, logoutUser);
router.get('/profile', checkJwt, getProfile);

export default router;
