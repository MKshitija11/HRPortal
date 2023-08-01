import { Helmet } from "react-helmet-async";
import { Link as RouterLink } from "react-router-dom";
// @mui
import { styled } from "@mui/material/styles";
import { Button, Typography, Container, Box } from "@mui/material";

// ----------------------------------------------------------------------

const StyledContent = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Page401() {
  return (
    <>
      <Helmet>
        <title> HR Portal | Un-Authorized </title>
      </Helmet>

      <Container>
        <StyledContent sx={{ textAlign: "center", alignItems: "center" }}>
          <Typography variant="h3" paragraph>
            Sorry, You are not Authorized!
          </Typography>

          <Typography sx={{ color: "text.secondary" }}>
            Sorry, we couldn’t serve you the page you’re looking for. Perhaps
            you’re un-authorized person to access this page, Be sure to check
            with IT for the access.
          </Typography>

          <Box
            component="img"
            src="/assets/illustrations/error_401.png"
            sx={{ height: 205, mx: "auto", my: { xs: 5, sm: 10 } }}
          />

          <Button
            to="/"
            size="large"
            variant="contained"
            component={RouterLink}
          >
            Logout
          </Button>
        </StyledContent>
      </Container>
    </>
  );
}
