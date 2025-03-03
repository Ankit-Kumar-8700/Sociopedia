import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Navbar from "./navbar";
import ProfileForm from "../components/profileForm";

const UpdateProfile = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (
    <Box>
      <Navbar />

      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem 2rem 0 2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Update Profile
        </Typography>
        <ProfileForm />
      </Box>
    </Box>
  );
};

export default UpdateProfile;