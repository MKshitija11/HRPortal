import { Helmet } from 'react-helmet-async';
import React, { useState, useEffect } from 'react';
import * as Msal from 'msal';
import { useMsal } from '@azure/msal-react';
import { useLocation, useNavigate } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Container } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Background from '../Images/Background.png';
import { LoginForm } from '../sections/auth/login';
import UserLoginPage from './UserLoginPage';
import EmployeeBoardingProcess from '../Images/EmployeeBoardingProcess.png';
// import LogoutPage from 'src/sections/auth/login/LogoutPage';
import LogoutPage from '../sections/auth/login/LogoutPage';

// ----------------------------------------------------------------------
const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 400,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));
// ----------------------------------------------------------------------

const msalConfig = {
  auth: {
    clientId: 'd6398271-9fe8-4c3b-b928-1fb7dcb413bf',
    authority: 'https://login.microsoftonline.com/46e36785-1a8f-46f4-9641-40872ab8ee0f/',

    // production redirect uri
    redirectUri: 'https://ithrportal.bajajallianz.com',
  },
};
const msalInstance = new Msal.UserAgentApplication(msalConfig);

export default function LoginPage() {
  const logo = true;
  const { instance } = useMsal();

  const [userLogin, setUserLogin] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  console.log('LOCATION', location);
  window.localStorage.setItem('LOGO', JSON.stringify(logo));
  const mdUp = useResponsive('up', 'md');

  const backgroundStyleTwo = {
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    width: '100%',
    height: '100vh',
    display: 'flex',
    border: 'none',
    overflow: 'hidden',
    position: 'relative',
    zIndex: 2, // Set a higher zIndex to layer on top of backgroundStyle
  };

  const backgroundStyle = {
    width: '100%', // Change to viewport width
    height: '100%', // Change to viewport height
    objectFit: 'cover',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 1, // Set zIndex for stacking order
  };

  const imageStyle = {
    width: '97%',
    height: '100%',
    maxHeight: '100%',
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
          response.idToken.claims.email = response.idToken.claims.preferred_username;

          const userNameSso = response.idToken.claims.preferred_username.toLowerCase();
          console.log('userNameSso', userNameSso);
          const newUsername = userNameSso.split('@');

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
        });
    } catch (err) {
      console.log('catch err', err);
    }
  };

  // return (
  //   <div
  //     style={{
  //       height: '100vh',
  //       width: '100%',
  //       backgroundSize: 'cover',
  //       backgroundPosition: 'center',
  //       backgroundRepeat: 'round',
  //       backgroundAttachment: 'fixed',
  //       margin: 'auto',
  //       position: 'relative',
  //       display: 'flex',
  //     }}
  //   >
  //     <img src={'/assets/images/covers/BackgroundImage.jpg'} alt="text" style={myStyle} />

  //     <div style={textBlock}>
  //       {/* <LoginForm /> */}
  //       {userLogin ? <UserLoginPage /> : <LoginForm />}
  //     </div>
  //   </div>
  // );

  return (
    <>
      <Helmet>
        <title>HR Portal | Login</title>
      </Helmet>
      <StyledRoot>
        {mdUp && (
          <div className="loginForm" style={backgroundStyleTwo}>
            <img src={EmployeeBoardingProcess} alt="Your SVG" style={imageStyle} />
          </div>
        )}

        {/* <Container maxWidth="sm">
          <StyledContent>
            <img src={Background} alt="Pattern" style={backgroundStyle} />
            {location?.state?.param ? <LogoutPage /> : userLogin ? <UserLoginPage /> : <LoginForm />}
          
          </StyledContent>
        </Container>
        {location?.state?.partnerLogin ? <UserLoginPage /> : location?.state?.domainLogin ? <LoginForm /> : null} */}

        <Container maxWidth="sm">
          <StyledContent>
            <img src={Background} alt="Pattern" style={backgroundStyle} />
            {location?.state?.param ? (
              <LogoutPage />
            ) : location?.state?.partnerLogin ? (
              <UserLoginPage />
            ) : location?.state?.domainLogin ? (
              <LoginForm />
            ) : userLogin ? (
              <UserLoginPage />
            ) : (
              <LoginForm />
            )}
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
