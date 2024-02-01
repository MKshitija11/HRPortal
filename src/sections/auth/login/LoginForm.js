import { useEffect, useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
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
import { useTheme } from '@mui/material/styles';
import * as Msal from 'msal';
import { useMsal } from '@azure/msal-react';
import Card from '../../../Images/Card.png';
import Configuration from '../../../utils/Configuration';
import Iconify from '../../../components/iconify/Iconify';

//----------------------------------------------------------------

const container = {
  position: 'relative',
  textAlign: 'center',
  zIndex: 1,
};

const bottomLeft = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  textAlign: 'center',
};

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
  const [errorMessage, setErrorMessage] = useState('');
  const { instance } = useMsal();

  useEffect(() => {
    // sessionStorage.clear();
    // localStorage.clear();
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

          response.idToken.claims.email = response.idToken.claims.preferred_username;
          const userNameSso = response?.idToken?.claims?.preferred_username.toLowerCase();
          console.log('userNameSso', userNameSso);
          const newUsername = userNameSso.split('@');
          console.log('Updated username', newUsername);
          const splitedUsername = newUsername[0];
          const appendedTxt = '@bajajallianz.co.in';
          const updatedUsername = `${splitedUsername}${appendedTxt}`;

          console.log('Updated username ===', `${splitedUsername}${appendedTxt}`);

          console.log('username>>>>', updatedUsername);
          const login = {
            username: updatedUsername,
          };

          localStorage.setItem('userName', userNameSso);
          localStorage.setItem('userName', userNameSso);

          Configuration.login(login)
            .then((LoginResponse) => {
              if (LoginResponse?.data[0]?.errorCode === '1') {
                setOpen(true);
                setErrorMessage(LoginResponse?.data?.[0]?.errorDesc);
              } else if (LoginResponse?.data[0]?.errorCode === '0') {
                if (LoginResponse.data.length === 2) {
                  navigate('/SwitchRole');
                } else if (LoginResponse.data.length === 1) {
                  if (LoginResponse?.data?.[0]?.userProfile === 'BAGIC_ADMIN') {
                    navigate('/Dashboard');
                  } else if (LoginResponse?.data?.[0]?.userProfile === 'BAGIC_PARTNER') {
                    navigate('/EmployeesBP');
                  } else if (LoginResponse?.data?.[0]?.userProfile === 'BAGIC_TL') {
                    navigate('/EmpManagmentTL');
                  } else if (LoginResponse?.data?.[0]?.userProfile === 'BAGIC_SM') {
                    console.log('INSIDE LENGTH BAGIC SM');
                    navigate('/EmpManagmentSM');
                  } else if (LoginResponse?.data?.[0]?.userProfile === 'BAGIC_ITS') {
                    navigate('/Dashboard');
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
                } else if (LoginResponse.data.length === 0) {
                  setOpen(true);
                  setErrorMessage('This email id is not configured');
                  console.log('INSIDE LENGTH ELSE  ', LoginResponse.data.length);
                }
              } else {
                console.log('INSIDE LENGTH ELSE ');
                setErrorMessage(LoginResponse?.data?.[0]?.errorDesc);
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

  return (
    <>
      <Stack style={container}>
        <img src={Card} alt="Snow" style={{ width: '100%', height: '100%' }} />
        <Stack style={bottomLeft} mt={3}>
          <Typography variant="h4" style={{ fontSize: '20px', color: '#0066C7' }}>
            Sign-In to HR Portal
          </Typography>
          <Stack mt={3}>
            <LoadingButton size="large" type="submit" variant="contained" onClick={BagicSso}>
              Domain Login
            </LoadingButton>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}



