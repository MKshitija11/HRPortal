import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
// @mui
import {
  Stack,
  IconButton,
  InputAdornment,
  TextField,
  Alert,
  // Link,
  Typography,
  Collapse,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import * as Msal from 'msal';
import { useMsal } from '@azure/msal-react';

import Configuration from '../../../utils/Configuration';

import Iconify from '../../../components/iconify';

// ---------------------------------------------------------------------

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

// ----------------------------PRODUCTION------------------------------------------

export default function LoginForm(props) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [userName, setUsername] = useState('');
  const [passWord, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { instance } = useMsal();

  useEffect(() => {
    BagicSso();
    console.log('inside useEffect >>');
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
          Configuration.login(loginRequest)
            .then((LoginResponse) => {
              if (LoginResponse) {
                console.log('INSIDE LENGTH  IF ', LoginResponse.data.length);
                if (LoginResponse.data.length === 2) {
                  navigate('/SwitchRole');
                } else if (LoginResponse.data.length === 1) {
                  console.log('INSIDE LENGTH ELSE IF ', LoginResponse.data);

                  if (LoginResponse?.data?.[0]?.userProfile === 'BAGIC_ADMIN') {
                    navigate('/Dashboard');
                  } else if (LoginResponse?.data?.[0]?.userProfile === 'BAGIC_PARTNER') {
                    navigate('/EmployeesBP');
                  } else if (LoginResponse?.data?.[0]?.userProfile === 'BAGIC_TL') {
                    navigate('/EmployeesTL');
                  } else if (LoginResponse?.data?.[0]?.userProfile === 'BAGIC_SM') {
                    console.log('INSIDE LENGTH BAGIC SM');
                    navigate('/EmployeesSM');
                  } else if (LoginResponse?.data?.[0]?.userProfile === 'BAGIC_ITS') {
                    navigate('/EmployeesITS');
                  }
                }
                let USERDETAILS = {};
                USERDETAILS = JSON.stringify(LoginResponse.data);
                if (USERDETAILS != null) {
                  sessionStorage.setItem('USERDETAILS', USERDETAILS);
                }

                Configuration.getReportingList().then((RAResponse) => {
                  console.log('LoginForm.getReportingList.LoginResponse', RAResponse.data);
                  let REPORTINGDETAILS = [];
                  REPORTINGDETAILS = JSON.stringify(RAResponse.data);
                  sessionStorage.setItem('REPORTINGDETAILS', REPORTINGDETAILS);
                });
              } else {
                console.log('INSIDE LENGTH ELSE ');
                setErrorMessage(LoginResponse.data.errorDesc);
                setOpen(true);
              }
            })
            .catch((error) => alert('Something went wrong!!'));
        })
        .catch((err) => {
          console.log('err', err);
        });
    } catch (err) {
      console.log('catch err', err);
    }
  };

  useEffect(() => {
    sessionStorage.clear();
    console.log('Session Cleared!');
  }, []);

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleClick = () => {
    const loginRequest = {
      username: userName,
      password: passWord,
    };

    if (userName === '') {
      setErrorMessage('Please enter username!');
      setOpen(true);
    } else if (passWord === '') {
      setErrorMessage('Please enter password!');
      setOpen(true);
    } else {
      Configuration.login(loginRequest)
        .then((LoginResponse) => {
          if (LoginResponse) {
            console.log('INSIDE LENGTH  IF ', LoginResponse.data.length);
            if (LoginResponse.data.length === 2) {
              navigate('/SwitchRole');
            } else if (LoginResponse.data.length === 1) {
              console.log('INSIDE LENGTH ELSE IF ', LoginResponse.data);

              if (LoginResponse?.data?.[0]?.userProfile === 'BAGIC_ADMIN') {
                navigate('/Dashboard');
              } else if (LoginResponse?.data?.[0]?.userProfile === 'BAGIC_PARTNER') {
                navigate('/EmployeesBP');
              } else if (LoginResponse?.data?.[0]?.userProfile === 'BAGIC_TL') {
                navigate('/EmployeesTL');
              } else if (LoginResponse?.data?.[0]?.userProfile === 'BAGIC_SM') {
                console.log('INSIDE LENGTH BAGIC SM');
                navigate('/EmployeesSM');
              } else if (LoginResponse?.data?.[0]?.userProfile === 'BAGIC_ITS') {
                navigate('/EmployeesITS');
              }
            }
            let USERDETAILS = {};
            USERDETAILS = JSON.stringify(LoginResponse.data);
            if (USERDETAILS != null) {
              sessionStorage.setItem('USERDETAILS', USERDETAILS);
            }

            Configuration.getReportingList().then((RAResponse) => {
              console.log('LoginForm.getReportingList.LoginResponse', RAResponse.data);
              let REPORTINGDETAILS = [];
              REPORTINGDETAILS = JSON.stringify(RAResponse.data);
              sessionStorage.setItem('REPORTINGDETAILS', REPORTINGDETAILS);
            });
          } else {
            console.log('INSIDE LENGTH ELSE ');
            setErrorMessage(LoginResponse.data.errorDesc);
            setOpen(true);
          }
        })
        .catch((error) => alert('Something went wrong!!'));
    }
    // navigate('/dashboard', { replace: true });
  };

  return (
    <>
      <Stack sx={{ alignItems: 'center', justifyContent: 'center' }}>
        <img
          src={'/assets/images/covers/HRLogo.svg'}
          alt="text"
          style={{
            height: '80%',
            width: '80%',
            paddingLeft: '3%',
            display: 'flex',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'round',
            backgroundAttachment: 'fixed',
            margin: 'auto',
            position: 'relative',
          }}
        />
        <Collapse in={open}>
          <Alert severity="warning" variant="filled">
            {errorMessage}
          </Alert>
        </Collapse>
        {/* <TextField
          required
          name="userName"
          id="userName"
          label="Username"
          onChange={(e) => handleUsername(e)}
          sx={{
            width: 300,
            backgroundColor: 'white',
          }}
        /> */}

        {/* <TextField
          sx={{
            width: 300,
            backgroundColor: 'white',
          }}
          name="passWord"
          label="Password"
          required
          onChange={(e) => handlePassword(e)}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        /> */}
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 1 }}>
        {/* <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link> */}
      </Stack>
      <Stack direction="row" alignItems="center" justifyContent="center">
        <LoadingButton
          // fullWidth
          size="large"
          type="submit"
          variant="contained"
          // onClick={handleClick}
          onClick={BagicSso}
        >
          Domain Login
        </LoadingButton>
      </Stack>
    </>
  );
}
