import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';

const FooterSkeleton = () => (
    <Box sx={{ p: { xs: 2, sm: 4 }, textAlign: 'center' }}>
        <Skeleton
            variant="text"
            sx={{
                width: "100%",
                height: 70,
                mx: 'auto',
            }}
        />
    </Box>
);

export default FooterSkeleton;
