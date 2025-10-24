import { Request, Response } from 'express';
import { sendRegistrationEmail } from '../application/verification-service';
import { UserService } from '../application/user-service';
import { isValidEmail } from '../../__shared__/__helpers__/auth-helpers';

const userService = new UserService();

export const sendVerificationCode = async (req: Request, res: Response) => {
    const { email } = req.body;

    if (!isValidEmail(email)) {
        return res.status(400).json({ message: 'Invalid email.' });
    }

    const existingUser = await userService.getUserByEmail(email);

    if (existingUser) {
        return res.status(400).json({ message: 'User already exists.' });
    }
    try {
        await sendRegistrationEmail(email);
        res.status(200).json({ message: 'Verification code sent.' });
    } catch (error) {
        res.status(500).json({ message: 'Error sending verification code.', error });
    }
};
