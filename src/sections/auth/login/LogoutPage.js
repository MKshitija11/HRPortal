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
import UserLoginPage from '../../../pages/UserLoginPage';

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

// export default function LoginForm(props) {
//   const navigate = useNavigate();
//   const [open, setOpen] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');
//   const { instance } = useMsal();

//   useEffect(() => {
//     // sessionStorage.clear();
//     // localStorage.clear();
//     BagicSso();
//     console.log('inside useEffect >>');
//   }, []);

//   const BagicSso = (e) => {
//     const loginRequest = {
//       scopes: ['user.read'],
//     };
//     console.log('start', loginRequest);

//     try {
//       msalInstance
//         .loginPopup(loginRequest)
//         .then((response) => {
//           console.log('response', response);

//           response.idToken.claims.email = response.idToken.claims.preferred_username;
//           const userNameSso = response?.idToken?.claims?.preferred_username.toLowerCase();
//           console.log('userNameSso', userNameSso);
//           const newUsername = userNameSso.split('@');
//           console.log('Updated username', newUsername);
//           const splitedUsername = newUsername[0];
//           const appendedTxt = '@bajajallianz.co.in';
//           const updatedUsername = `${splitedUsername}${appendedTxt}`;

//           console.log('Updated username ===', `${splitedUsername}${appendedTxt}`);

//           console.log('username>>>>', updatedUsername);
//           const login = {
//             username: updatedUsername,
//           };

//           localStorage.setItem('userName', userNameSso);
//           localStorage.setItem('userName', userNameSso);

//           Configuration.login(login)
//             .then((LoginResponse) => {
//               if (LoginResponse?.data[0]?.errorCode === '1') {
//                 setOpen(true);
//                 setErrorMessage(LoginResponse?.data?.[0]?.errorDesc);
//               } else if (LoginResponse?.data[0]?.errorCode === '0') {
//                 if (LoginResponse.data.length === 2) {
//                   navigate('/SwitchRole');

//                   let USERDETAILS = {};
//                   USERDETAILS = JSON.stringify(LoginResponse?.data);
//                   if (USERDETAILS != null) {
//                     sessionStorage.setItem('USERDETAILS', USERDETAILS);
//                   }
//                   console.log('userdetails from login form', USERDETAILS);
//                   Configuration.getReportingList().then((RAResponse) => {
//                     console.log('LoginForm.getReportingList.LoginResponse', RAResponse.data);
//                     let REPORTINGDETAILS = [];
//                     REPORTINGDETAILS = JSON.stringify(RAResponse.data);
//                     sessionStorage.setItem('REPORTINGDETAILS', REPORTINGDETAILS);
//                   });
//                 } else if (LoginResponse.data.length === 1) {
//                   if (LoginResponse?.data?.[0]?.userProfile === 'BAGIC_ADMIN') {
//                     navigate('/Dashboard');
//                   } else if (LoginResponse?.data?.[0]?.userProfile === 'BAGIC_PARTNER') {
//                     navigate('/EmployeesBP');
//                   } else if (LoginResponse?.data?.[0]?.userProfile === 'BAGIC_TL') {
//                     navigate('/EmpManagmentTL');
//                   } else if (LoginResponse?.data?.[0]?.userProfile === 'BAGIC_SM') {
//                     console.log('INSIDE LENGTH BAGIC SM');
//                     navigate('/EmpManagmentSM');
//                   } else if (LoginResponse?.data?.[0]?.userProfile === 'BAGIC_ITS') {
//                     navigate('/Dashboard');
//                   }  else if (LoginResponse?.data?.[0]?.userProfile === 'BAGIC_PRESIDENT') {
//                     navigate('/Dashboard');
//                   }

//                   let USERDETAILS = {};
//                   USERDETAILS = JSON.stringify(LoginResponse.data);
//                   if (USERDETAILS != null) {
//                     sessionStorage.setItem('USERDETAILS', USERDETAILS);
//                     sessionStorage.setItem('ROLE', LoginResponse?.data?.[0]?.userProfile);
//                   }

//                   Configuration.getReportingList().then((RAResponse) => {
//                     console.log('LoginForm.getReportingList.LoginResponse', RAResponse.data);
//                     let REPORTINGDETAILS = [];
//                     REPORTINGDETAILS = JSON.stringify(RAResponse.data);
//                     sessionStorage.setItem('REPORTINGDETAILS', REPORTINGDETAILS);
//                   });
//                 } else if (LoginResponse.data.length === 0) {
//                   setOpen(true);
//                   setErrorMessage('This email id is not configured');
//                   console.log('INSIDE LENGTH ELSE  ', LoginResponse.data.length);
//                 }
//               } else {
//                 console.log('INSIDE LENGTH ELSE ');
//                 setErrorMessage(LoginResponse?.data?.[0]?.errorDesc);
//                 setOpen(true);
//               }
//             })
//             .catch((error) => alert('Something went wrong!!'));
//         })
//         .catch((err) => {
//           console.log('err', err);
//         });
//     } catch (err) {
//       console.log('catch err', err);
//     }
//   };

//   return (
//     <>
//       <Stack style={container}>
//         <img src={Card} alt="Snow" style={{ width: '100%', height: '100%' }} />
//         <Stack style={bottomLeft} mt={3}>
//           <Typography variant="h4" style={{ fontSize: '20px', color: '#0066C7' }}>
//             Sign-In to HR Portal
//           </Typography>
//           <Stack mt={3}>
//             <LoadingButton size="large" type="submit" variant="contained" onClick={BagicSso}>
//               Domain Login
//             </LoadingButton>
//           </Stack>
//         </Stack>
//       </Stack>
//     </>
//   );
// }
// ----------------------------------------------------------------------------------------
export default function LogoutPage() {
  const theme = useTheme();
  const navigate = useNavigate();
  // const classes = buttonStyles();
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

  useEffect(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

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
    const userNameSso = 'sandipan.chakraborty@bajajallianz.co.in';
    const loginRequest = {
      // username: 'mandar.pathak@bajajallianz.co.in',
      // username: 'dilip.kodwani@bajajallianz.co.in',
      // username: 'jaldip.katre@bajajallianz.co.in',
      username: 'ravi.kumar044@bajajallianz.co.in',
      // username: 'kshitija.madhekar@pinnacle.com',
      // username: 'mohmadmujtaba.asmi@bajajallianz.co.in',
      // username: 'mohmad.asmi@bajajallianz.co.in',
      // username: 'sanjaykumar.roy@bajajallianz.co.in',
      // username: 'kshitija.madhekar@pinnacle.com',
      // username: 'hrd2@apmosys.com',
      // username:'tanmay.mathur01@bajajallianz.co.in',
      // username: 'gourisankar.sahu@bajajallianz.co.in',
      // username: 'pinki.dutta@bajajallianz.co.in',
      // username: 'sarath.am@bajajallianz.co.in',
      // username: 'dharmesh.chauhan01@bajajallianz.co.in',
      // username: 'pooja.rebba@bajajallianz.co.in',
      // username: 'rajhans.gavali@bajajallianz.co.in',
      // username: 'rajhans.gavali@cloverinfotech.com',
      // username: 'niranjan.rote@bajajallianz.co.in',
      // username: 'kshitija.madhekar@pinnacle.com',
      // username: 'deepali.kalapure@bajajallianz.co.in',
      // username: 'kavya.gogi@bajajallianz.co.in',
      // username: 'ganesh.chopade@bajajallianz.co.in',
      // username: 'avinash.naik@bajajallianz.co.in',
      // username: 'sandipan.chakraborty@bajajallianz.co.in',
      password: 'password',
    };

    // Configuration.login(loginRequest)
    //   .then((LoginResponse) => {
    //     if (LoginResponse) {
    //       console.log('INSIDE LENGTH  IF ', LoginResponse.data.length);
    //       if (LoginResponse.data.length === 2) {
    //         navigate('/SwitchRole');
    //       } else if (LoginResponse.data.length === 1) {
    //         console.log('INSIDE LENGTH ELSE IF ', LoginResponse.data);
    //         if (LoginResponse?.data?.[0]?.userProfile === 'BAGIC_ADMIN') {
    //           navigate('/Dashboard');
    //         } else if (LoginResponse?.data?.[0]?.userProfile === 'BAGIC_PARTNER') {
    //           navigate('/EmployeesBP');
    //         } else if (LoginResponse?.data?.[0]?.userProfile === 'BAGIC_TL') {
    //           navigate('/EmpManagmentTL');
    //         } else if (LoginResponse?.data?.[0]?.userProfile === 'BAGIC_SM') {
    //           console.log('INSIDE LENGTH BAGIC SM');
    //           navigate('/EmpManagmentSM');
    //         } else if (LoginResponse?.data?.[0]?.userProfile === 'BAGIC_ITS') {
    //           navigate('/Dashboard');
    //         }
    //       } else if (LoginResponse.data.length === 0) {
    //         setOpen(true);
    //         setErrorMessage('This email id is not configured');
    //         console.log('INSIDE LENGTH ELSE  ', LoginResponse.data.length);
    //       }
    //       let USERDETAILS = {};
    //       USERDETAILS = JSON.stringify(LoginResponse.data);
    //       if (USERDETAILS != null) {
    //         sessionStorage.setItem('USERDETAILS', USERDETAILS);
    //       }

    //       Configuration.getReportingList().then((RAResponse) => {
    //         console.log('LoginForm.getReportingList.LoginResponse', RAResponse.data);
    //         let REPORTINGDETAILS = [];
    //         REPORTINGDETAILS = JSON.stringify(RAResponse.data);
    //         sessionStorage.setItem('REPORTINGDETAILS', REPORTINGDETAILS);
    //       });
    //     } else {
    //       console.log('INSIDE LENGTH ELSE ');
    //       setErrorMessage(LoginResponse.data.errorDesc);
    //       setOpen(true);
    //     }
    //   })
    //   .catch((error) => alert('Something went wrong!!'));

    localStorage.setItem('userName', userNameSso);
    sessionStorage.setItem('userName', userNameSso);

    Configuration.login(loginRequest)
      .then((LoginResponse) => {
        console.log('LOGIN RESONSE>>> loginform', LoginResponse.data.length);
        if (LoginResponse?.data[0]?.errorCode === '1') {
          setOpen(true);
          setErrorMessage(LoginResponse?.data?.[0]?.errorDesc);
        } else if (LoginResponse?.data[0]?.errorCode === '0') {
          if (LoginResponse.data.length === 2) {
            navigate('/SwitchRole');
            let USERDETAILS = {};
            USERDETAILS = JSON.stringify(LoginResponse?.data);
            if (USERDETAILS != null) {
              sessionStorage.setItem('USERDETAILS', USERDETAILS);
            }
            console.log('userdetails from login form', USERDETAILS);
            Configuration.getReportingList().then((RAResponse) => {
              console.log('LoginForm.getReportingList.LoginResponse', RAResponse.data);
              let REPORTINGDETAILS = [];
              REPORTINGDETAILS = JSON.stringify(RAResponse.data);
              sessionStorage.setItem('REPORTINGDETAILS', REPORTINGDETAILS);
            });
          } else if (LoginResponse.data.length === 1) {
            if (LoginResponse?.data?.[0]?.userProfile === 'BAGIC_ADMIN') {
              navigate('/Dashboard');
            } else if (LoginResponse?.data?.[0]?.userProfile === 'BAGIC_PARTNER') {
              navigate('/EmployeesBP');
            } else if (LoginResponse?.data?.[0]?.userProfile === 'BAGIC_TL') {
              navigate('/EmpManagmentTL');
            } else if (LoginResponse?.data?.[0]?.userProfile === 'BAGIC_SM') {
              navigate('/EmpManagmentSM');
            } else if (LoginResponse?.data?.[0]?.userProfile === 'BAGIC_ITS') {
              navigate('/Dashboard');
            } else if (LoginResponse?.data?.[0]?.userProfile === 'BAGIC_PRESIDENT') {
              navigate('/Dashboard');
            }

            let USERDETAILS = {};
            USERDETAILS = JSON.stringify(LoginResponse?.data);
            if (USERDETAILS != null) {
              sessionStorage.setItem('USERDETAILS', USERDETAILS);
              sessionStorage.setItem('ROLE', LoginResponse?.data?.[0]?.userProfile);
            }
            console.log('userdetails from login form', USERDETAILS);
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
  };

  console.log('UN', updatedUser);

  const handlePartnerLogin = () => {
    console.log('Insode logout');
    // <UserLoginPage />
    navigate('/login', {
      state: {
        partnerLogin: true,
      },
    });
  };
  return (
    // <div style={imageStyle}>
    //   <Stack spacing={3}>
    //     <Collapse in={open}>
    //       <Alert severity="warning" variant="filled">
    //         {errorMessage}
    //       </Alert>
    //     </Collapse>

    //   <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
    //     {/* <Checkbox name="remember" label="Remember me" />
    //     <Link variant="subtitle2" underline="hover">
    //       Forgot password?
    //     </Link> */}
    //   </Stack>
    //   <Stack direction="row" alignItems="center" justifyContent="center" spacing={5} sx={{ my: 2 }}>
    //     <LoadingButton
    //       // fullWidth
    //       size="large"
    //       type="submit"
    //       variant="contained"
    //         // onClick={BagicSso}
    //       onClick={handleClick}
    //     >
    //       Domain Login
    //     </LoadingButton>
    //     </Stack>
    //   </Stack>
    // </div>

    // <div style={container}>
    //   <img src={HRLogo}  style={{width: '50%', height: '50%'}} />
    // </div>
    <>
      {/* <Stack sx={{ alignItems: 'center', justifyContent: 'center' }}>
        <img
          src={Card}
          style={imageStyle}
          alt="text"
          // style={{
          //   height: '80%',
          //   width: '80%',
          //   paddingLeft: '3%',
          //   display: 'flex',
          //   backgroundSize: 'cover',
          //   backgroundPosition: 'center',
          //   backgroundRepeat: 'round',
          //   backgroundAttachment: 'fixed',
          //   margin: 'auto',
          //   position: 'relative',
          // }}
        />
        <Stack style={text}>
          <Typography variant="h4">HR Portal</Typography>
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="center" flexDirection={'row'} spacing={2}>
        <LoadingButton
          size="large"
          type="submit"
          variant="contained"
          // onClick={BagicSso}
        >
          Domain Login
        </LoadingButton>
      </Stack>
      </Stack> */}

      {/* <Collapse in={open}>
        <Alert severity="warning" variant="filled">
          {errorMessage}
        </Alert>
      </Collapse> */}
      <Stack style={container}>
        <img src={Card} alt="Snow" style={{ width: '100%', height: '100%' }} />
        <Stack style={bottomLeft} mt={3}>
          <Typography variant="h4" style={{ fontSize: '20px', color: '#0066C7' }}>
            Sign-In to HR Portal
          </Typography>

          <Stack mt={1} style={{ width: 280 }}>
            <Stack mb={1}>
              <Collapse in={open}>
                <Alert severity="warning" variant="filled" style={{ width: '100%' }}>
                  {errorMessage}
                </Alert>
              </Collapse>
            </Stack>
            <Stack flexDirection="row" alignItems="center" justifyContent="space-between">
              <Stack>
                {' '}
                <LoadingButton
                  // fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  // onClick={BagicSso}
                  //   onClick={navigate('/login')}
                  onClick={() => {
                    // setOpenModal(false);
                    navigate('/login', {
                      state: {
                        domainLogin: true,
                      },
                    });
                  }}
                >
                  Domain Login
                </LoadingButton>
              </Stack>
              <Stack>
                <LoadingButton
                  // fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  //   onClick={<UserLoginPage />}
                  //   onClick={handlePartnerLogin()}
                  onClick={() => {
                    // setOpenModal(false);
                    navigate('/login', {
                      state: {
                        partnerLogin: true,
                      },
                    });
                  }}
                  //   onClick={navigate('/UserLoginPage')}
                >
                  Partner Login
                </LoadingButton>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}

// _______________________________local--------------------------------------------------
// export default function LoginForm() {
//   const navigate = useNavigate();
//   const [open, setOpen] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [userName, setUsername] = useState('');
//   const [passWord, setPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const [updatedUser, setUpdatedUser] = useState('');

//   let timer;

//   const events = ['load', 'mousemove', 'click', 'scroll', 'keypress'];
//   const handleLogoutTimer = () => {
//     timer = setTimeout(() => {
//       // clears any pending timer.
//       resetTimer();
//       // Listener clean up. Removes the existing event listener from the window
//       Object.values(events).forEach((item) => {
//         window.removeEventListener(item, resetTimer);
//       });
//       // logs out user
//       logoutAction();
//     }, 1200000); // 10000ms = 10secs. You can change the time.
//   };

//   useEffect(() => {
//     Object.values(events).forEach((item) => {
//       window.addEventListener(item, () => {
//         resetTimer();
//         handleLogoutTimer();
//       });
//     });
//   }, []);

//   const logoutAction = () => {
//     localStorage.clear();
//     window.location.pathname = '/login';
//   };

//   const resetTimer = () => {
//     if (timer) clearTimeout(timer);
//   };

//   useEffect(() => {
//     sessionStorage.clear();
//     console.log('Session Cleared!');
//   }, []);

//   useEffect(() => {
//     sessionStorage.clear();
//     console.log('Session Cleared!');
//   }, []);

//   const handleUsername = (event) => {
//     setUsername(event.target.value);
//   };

//   const handlePassword = (event) => {
//     setPassword(event.target.value);
//   };
//   console.log('initial username', updatedUser);
//   const handleClick = () => {
//     // const newUsername = userName.split("@")
//     // console.log("Updated username", newUsername)
//     // const splitedUsername = newUsername[0]
//     // const appendedTxt = "@bajajallianz.co.in"
//     // const updatedUsername = `${splitedUsername}${appendedTxt}`
//     // console.log("Updated username ===", `${splitedUsername}${appendedTxt}`)
//     // console.log("Updated ====> ", newstr);
//     console.log('before username', updatedUser);

//     if (userName.includes('@bajajallianz')) {
//       console.log('BLOCK If=====>', userName);
//       const newUsername = userName.split('@');
//       console.log('Updated username', newUsername);
//       const splitedUsername = newUsername[0];
//       const appendedTxt = '@bajajallianz.co.in';
//       const updatedUsername = `${splitedUsername}${appendedTxt}`;
//       setUpdatedUser(updatedUsername);
//       console.log('UserName 3====', updatedUsername);
//     } else {
//       console.log('BLOCK ELSE=====>', userName);
//       setUpdatedUser(userName);
//     }
//     console.log('after username', updatedUser);

//     const loginRequest = {
//       username:updatedUser,
//       password: passWord,
//     };

//     console.log('username n password', loginRequest.username, loginRequest.password);

//     if (userName === '') {
//       setErrorMessage('Please enter username!');
//       setOpen(true);
//     } else if (passWord === '') {
//       setErrorMessage('Please enter password!');
//       setOpen(true);
//     } else {
//       Configuration.login(loginRequest)
//       .then((LoginResponse) => {
//         console.log('LOGIN RESONSE>>> loginform', LoginResponse.data.length);
//         if (LoginResponse?.data[0]?.errorCode === '1') {
//           setOpen(true);
//           setErrorMessage(LoginResponse?.data?.[0]?.errorDesc);
//         } else if (LoginResponse?.data[0]?.errorCode === '0') {
//           if (LoginResponse.data.length === 2) {
//             navigate('/SwitchRole');
//             let USERDETAILS = {};
//             USERDETAILS = JSON.stringify(LoginResponse?.data);
//             if (USERDETAILS != null) {
//               sessionStorage.setItem('USERDETAILS', USERDETAILS);
//             }
//             console.log('userdetails from login form', USERDETAILS);
//             Configuration.getReportingList().then((RAResponse) => {
//               console.log('LoginForm.getReportingList.LoginResponse', RAResponse.data);
//               let REPORTINGDETAILS = [];
//               REPORTINGDETAILS = JSON.stringify(RAResponse.data);
//               sessionStorage.setItem('REPORTINGDETAILS', REPORTINGDETAILS);
//             });
//           } else if (LoginResponse.data.length === 1) {
//             if (LoginResponse?.data?.[0]?.userProfile === 'BAGIC_ADMIN') {
//               navigate('/Dashboard');
//             } else if (LoginResponse?.data?.[0]?.userProfile === 'BAGIC_PARTNER') {
//               navigate('/EmployeesBP');
//             } else if (LoginResponse?.data?.[0]?.userProfile === 'BAGIC_TL') {
//               navigate('/EmpManagmentTL');
//             } else if (LoginResponse?.data?.[0]?.userProfile === 'BAGIC_SM') {
//               navigate('/EmpManagmentSM');
//             } else if (LoginResponse?.data?.[0]?.userProfile === 'BAGIC_ITS') {
//               navigate('/Dashboard');
//             }
//             else if (LoginResponse?.data?.[0]?.userProfile === 'BAGIC_PRESIDENT') {
//               navigate('/Dashboard');
//             }

//             let USERDETAILS = {};
//             USERDETAILS = JSON.stringify(LoginResponse?.data);
//             if (USERDETAILS != null) {
//               sessionStorage.setItem('USERDETAILS', USERDETAILS);
//               sessionStorage.setItem('ROLE', LoginResponse?.data?.[0]?.userProfile);
//             }
//             console.log('userdetails from login form', USERDETAILS);
//             Configuration.getReportingList().then((RAResponse) => {
//               console.log('LoginForm.getReportingList.LoginResponse', RAResponse.data);
//               let REPORTINGDETAILS = [];
//               REPORTINGDETAILS = JSON.stringify(RAResponse.data);
//               sessionStorage.setItem('REPORTINGDETAILS', REPORTINGDETAILS);
//             });
//           } else if (LoginResponse.data.length === 0) {
//             setOpen(true);
//             setErrorMessage('This email id is not configured');
//             console.log('INSIDE LENGTH ELSE  ', LoginResponse.data.length);
//           }
//         } else {
//           console.log('INSIDE LENGTH ELSE ');
//           setErrorMessage(LoginResponse?.data?.[0]?.errorDesc);
//           setOpen(true);
//         }
//       })
//       .catch((error) => alert('Something went wrong!!'));
//     }
//     // navigate('/dashboard', { replace: true });
//   };
//   console.log('UN', errorMessage);

//   return (
//     // <>
//     //   <Stack spacing={2}>
//     //     <img
//     //       src={'/assets/images/covers/HRLogo.svg'}
//     //       alt="text"
//     //       style={{
//     //         height: '80%',
//     //         width: '80%',
//     //         paddingLeft: '10%',
//     //         display: 'flex',
//     //         backgroundSize: 'cover',
//     //         backgroundPosition: 'center',
//     //         backgroundRepeat: 'round',
//     //         backgroundAttachment: 'fixed',
//     //         margin: 'auto',
//     //         position: 'relative',
//     //       }}
//     //     />
//     //     <Collapse in={open}>
//     //       <Alert severity="warning" variant="filled">
//     //         {errorMessage}
//     //       </Alert>
//     //     </Collapse>
//     //     <TextField
//     //       required
//     //       name="userName"
//     //       id="userName"
//     //       label="Username"
//     //       onChange={(e) => handleUsername(e)}
//     //       sx={{
//     //         width: 300,
//     //         backgroundColor: 'white',
//     //       }}
//     //     />

//     //     <TextField
//     //       sx={{
//     //         width: 300,
//     //         backgroundColor: 'white',
//     //       }}
//     //       name="passWord"
//     //       label="Password"
//     //       required
//     //       onChange={(e) => handlePassword(e)}
//     //       type={showPassword ? 'text' : 'password'}
//     //       InputProps={{
//     //         endAdornment: (
//     //           <InputAdornment position="end">
//     //             <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
//     //               <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
//     //             </IconButton>
//     //           </InputAdornment>
//     //         ),
//     //       }}
//     //     />
//     //   </Stack>

//     //   <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
//     //     {/* <Checkbox name="remember" label="Remember me" />
//     //     <Link variant="subtitle2" underline="hover">
//     //       Forgot password?
//     //     </Link> */}
//     //   </Stack>
//     //   <Stack direction="row" alignItems="center" justifyContent="center" spacing={5} sx={{ my: 2 }}>
//     //     <LoadingButton
//     //       // fullWidth
//     //       size="large"
//     //       type="submit"
//     //       variant="contained"
//     //       onClick={handleClick}
//     //     >
//     //       Domain Login
//     //     </LoadingButton>
//     //   </Stack>
//     // </>
//     <>
//       <Stack style={container}>
//         <Stack
//           spacing={2}
//           style={{
//             width: '100%',
//             height: 'auto',
//             background: 'white',
//             borderRadius: '8px',

//             bgcolor: 'background.paper',
//             border: '8px solid transparent',
//             boxShadow: '0px 0px 7px 7px lightgrey',
//             alignItems: 'center',
//             justifyContent: 'center',
//           }}
//         >
//           <img
//             src={'/assets/images/covers/HRLogo.svg'}
//             alt="text"
//             style={{
//               height: '40%',
//               width: '40%',
//               // paddingLeft: '10%',
//               display: 'flex',
//               backgroundSize: 'cover',
//               backgroundPosition: 'center',
//               backgroundRepeat: 'round',
//               backgroundAttachment: 'fixed',
//               margin: 'auto',
//               position: 'relative',
//             }}
//           />
//           <Collapse in={open}>
//             <Alert severity="warning" variant="filled">
//               {errorMessage}
//             </Alert>
//           </Collapse>
//           <TextField
//             required
//             name="userName"
//             id="userName"
//             label="Username"
//             onChange={(e) => handleUsername(e)}
//             sx={{
//               width: 300,
//               backgroundColor: 'white',
//             }}
//           />

//           <TextField
//             sx={{
//               width: 300,
//               backgroundColor: 'white',
//             }}
//             name="passWord"
//             label="Password"
//             required
//             onChange={(e) => handlePassword(e)}
//             type={showPassword ? 'text' : 'password'}
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
//                     <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />

//           <Stack direction="row" alignItems="center" justifyContent="center" spacing={5} sx={{ my: 2, mb: 2 }}>
//             <LoadingButton
//               // fullWidth
//               size="large"
//               type="submit"
//               variant="contained"
//               // disabled={!(dirty && isValid)}
//               onClick={handleClick}
//             >
//               Login
//             </LoadingButton>
//           </Stack>
//         </Stack>
//       </Stack>
//     </>
//   );
// }
