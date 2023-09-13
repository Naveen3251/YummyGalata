import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import LRForm from "./Form";

const LoginPage = () => {
  console.log("I am in login");
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  return (
    <Box>
      {/* app title box */}
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography
          fontWeight="bold"
          fontSize="32px"
          color="primary"
        >
          Welcome to YummyGalata!!!
        </Typography>
      </Box>
      {/* form box to get input */}
      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Login or Register
        </Typography>
        <LRForm />
       
       
      </Box>
    </Box>
  );
};

export default LoginPage;
