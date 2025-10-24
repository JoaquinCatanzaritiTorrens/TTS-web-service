import { TextField, Button, Box, Typography, Paper, Link, IconButton, InputAdornment, Stack } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import CustomSnackbar from '../../components/Snackbar/snackbar';
import Logo from '../../components/Header/header-components/Logo';
import ThemeToggle from '../../components/Header/header-components/ThemeToggle';
import LanguageSelector from '../../components/Header/header-components/LanguageSelector';
import useLogin from './use-login';
import { useTranslation } from 'react-i18next';
import './login.css';

const Login = () => {
  const {
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
      clearError,
    }

  } = useLogin();

  const { t } = useTranslation();

  return (
    <Box className="login-container">
      <Box className="login-logo-box">
        <Logo onLogoClick={() => window.location.assign('/')} />
      </Box>
      <Paper elevation={3} className="login-paper">
        <Typography variant="h5" align="center">{t('login.title')}</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label={t('login.email')}
            type="email"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            label={t('login.password')}
            margin="normal"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
          <Button
            variant="contained"
            type="submit"
            disabled={loading || !email || !password}
            className="login-button"
            sx={{ mt: 2, width: '100%', textTransform: 'uppercase' }}
          >
            {loading ? t('login.loading') : t('login.submit')}
          </Button>
        </form>
        <Typography align="center" className="login-text">
          {t('login.noAccount')}<Link component={RouterLink} to="/register">{t('login.registerLink')}</Link>
        </Typography>
        <CustomSnackbar error={error} success={null} onClose={clearError} />
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
    </Box>
  );
};

export default Login;