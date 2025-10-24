import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

const Loader = () => {
    return (
        <Box display="flex" justifyContent="center" alignItems="center" height={400}>
            <CircularProgress />
        </Box>
    );
};
export default Loader;