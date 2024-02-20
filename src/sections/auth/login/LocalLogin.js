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

export default function LoginForm() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [userName, setUsername] = useState('');
  const [passWord, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [updatedUser, setUpdatedUser] = useState('');
  const [userProfile, setUserProfile] = useState();

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  console.log('initial username', updatedUser);

  const handleClick = () => {
    // const newUsername = userName.split("@")
    // console.log("Updated username", newUsername)
    // const splitedUsername = newUsername[0]
    // const appendedTxt = "@bajajallianz.co.in"
    // const updatedUsername = `${splitedUsername}${appendedTxt}`
    // console.log("Updated username ===", `${splitedUsername}${appendedTxt}`)
    // console.log("Updated ====> ", newstr);
    // console.log("before username", updatedUser)

    // if (userName.includes('@bajajallianz')) {
    //   console.log('BLOCK If=====>', userName);
    //   const newUsername = userName.split('@');
    //   console.log('Updated username', newUsername);
    //   const splitedUsername = newUsername[0];
    //   const appendedTxt = '@bajajallianz.co.in';
    //   const updatedUsername = `${splitedUsername}${appendedTxt}`;
    //   setUpdatedUser(updatedUsername);
    //   console.log('UserName 3====', updatedUsername);
    // } else {
    //   console.log('BLOCK ELSE=====>', userName);
    //   setUpdatedUser(userName);
    // }
    // console.log("after username", updatedUser)

    const loginRequest = {
      // username: 'mandar.pathak@bajajallianz.co.in',
      // username: 'ravi.kumar044@bajajallianz.co.in',
      username: 'pooja.rebba@bajajallianz.co.in',
      // username: 'rajhans.gavali@bajajallianz.co.in',
      password: 'password',
    };

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
              navigate('/EmpManagmentTL');
            } else if (LoginResponse?.data?.[0]?.userProfile === 'BAGIC_SM') {
              console.log('INSIDE LENGTH BAGIC SM');
              navigate('/EmpManagmentSM');
            } else if (LoginResponse?.data?.[0]?.userProfile === 'BAGIC_ITS') {
              navigate('/EmployeesITS');
            }
             else if (USERDETAILS?.[0]?.userProfile === 'BAGIC_PRESIDENT') {
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
  };
  // navigate('/dashboard', { replace: true });
  // };
  console.log('UN', updatedUser);
  return (
    <>
      <Stack spacing={2}>
        <img
          src={'/assets/images/covers/HRLogo.svg'}
          alt="text"
          style={{
            height: '80%',
            width: '80%',
            paddingLeft: '10%',
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
        <TextField
          required
          name="userName"
          id="userName"
          label="Username"
          onChange={(e) => handleUsername(e)}
          sx={{
            width: 300,
            backgroundColor: 'white',
            display: 'none',
          }}
        />

        <TextField
          sx={{
            width: 300,
            backgroundColor: 'white',
            display: 'none',
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
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        {/* <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link> */}
      </Stack>
      <Stack direction="row" alignItems="center" justifyContent="center" spacing={5} sx={{ my: 2 }}>
        <LoadingButton
          // fullWidth
          size="large"
          type="submit"
          variant="contained"
          onClick={handleClick}
        >
          Domain Login
        </LoadingButton>
      </Stack>
    </>
  );
}
