import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Container, Typography, Box, Grid } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Logo from '../components/logo';
// import Iconify from '../components/iconify';
// sections
import { LoginForm } from '../sections/auth/login';

// ----------------------------------------------------------------------

// const StyledRoot = styled("div")(({ theme }) => ({
//   [theme.breakpoints.up("md")]: {
//     display: "flex",
//   },
// }));

// const StyledSection = styled("div")(({ theme }) => ({
//   height: '100vh',
//   width: '100%',
//   backgroundSize: 'cover',
//   backgroundPosition: 'center',
//   backgroundRepeat: 'round',
//   backgroundAttachment: 'fixed',
//   margin: 'auto',
//   position: 'relative',
//   display: 'flex',
//   // maxWidth: 800,
//   flexDirection: "row",
//   // justifyContent: "center",
//   // boxShadow: theme.customShadows.card,
//   // backgroundColor: theme.palette.background.default,
// }));

// const StyledContent = styled("div")(({ theme }) => ({
//   maxWidth: 400,
//   // margin: "auto",
//   minHeight: "100vh",
//   display: "flex",
//   justifyContent: "center",
//   flexDirection: "column",
//   // padding: theme.spacing(12, 0),
// }));

// ----------------------------------------------------------------------

export default function LoginPage() {
  // const mdUp = useResponsive("up", "md");

  const myStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    width: '100%',
    backgroundImage: "url('/assets/images/covers/BackgroundImage.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'round',
    backgroundAttachment: 'fixed',
    margin: 'auto',
    position: 'relative',
  };

  const textBlock = {
    display: 'block',
    overflow: 'hidden',
    position: 'fixed',
    alignSelf: 'center',
    alignItems: 'center',
    right: '170px',
    justifyContent: 'center',
  };

  return (
    <div
      style={{
        height: '100vh',
        width: '100%',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'round',
        backgroundAttachment: 'fixed',
        margin: 'auto',
        position: 'relative',
        display: 'flex',
      }}
    >
      <img src={'/assets/images/covers/BackgroundImage.jpg'} alt="text" style={myStyle} />
      {/* <Grid container>
        <Grid item xs={12} sm={6} style={{ backgroundColor: 'blue' }}>
          <Typography>Hi</Typography>
        </Grid>
        <Grid item xs={12} sm={6} style={{ backgroundColor: 'white' }}>
          <Typography>Hi</Typography>
        </Grid>
      </Grid> */}
      <div style={textBlock}>
        <LoginForm />
      </div>
    </div>
  );

  // return (
  //   <>
  //     <Helmet>
  //       <title> Login | Bagic Partners</title>
  //     </Helmet>

  //     <StyledRoot>
  //       {mdUp && (
  //         <StyledSection
  //           sx={{
  //             paddingLeft: "25px",
  //           }}
  //         >
  //           <br />
  //           <img
  //             src={"/assets/images/covers/BackgroundImage.jpg"}
  //             alt="text"
  //             style={myStyle}
  //           />
  //           <div>
  //             <Typography
  //               variant="h4"
  //               gutterBottom
  //               sx={{ px: 20, mt: 10, mb: 5, color: "#0072bc" }}
  //             >
  //               Sign in
  //             </Typography>

  //             <LoginForm />
  //           </div>

  //         </StyledSection>
  //       )}

  //       {/* <Container maxWidth="sm">
  //         <StyledContent>
  //           <Typography
  //             variant="h4"
  //             gutterBottom
  //             sx={{ px: 20, mt: 10, mb: 5, color: "#0072bc" }}
  //           >
  //             Sign in
  //           </Typography>

  //           <LoginForm />
  //         </StyledContent>
  //       </Container> */}
  //     </StyledRoot>
  //   </>
  // );
}
