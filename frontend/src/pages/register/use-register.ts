import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useUser } from '../../context/user-context/user-context';
const useRegister = () => {
    const { t } = useTranslation();
    const { refreshUser, setUser } = useUser();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isVerifying, setIsVerifying] = useState(false);
    const [verificationCode, setVerificationCode] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [resendTimer, setResendTimer] = useState(5);
    const navigate = useNavigate();

    useEffect(() => {
        if (resendTimer > 0) {
            const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [resendTimer]);

    const handleSendVerificationCode = async (resending: boolean = false) => {

        if (!email || !password) {
            setError(t('register.errorIncompleteFields'));
            return;
        }
        if (!resending) {
            setLoading(true);
        }
        setError(null);

        try {
            const response = await fetch(`/api/users/send-verification-code`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || t('register.errorRegister'));
            }

            setIsVerifying(true);
            setResendTimer(30);
        } catch (err: any) {
            setError(err.message);
        } finally {
            if (!resending) {
                setLoading(false);
            }
        }
    };

    const handleSubmit = async () => {

        if (!email || !password || !verificationCode) {
            setError(t('register.errorIncompleteFields'));
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`/api/users/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, verificationCode }),
                credentials: 'include',
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || t('register.errorRegister'));
            }

            if (data.user) {
                setUser(data.user);
            } else {
                await refreshUser();
            }
            navigate('/app');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleClickShowPassword = useCallback(() => {
        setShowPassword(!showPassword);
    }, [showPassword]);

    const clearError = useCallback(() => {
        setError(null);
    }, []);

    const handleResendCodeClick = async () => {
        setIsButtonDisabled(true);
        await handleSendVerificationCode(true);
        setIsButtonDisabled(false);
    };

    return {
        state: {
            email,
            password,
            showPassword,
            loading,
            error,
            isVerifying,
            verificationCode,
            resendTimer,
            isButtonDisabled,
        },
        actions: {
            setEmail,
            setPassword,
            handleClickShowPassword,
            handleSendVerificationCode,
            handleSubmit,
            setVerificationCode,
            handleResendCodeClick,
            setError,
            clearError,
        },
    };
};

export default useRegister;
