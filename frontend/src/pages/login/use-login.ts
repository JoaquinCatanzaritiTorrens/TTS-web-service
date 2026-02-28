import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useUser } from '../../context/user-context/user-context';
import { usePageTitle } from 'src/_helpers/use-page-title';

const useLogin = () => {
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const { refreshUser, setUser } = useUser();

    usePageTitle('pageTitles.login');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) {
            setError(t('login.errorFieldsRequired'));
            return;
        }
        setError(null);
        await login(email, password);
    };

    const handleClickShowPassword = useCallback(() => {
        setShowPassword(!showPassword);
    }, [showPassword]);

    const clearError = useCallback(() => {
        setError(null);
    }, []);

    const login = async (email: string, password: string) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`/api/users/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
                credentials: 'include',
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || t('login.errorLogin'));
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

    return {
        state: {
            email,
            password,
            showPassword,
            loading,
            error,
        },
        actions: {
            setEmail,
            setPassword,
            handleClickShowPassword,
            handleSubmit,
            setError,
            clearError,
        },
    };
};

export default useLogin;