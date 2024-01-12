import { Helmet } from 'react-helmet-async';
import React, { useState, useEffect } from 'react';
import * as Msal from 'msal';
import { useMsal } from '@azure/msal-react';

import { useLocation, useNavigate } from 'react-router-dom';

// @mui
import { styled } from '@mui/material/styles';
import { Container, Typography, Box, Grid } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';

import { LoginForm } from '../sections/auth/login';
import UserLoginPage from './UserLoginPage';

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

const msalConfig = {
  auth: {
    clientId: 'd6398271-9fe8-4c3b-b928-1fb7dcb413bf',
    authority: 'https://login.microsoftonline.com/46e36785-1a8f-46f4-9641-40872ab8ee0f/',

    // production redirect uri
    redirectUri: 'https://ithrportal.bajajallianz.com',

    // local redirect uri
    // redirectUri: 'http://localhost:3000/',
  },
};
const msalInstance = new Msal.UserAgentApplication(msalConfig);

export default function LoginPage() {
  // const mdUp = useResponsive("up", "md");
  const { instance } = useMsal();
  const [userLogin, setUserLogin] = useState(false);
  const location = useLocation();
  const navigate = useNavigate()
  console.log('LOCATION', location);

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

  useEffect(() => {
    BagicSso();
    console.log('inside useEffect from login page>>');
  }, []);

  const BagicSso = (e) => {
    const loginRequest = {
      scopes: ['user.read'],
    };
    console.log('start', loginRequest);
    try {
      msalInstance
        .loginPopup(loginRequest)
        .then((response) => {
          console.log('response', response);
          // console.log('email', response.idToken.claims
          // );
          response.idToken.claims.email = response.idToken.claims.preferred_username;
          const userNameSso = response.idToken.claims.preferred_username.toLowerCase();
          console.log('userNameSso', userNameSso);

          const newUsername = userNameSso.split('@');
          console.log('Updated username', newUsername);
          const splitedUsername = newUsername[0];
          const appendedTxt = '@bajajallianz.co.in';
          const updatedUsername = `${splitedUsername}${appendedTxt}`;
          console.log('Updated username ===', `${splitedUsername}${appendedTxt}`);

          const login = {
            username: updatedUsername,
          };

          localStorage.setItem('userName', userNameSso);
          localStorage.setItem('userName', userNameSso);
        })
        .catch((err) => {
          console.log('err', err);
          // if bagic sso fails
          setUserLogin(true);
          console.log('from first catch from login page>>>>>>>>>>>>');
          // navigate('/login',{ state: { userLogin: true } })
          // navigate('/UserLoginPage')
        });
    } catch (err) {
      console.log('catch err', err);
    }
  };

  const handleUserLogin = () => {
    // eslint-disable-next-line no-unused-expressions
    <UserLoginPage/> 
  }

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

      <div style={textBlock}>
       
        {userLogin ? <UserLoginPage /> : <LoginForm />}
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
