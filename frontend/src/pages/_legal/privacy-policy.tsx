import { Container, Typography } from "@mui/material";
import './legal.css';

const PrivacyPolicy = () => {
    return (
        <Container className="legal-container">
            <Typography variant="h4" gutterBottom>
                Privacy Policy
            </Typography>
            <Typography paragraph>
                Your privacy is important to us. This website and its associated projects may collect personal information such as your name, email address, and login credentials for the purpose of authentication, communication, and improving our services.
            </Typography>
            <Typography paragraph>
                Data is collected via forms, cookies, and third-party tools like analytics. We will never sell your data to third parties.
            </Typography>
            <Typography paragraph>
                By using our services, you agree to the collection and use of information in accordance with this policy. You have the right to access, modify, or delete your data by contacting us.
            </Typography>
            <Typography paragraph>
                This policy may be updated periodically. Please review it regularly.
            </Typography>
        </Container>
    );
};

export default PrivacyPolicy;
