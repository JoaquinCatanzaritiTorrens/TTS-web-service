import { Container, Typography } from "@mui/material";
import './legal.css';

const TermsOfService = () => {
    return (
        <Container className="legal-container">
            <Typography variant="h4" gutterBottom>
                Terms of Service
            </Typography>
            <Typography paragraph>
                By accessing or using this website and its related projects, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.
            </Typography>
            <Typography paragraph>
                You are responsible for any activity that occurs under your login credentials. Do not share your password with others.
            </Typography>
            <Typography paragraph>
                We reserve the right to modify or discontinue any service at any time without prior notice.
            </Typography>
            <Typography paragraph>
                Misuse of the service, including attempts to access unauthorized data or disrupt service functionality, may result in suspension or termination of access.
            </Typography>
            <Typography paragraph>
                These terms may be updated occasionally. Continued use implies acceptance of the changes.
            </Typography>
        </Container>
    );
};

export default TermsOfService;
