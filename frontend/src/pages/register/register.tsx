import { TextField, Button, Box, Typography, Paper, Link, IconButton, InputAdornment, Stack } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import CustomSnackbar from '../../components/Snackbar/snackbar';
import Logo from '../../components/Header/header-components/Logo';
import ThemeToggle from '../../components/Header/header-components/ThemeToggle';
import LanguageSelector from '../../components/Header/header-components/LanguageSelector';
import useRegister from './use-register';
import { useTranslation } from 'react-i18next';
import './register.css';

const Register = () => {
    const {
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
            clearError,
        }
    } = useRegister();

    const { t } = useTranslation();

    return (
        <Box className="register-container">
            <Box className="register-logo-box">
                <Logo onLogoClick={() => window.location.assign('/')} />
            </Box>
            <Paper elevation={3} className="register-paper">
                <Typography variant="h5" align="center">{t('register.title')}</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label={t('register.email')}
                        type="email"
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isVerifying}
                    />
                    <TextField
                        fullWidth
                        label={t('register.password')}
                        margin="normal"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isVerifying}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    {!isVerifying && (
                        <>
                            <Button
                                variant="contained"
                                onClick={() => handleSendVerificationCode(false)}
                                disabled={loading || !email || !password}
                                className="register-button"
                                sx={{ mt: 2, width: '100%', textTransform: 'uppercase' }}
                            >
                                {loading ? t('register.sendingCode') : t('register.sendCode')}
                            </Button>
                        </>
                    )}
                    {isVerifying && (
                        <>
                            <TextField
                                fullWidth
                                label={t('register.verificationCode')}
                                margin="normal"
                                value={verificationCode}
                                onChange={(e) => setVerificationCode(e.target.value)}
                            />
                            <Button
                                variant="contained"
                                onClick={handleSubmit}
                                disabled={loading || !verificationCode}
                                className="register-button"
                                sx={{ mt: 2, width: '100%', textTransform: 'uppercase' }}
                            >
                                {loading ? t('register.verifyingCode') : t('register.verifyCode')}
                            </Button>
                            <Typography align="center" className="register-text">
                                {resendTimer > 0 ? (
                                    <>{t('register.resendPrefix')}{resendTimer}{t('register.resendSuffix')}</>
                                ) : (
                                    <Button
                                        onClick={handleResendCodeClick}
                                        disabled={loading || isButtonDisabled}
                                        className="register-resend-button"
                                    >
                                        {t('register.resendCode')}
                                    </Button>
                                )}
                            </Typography>
                        </>
                    )}
                </form>
                {!isVerifying && (
                    <Typography align="center" className="register-text">
                        {t('register.alreadyAccount')}<Link component={RouterLink} to="/login">{t('register.loginLink')}</Link>
                    </Typography>
                )}
            </Paper>

            <Stack
                direction="row"
                spacing={3}
                alignItems="center"
                justifyContent="center"
            >
                <ThemeToggle />
                <LanguageSelector />
            </Stack>

            <CustomSnackbar error={error} success={null} onClose={clearError} />
        </Box>
    );
};

export default Register;