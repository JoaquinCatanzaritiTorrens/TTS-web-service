import { Router, Request, Response } from 'express';
import { AppDataSource } from '../../config/data-source';
import { checkJwt } from '../../__shared__/middleware/checkJWT';
import { generateToken, sendTokenAsCookie, isValidEmail } from '../../__shared__/__helpers__/auth-helpers';
import UserTypeOrmRepository from './database/typeorm/user-typeorm-repository';
import CreateUser from '../application/use-cases/create-user';
import LoginUser from '../application/use-cases/login-user';
import GetProfile from '../application/use-cases/get-profile';
import SendVerificationCode from '../application/use-cases/send-verification-code';
import VerifyCode from '../application/use-cases/verify-code';

const router = Router();

router.post('/register', async (req: Request, res: Response) => {
    const repository = new UserTypeOrmRepository(AppDataSource);
    const createUser = new CreateUser(repository);
    const verifyCode = new VerifyCode();
    const { email, password, verificationCode } = req.body;

    try {
        const isVerified = await verifyCode.execute(email, verificationCode);
        if (!isVerified) {
            return res.status(400).json({ message: 'Invalid or expired verification code.' });
        }

        const user = await createUser.execute({ email, password });
        const token = generateToken(user);
        sendTokenAsCookie(res, token);
        return res.status(201).json({ message: 'Registration successful' });
    } catch (error) {
        return res.status(500).json({ message: 'Error registering the user', error });
    }
});

router.post('/send-verification-code', async (req: Request, res: Response) => {
    const { email } = req.body;

    if (!isValidEmail(email)) {
        return res.status(400).json({ message: 'Invalid email.' });
    }

    const repository = new UserTypeOrmRepository(AppDataSource);
    const existingUser = await repository.findByEmail(email);

    if (existingUser) {
        return res.status(400).json({ message: 'User already exists.' });
    }

    try {
        const sendCode = new SendVerificationCode();
        await sendCode.execute(email);
        res.status(200).json({ message: 'Verification code sent.' });
    } catch (error) {
        res.status(500).json({ message: 'Error sending verification code.', error });
    }
});

router.post('/login', async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!isValidEmail(email)) {
        return res.status(400).json({ message: 'Invalid email.' });
    }

    const repository = new UserTypeOrmRepository(AppDataSource);
    const loginUser = new LoginUser(repository);

    try {
        const user = await loginUser.execute(email, password);

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        if (user.enabled === false) {
            return res.status(401).json({ message: 'User temporarily disabled' });
        }

        const token = generateToken(user);
        sendTokenAsCookie(res, token);
        return res.json({ message: 'Login successful' });
    } catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
});

router.post('/logout', checkJwt, (req: Request, res: Response) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
    });
    return res.json({ message: 'Logout successful' });
});

router.get('/profile', checkJwt, async (req: Request, res: Response) => {
    const { id } = (req as any).user;
    const repository = new UserTypeOrmRepository(AppDataSource);
    const getProfile = new GetProfile(repository);

    try {
        const user = await getProfile.execute(id);
        if (!user || !user.enabled) {
            return res.status(401).json({ message: 'Session expired' });
        }

        // Omit password from response
        const { password, ...userWithoutPassword } = user;
        return res.json(userWithoutPassword);
    } catch (error) {
        return res.status(500).json({ message: 'Error retrieving the user', error });
    }
});

export default router;
