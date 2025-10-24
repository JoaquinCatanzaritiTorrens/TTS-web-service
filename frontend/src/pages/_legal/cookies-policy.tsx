import { Container, Typography } from "@mui/material";
import './legal.css';

const CookiesPolicy = () => {
    return (
        <Container className="legal-container">
            <Typography variant="h4" gutterBottom>
                Cookies Policy
            </Typography>
            <Typography paragraph>
                We use cookies and similar tracking technologies to enhance your browsing experience, analyze traffic, and provide personalized content.
            </Typography>
            <Typography paragraph>
                By using this website, you consent to the use of cookies. You may choose to disable cookies through your browser settings, but some features of the site may not function properly.
            </Typography>
            <Typography paragraph>
                Cookies are used for login sessions, preferences, and analytics. Third-party services may also set cookies on your device.
            </Typography>
            <Typography paragraph>
                You can manage or revoke cookie consent at any time by clearing cookies in your browser.
            </Typography>
        </Container>
    );
};

export default CookiesPolicy;
