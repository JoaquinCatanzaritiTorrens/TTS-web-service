import { Box, Typography } from '@mui/material';

interface SectionTitleProps {
  icon: React.ReactNode;
  children: React.ReactNode;
}

const SectionTitle = ({ icon, children }: SectionTitleProps) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2, mt: 2 }}>
    {icon}
    <Typography variant="h5" fontWeight={700}>{children}</Typography>
  </Box>
);

export default SectionTitle;
