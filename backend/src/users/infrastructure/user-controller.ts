import { Request, Response } from 'express';
import { UserService } from '../application/user-service';
import { generateToken, sendTokenAsCookie, isValidEmail } from '../../__shared__/__helpers__/auth-helpers';
import { verifyCodeInRedis } from '../application/verification-service';

const userService = new UserService();

export const registerUser = async (req: Request, res: Response) => {
    const { email, password, verificationCode } = req.body;

    try {
        const isVerified = await verifyCodeInRedis(email, verificationCode);
        if (!isVerified) {
            return res.status(400).json({ message: 'Invalid or expired verification code.' });
        }

        const user = await userService.createUser(email, password);
        const token = generateToken(user);
        sendTokenAsCookie(res, token);
        return res.status(201).json({ message: 'Registration successful' });
    } catch (error) {
        return res.status(500).json({ message: 'Error registering the user', error });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!isValidEmail(email)) {
        return res.status(400).json({ message: 'Invalid email.' });
    }

    try {
        const user = await userService.getUserByEmail(email);

        if (user?.enabled === false) {
            return res.status(401).json({ message: 'User temporarily disabled' });
        }
        if (!user || !(await userService.comparePassword(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = generateToken(user);
        sendTokenAsCookie(res, token);
        return res.json({ message: 'Login successful' });
    } catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
};

export const logoutUser = (req: Request, res: Response) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
    });
    return res.json({ message: 'Logout successful' });
};

export const getProfile = async (req: Request, res: Response) => {

    const { id } = (req as any).user;

    try {
        const user = await userService.getUserById(id);
        if (!user || !user.enabled) {
            return res.status(401).json({ message: 'Session expired' });
        }

        return res.json(user);
    } catch (error) {
        return res.status(500).json({ message: 'Error retrieving the user', error });
    }
};