import jwt from 'jsonwebtoken';
import { Response } from 'express';

const jwtSecret = process.env.JWT_SECRET || "defaultSecret";
const tokenExpiry = '7d';
const cookieMaxAge = 7 * 24 * 60 * 60 * 1000;

export const generateToken = (user: { id: number; email: string }): string => {
    return jwt.sign({ id: user.id, email: user.email }, jwtSecret, { expiresIn: tokenExpiry });
};

export const sendTokenAsCookie = (res: Response, token: string): void => {
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
        maxAge: cookieMaxAge,
    });
};

export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};