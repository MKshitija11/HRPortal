// --------------------------------PRODUCTION ----------------------------

// export default function LoginForm(props) {
//     const navigate = useNavigate();
//     const [open, setOpen] = useState(false);
//     const [showPassword, setShowPassword] = useState(false);
//     const [userName, setUsername] = useState('');
//     const [passWord, setPassword] = useState('');
//     const [errorMessage, setErrorMessage] = useState('');
//     const [userIdLogin, setUserIdLogin] = useState(false);
//     const [proceed, setProceed] = useState(false);

//     const { instance } = useMsal();

//     useEffect(() => {
//       BagicSso();
//       console.log('inside useEffect >>');
//     }, []);

//     const BagicSso = (e) => {
//       const loginRequest = {
//         scopes: ['user.read'],
//       };
//       console.log('start', loginRequest);
//       try {
//         msalInstance
//           .loginPopup(loginRequest)
//           .then((response) => {
//             console.log('response', response);
//             // console.log('email', response.idToken.claims
//             // );
//             response.idToken.claims.email = response.idToken.claims.preferred_username;
//             const userNameSso = response.idToken.claims.preferred_username.toLowerCase();
//             console.log('userNameSso', userNameSso);

//             const newUsername = userNameSso.split('@');
//             console.log('Updated username', newUsername);
//             const splitedUsername = newUsername[0];
//             const appendedTxt = '@bajajallianz.co.in';
//             const updatedUsername = `${splitedUsername}${appendedTxt}`;
//             console.log('Updated username ===', `${splitedUsername}${appendedTxt}`);

//             const login = {
//               username: updatedUsername,
//             };

//             localStorage.setItem('userName', userNameSso);
//             localStorage.setItem('userName', userNameSso);
//             Configuration.login(login)
//               .then((LoginResponse) => {
//                 if (LoginResponse) {
//                   console.log('INSIDE LENGTH  IF ', LoginResponse.data.length);
//                   if (LoginResponse.data.length === 2) {
//                     navigate('/SwitchRole');
//                   } else if (LoginResponse.data.length === 1) {
//                     console.log('INSIDE LENGTH ELSE IF ', LoginResponse.data);

//                     if (LoginResponse?.data?.[0]?.userProfile === 'BAGIC_ADMIN') {
//                       navigate('/Dashboard');
//                     } else if (LoginResponse?.data?.[0]?.userProfile === 'BAGIC_PARTNER') {
//                       navigate('/EmployeesBP');
//                     } else if (LoginResponse?.data?.[0]?.userProfile === 'BAGIC_TL') {
//                       navigate('/EmployeesTL');
//                     } else if (LoginResponse?.data?.[0]?.userProfile === 'BAGIC_SM') {
//                       console.log('INSIDE LENGTH BAGIC SM');
//                       navigate('/EmployeesSM');
//                     } else if (LoginResponse?.data?.[0]?.userProfile === 'BAGIC_ITS') {
//                       navigate('/EmployeesITS');
//                     }
//                   }
//                   let USERDETAILS = {};
//                   USERDETAILS = JSON.stringify(LoginResponse.data);
//                   if (USERDETAILS != null) {
//                     sessionStorage.setItem('USERDETAILS', USERDETAILS);
//                   }

//                   Configuration.getReportingList().then((RAResponse) => {
//                     console.log('LoginForm.getReportingList.LoginResponse', RAResponse.data);
//                     let REPORTINGDETAILS = [];
//                     REPORTINGDETAILS = JSON.stringify(RAResponse.data);
//                     sessionStorage.setItem('REPORTINGDETAILS', REPORTINGDETAILS);
//                   });
//                 } else {
//                   console.log('INSIDE LENGTH ELSE ');
//                   setErrorMessage(LoginResponse.data.errorDesc);
//                   setOpen(true);
//                 }
//               })
//               .catch((error) => alert('Something went wrong!!'));
//           })
//           .catch((err) => {
//             console.log('err', err);
//           });
//       } catch (err) {
//         console.log('catch err', err);
//       }
//     };

//     useEffect(() => {
//       sessionStorage.clear();
//       console.log('Session Cleared!');
//     }, []);

//     return (
//       <>
//         <Stack sx={{ alignItems: 'center', justifyContent: 'center' }}>
//           <img
//             src={'/assets/images/covers/HRLogo.svg'}
//             alt="text"
//             style={{
//               height: '80%',
//               width: '80%',
//               paddingLeft: '3%',
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
//         </Stack>

//         <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 1 }}>
//           {/* <Checkbox name="remember" label="Remember me" />
//           <Link variant="subtitle2" underline="hover">
//             Forgot password?
//           </Link> */}
//         </Stack>
//         <Stack direction="row" alignItems="center" justifyContent="center" flexDirection={'row'} spacing={2}>
//           <LoadingButton size="large" type="submit" variant="contained" onClick={BagicSso}>
//             Domain Login
//           </LoadingButton>
//         </Stack>
//       </>
//     );
//   }


// -------------------------------- UAT ----------------------------
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
//       username: updatedUser,
//       password: passWord,
//     };

//     console.log("username n password", loginRequest.username, loginRequest.password)

//     if (userName === '') {
//       setErrorMessage('Please enter username!');
//       setOpen(true);
//     } else if (passWord === '') {
//       setErrorMessage('Please enter password!');
//       setOpen(true);
//     } else {
//       Configuration.login(loginRequest)
//         .then((LoginResponse) => {
//           console.log('LoginForm.login.LoginResponse', LoginResponse.data);
//           // if (LoginResponse.data.errorCode === '0' && LoginResponse.data.errorDesc === 'Success') {
//           //   if (LoginResponse.data.userProfile === 'BAGIC_ADMIN') {
//           //     navigate('/Dashboard');
//           //   } else if (LoginResponse.data.userProfile === 'BAGIC_PARTNER') {
//           //     navigate('/EmployeesBP');
//           //   } else if (LoginResponse.data.userProfile === 'BAGIC_TL') {
//           //     navigate('/EmployeesTL');
//           //   } else if (LoginResponse.data.userProfile === 'BAGIC_SM') {
//           //     navigate('/EmployeesSM');
//           //   } else if (LoginResponse.data.userProfile === 'BAGIC_ITS') {
//           //     navigate('/EmployeesITS');
//           //   }

//           //   console.log('LoginResponse', LoginResponse);
//           //   let USERDETAILS = {};
//           //   USERDETAILS = JSON.stringify(LoginResponse.data);
//           //   if (USERDETAILS != null) {
//           //     sessionStorage.setItem('USERDETAILS', USERDETAILS);
//           //   }

//           //   Configuration.getReportingList().then((RAResponse) => {
//           //     console.log('LoginForm.getReportingList.LoginResponse', RAResponse.data);
//           //     let REPORTINGDETAILS = [];
//           //     REPORTINGDETAILS = JSON.stringify(RAResponse.data);
//           //     console.log('REPORTING LIST', REPORTINGDETAILS);
//           //     sessionStorage.setItem('REPORTINGDETAILS', REPORTINGDETAILS);
//           //   });

//           //   Object.values(events).forEach((item) => {
//           //     window.addEventListener(item, () => {
//           //       resetTimer();
//           //       handleLogoutTimer();
//           //     });
//           //   });
//           // } else {
//           //   // setErrorMessage('INCORRECT')
//           //   setErrorMessage(LoginResponse.data.errorDesc);
//           //   setOpen(true);
//           // }
//           if (LoginResponse) {
//             console.log('INSIDE LENGTH  IF ', LoginResponse.data.length);
//             if (LoginResponse.data.length === 2) {
//               navigate('/SwitchRole');
//             } else if (LoginResponse.data.length === 1) {
//               console.log('INSIDE LENGTH ELSE IF ', LoginResponse.data);

//               if (LoginResponse?.data?.[0]?.userProfile === 'BAGIC_ADMIN') {
//                 navigate('/Dashboard');
//               } else if (LoginResponse?.data?.[0]?.userProfile === 'BAGIC_PARTNER') {
//                 navigate('/EmployeesBP');
//               } else if (LoginResponse?.data?.[0]?.userProfile === 'BAGIC_TL') {
//                 navigate('/EmployeesTL');
//               } else if (LoginResponse?.data?.[0]?.userProfile === 'BAGIC_SM') {
//                 console.log('INSIDE LENGTH BAGIC SM');
//                 navigate('/EmployeesSM');
//               } else if (LoginResponse?.data?.[0]?.userProfile === 'BAGIC_ITS') {
//                 navigate('/EmployeesITS');
//               }
//             }
//             let USERDETAILS = {};
//             USERDETAILS = JSON.stringify(LoginResponse.data);
//             if (USERDETAILS != null) {
//               sessionStorage.setItem('USERDETAILS', USERDETAILS);
//             }

//             Configuration.getReportingList().then((RAResponse) => {
//               console.log('LoginForm.getReportingList.LoginResponse', RAResponse.data);
//               let REPORTINGDETAILS = [];
//               REPORTINGDETAILS = JSON.stringify(RAResponse.data);
//               sessionStorage.setItem('REPORTINGDETAILS', REPORTINGDETAILS);
//             });
//           } else {
//             console.log('INSIDE LENGTH ELSE ');
//             setErrorMessage(LoginResponse.data.errorDesc);
//             setOpen(true);
//           }
//         })
//         .catch((error) => alert('Something went wrong!!'));
//     }
//     // navigate('/dashboard', { replace: true });
//   };
//   console.log('UN', updatedUser);
//   return (
//     <>
//       <Stack spacing={2}>
//         <img
//           src={'/assets/images/covers/HRLogo.svg'}
//           alt="text"
//           style={{
//             height: '80%',
//             width: '80%',
//             paddingLeft: '10%',
//             display: 'flex',
//             backgroundSize: 'cover',
//             backgroundPosition: 'center',
//             backgroundRepeat: 'round',
//             backgroundAttachment: 'fixed',
//             margin: 'auto',
//             position: 'relative',
//           }}
//         />
//         <Collapse in={open}>
//           <Alert severity="warning" variant="filled">
//             {errorMessage}
//           </Alert>
//         </Collapse>
//         <TextField
//           required
//           name="userName"
//           id="userName"
//           label="Username"
//           onChange={(e) => handleUsername(e)}
//           sx={{
//             width: 300,
//             backgroundColor: 'white',
//           }}
//         />

//         <TextField
//           sx={{
//             width: 300,
//             backgroundColor: 'white',
//           }}
//           name="passWord"
//           label="Password"
//           required
//           onChange={(e) => handlePassword(e)}
//           type={showPassword ? 'text' : 'password'}
//           InputProps={{
//             endAdornment: (
//               <InputAdornment position="end">
//                 <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
//                   <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
//                 </IconButton>
//               </InputAdornment>
//             ),
//           }}
//         />
//       </Stack>

//       <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
//         {/* <Checkbox name="remember" label="Remember me" />
//         <Link variant="subtitle2" underline="hover">
//           Forgot password?
//         </Link> */}
//       </Stack>
//       <Stack direction="row" alignItems="center" justifyContent="center" spacing={5} sx={{ my: 2 }}>
//         <LoadingButton
//           // fullWidth
//           size="large"
//           type="submit"
//           variant="contained"
//           onClick={handleClick}
//         >
//           Domain Login
//         </LoadingButton>
//       </Stack>
//     </>
//   );
// }

// ----------------------------- LOCAL -----------------------------
// export default function LoginForm() {
//   const navigate = useNavigate();
//   const [open, setOpen] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [userName, setUsername] = useState('');
//   const [passWord, setPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const [updatedUser, setUpdatedUser] = useState('');
//   const [userProfile, setUserProfile] = useState();

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
//     // console.log("before username", updatedUser)

//     // if (userName.includes('@bajajallianz')) {
//     //   console.log('BLOCK If=====>', userName);
//     //   const newUsername = userName.split('@');
//     //   console.log('Updated username', newUsername);
//     //   const splitedUsername = newUsername[0];
//     //   const appendedTxt = '@bajajallianz.co.in';
//     //   const updatedUsername = `${splitedUsername}${appendedTxt}`;
//     //   setUpdatedUser(updatedUsername);
//     //   console.log('UserName 3====', updatedUsername);
//     // } else {
//     //   console.log('BLOCK ELSE=====>', userName);
//     //   setUpdatedUser(userName);
//     // }
//     // console.log("after username", updatedUser)

//     const loginRequest = {
//       // username: 'mandar.pathak@bajajallianz.co.in',
//       // username: 'jaldip.katre@bajajallianz.co.in',
//       // username: 'ravi.kumar044@bajajallianz.co.in',
//       // username: 'pooja.rebba@bajajallianz.co.in',
//       username: 'rajhans.gavali@bajajallianz.co.in',
//       // username: 'niranjan.rote@bajajallianz.co.in',
//       // username: 'kshitija.madhekar@pinnacle.com',
//       // username: 'deepali.kalapure@bajajallianz.co.in',
//       password: 'password',
//     };

//     Configuration.login(loginRequest)
//       .then((LoginResponse) => {
//         if (LoginResponse) {
//           console.log('INSIDE LENGTH  IF ', LoginResponse.data.length);
//           if (LoginResponse.data.length === 2) {
//             navigate('/SwitchRole');
//           } else if (LoginResponse.data.length === 1) {
//             console.log('INSIDE LENGTH ELSE IF ', LoginResponse.data);

//             if (LoginResponse?.data?.[0]?.userProfile === 'BAGIC_ADMIN') {
//               navigate('/Dashboard');
//             } else if (LoginResponse?.data?.[0]?.userProfile === 'BAGIC_PARTNER') {
//               navigate('/EmployeesBP');
//             } else if (LoginResponse?.data?.[0]?.userProfile === 'BAGIC_TL') {
//               navigate('/EmployeesTL');
//             } else if (LoginResponse?.data?.[0]?.userProfile === 'BAGIC_SM') {
//               console.log('INSIDE LENGTH BAGIC SM');
//               navigate('/EmployeesSM');
//             } else if (LoginResponse?.data?.[0]?.userProfile === 'BAGIC_ITS') {
//               navigate('/EmployeesITS');
//             }
//           }
//           let USERDETAILS = {};
//           USERDETAILS = JSON.stringify(LoginResponse.data);
//           if (USERDETAILS != null) {
//             sessionStorage.setItem('USERDETAILS', USERDETAILS);
//           }

//           Configuration.getReportingList().then((RAResponse) => {
//             console.log('LoginForm.getReportingList.LoginResponse', RAResponse.data);
//             let REPORTINGDETAILS = [];
//             REPORTINGDETAILS = JSON.stringify(RAResponse.data);
//             sessionStorage.setItem('REPORTINGDETAILS', REPORTINGDETAILS);
//           });
//         } else {
//           console.log('INSIDE LENGTH ELSE ');
//           setErrorMessage(LoginResponse.data.errorDesc);
//           setOpen(true);
//         }
//       })
//       .catch((error) => alert('Something went wrong!!'));
//   };
//   // navigate('/dashboard', { replace: true });
//   // };
//   console.log('UN', updatedUser);
//   return (
//     <>
//       <Stack spacing={2}>
//         <img
//           src={'/assets/images/covers/HRLogo.svg'}
//           alt="text"
//           style={{
//             height: '80%',
//             width: '80%',
//             paddingLeft: '10%',
//             display: 'flex',
//             backgroundSize: 'cover',
//             backgroundPosition: 'center',
//             backgroundRepeat: 'round',
//             backgroundAttachment: 'fixed',
//             margin: 'auto',
//             position: 'relative',
//           }}
//         />
//         <Collapse in={open}>
//           <Alert severity="warning" variant="filled">
//             {errorMessage}
//           </Alert>
//         </Collapse>
//         <TextField
//           required
//           name="userName"
//           id="userName"
//           label="Username"
//           onChange={(e) => handleUsername(e)}
//           sx={{
//             width: 300,
//             backgroundColor: 'white',
//             display: 'none',
//           }}
//         />

//         <TextField
//           sx={{
//             width: 300,
//             backgroundColor: 'white',
//             display: 'none',
//           }}
//           name="passWord"
//           label="Password"
//           required
//           onChange={(e) => handlePassword(e)}
//           type={showPassword ? 'text' : 'password'}
//           InputProps={{
//             endAdornment: (
//               <InputAdornment position="end">
//                 <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
//                   <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
//                 </IconButton>
//               </InputAdornment>
//             ),
//           }}
//         />
//       </Stack>

//       <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
//         {/* <Checkbox name="remember" label="Remember me" />
//         <Link variant="subtitle2" underline="hover">
//           Forgot password?
//         </Link> */}
//       </Stack>
//       <Stack direction="row" alignItems="center" justifyContent="center" spacing={5} sx={{ my: 2 }}>
//         <LoadingButton
//           // fullWidth
//           size="large"
//           type="submit"
//           variant="contained"
//           onClick={handleClick}
//         >
//           Domain Login
//         </LoadingButton>
//       </Stack>
//     </>
//   );
// }

// -----------------------------------------User id login------------------------------
// export default function LoginForm(props) {
//   const navigate = useNavigate();
//   const [open, setOpen] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [userName, setUsername] = useState('');
//   const [passWord, setPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const [userIdLogin, setUserIdLogin] = useState(false);
//   const [proceed, setProceed] = useState(false);

//   const { instance } = useMsal();

//   useEffect(() => {
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
//           // console.log('email', response.idToken.claims
//           // );
//           response.idToken.claims.email = response.idToken.claims.preferred_username;
//           const userNameSso = response.idToken.claims.preferred_username.toLowerCase();
//           console.log('userNameSso', userNameSso);

//           const newUsername = userNameSso.split('@');
//           console.log('Updated username', newUsername);
//           const splitedUsername = newUsername[0];
//           const appendedTxt = '@bajajallianz.co.in';
//           const updatedUsername = `${splitedUsername}${appendedTxt}`;
//           console.log('Updated username ===', `${splitedUsername}${appendedTxt}`);

//           const login = {
//             username: updatedUsername,
//           };

//           localStorage.setItem('userName', userNameSso);
//           localStorage.setItem('userName', userNameSso);
//           Configuration.login(login)
//             .then((LoginResponse) => {
//               if (LoginResponse) {
//                 console.log('INSIDE LENGTH  IF ', LoginResponse.data.length);
//                 if (LoginResponse.data.length === 2) {
//                   navigate('/SwitchRole');
//                 } else if (LoginResponse.data.length === 1) {
//                   console.log('INSIDE LENGTH ELSE IF ', LoginResponse.data);

//                   if (LoginResponse?.data?.[0]?.userProfile === 'BAGIC_ADMIN') {
//                     navigate('/Dashboard');
//                   } else if (LoginResponse?.data?.[0]?.userProfile === 'BAGIC_PARTNER') {
//                     navigate('/EmployeesBP');
//                   } else if (LoginResponse?.data?.[0]?.userProfile === 'BAGIC_TL') {
//                     navigate('/EmployeesTL');
//                   } else if (LoginResponse?.data?.[0]?.userProfile === 'BAGIC_SM') {
//                     console.log('INSIDE LENGTH BAGIC SM');
//                     navigate('/EmployeesSM');
//                   } else if (LoginResponse?.data?.[0]?.userProfile === 'BAGIC_ITS') {
//                     navigate('/EmployeesITS');
//                   }
//                 }
//                 let USERDETAILS = {};
//                 USERDETAILS = JSON.stringify(LoginResponse.data);
//                 if (USERDETAILS != null) {
//                   sessionStorage.setItem('USERDETAILS', USERDETAILS);
//                 }

//                 Configuration.getReportingList().then((RAResponse) => {
//                   console.log('LoginForm.getReportingList.LoginResponse', RAResponse.data);
//                   let REPORTINGDETAILS = [];
//                   REPORTINGDETAILS = JSON.stringify(RAResponse.data);
//                   sessionStorage.setItem('REPORTINGDETAILS', REPORTINGDETAILS);
//                 });
//               } else {
//                 console.log('INSIDE LENGTH ELSE ');
//                 setErrorMessage(LoginResponse.data.errorDesc);
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

//   useEffect(() => {
//     sessionStorage.clear();
//     console.log('Session Cleared!');
//   }, []);

//   const handleUsername = (event) => {
//     setUserIdLogin(true);
//     setUsername(event.target.value);
//     setProceed(true);
//     // handleClick()
//   };

//   const handlePassword = (event) => {
//     setPassword(event.target.value);
//   };

//   const handleClick = () => {
//     const domainList = [
//       'rajhans.gavali@bajajallianz.co.in',
//       'pinkidutta.m@fasoftwares.com',
//       'vinod.pawar@honeybeetechsolutions.com',
//       'deepak@fluid.live',
//       'ashit.sharma@lumiq.ai',
//     ];

//     const loginRequest = {
//       username: userName,
//       // password: passWord,
//     };

//     if (userName === '') {
//       setErrorMessage('Please enter username!');
//       setOpen(true);
//     } else if (domainList.includes(userName)) {
//       Configuration.login(loginRequest)
//         .then((LoginResponse) => {
//           if (LoginResponse) {
//             console.log('INSIDE LENGTH  IF ', LoginResponse.data.length);
//             if (LoginResponse.data.length === 2) {
//               navigate('/SwitchRole');
//             } else if (LoginResponse.data.length === 1) {
//               console.log('INSIDE LENGTH ELSE IF ', LoginResponse.data);

//               if (LoginResponse?.data?.[0]?.userProfile === 'BAGIC_ADMIN') {
//                 navigate('/Dashboard');
//               } else if (LoginResponse?.data?.[0]?.userProfile === 'BAGIC_PARTNER') {
//                 navigate('/EmployeesBP');
//               } else if (LoginResponse?.data?.[0]?.userProfile === 'BAGIC_TL') {
//                 navigate('/EmployeesTL');
//               } else if (LoginResponse?.data?.[0]?.userProfile === 'BAGIC_SM') {
//                 console.log('INSIDE LENGTH BAGIC SM');
//                 navigate('/EmployeesSM');
//               } else if (LoginResponse?.data?.[0]?.userProfile === 'BAGIC_ITS') {
//                 navigate('/EmployeesITS');
//               }
//             }
//             let USERDETAILS = {};
//             USERDETAILS = JSON.stringify(LoginResponse.data);
//             if (USERDETAILS != null) {
//               sessionStorage.setItem('USERDETAILS', USERDETAILS);
//             }

//             Configuration.getReportingList().then((RAResponse) => {
//               console.log('LoginForm.getReportingList.LoginResponse', RAResponse.data);
//               let REPORTINGDETAILS = [];
//               REPORTINGDETAILS = JSON.stringify(RAResponse.data);
//               sessionStorage.setItem('REPORTINGDETAILS', REPORTINGDETAILS);
//             });
//           } else {
//             console.log('INSIDE LENGTH ELSE ');
//             setErrorMessage(LoginResponse.data.errorDesc);
//             setOpen(true);
//           }
//         })
//         .catch((error) => alert('Something went wrong!!'));
//     } else {
//       setErrorMessage('Please get in touch with concerned team');
//       setOpen(true);
//     }
//   };

//   return (
//     <>
//       <Stack sx={{ alignItems: 'center', justifyContent: 'center' }}>
//         <img
//           src={'/assets/images/covers/HRLogo.svg'}
//           alt="text"
//           style={{
//             height: '80%',
//             width: '80%',
//             paddingLeft: '3%',
//             display: 'flex',
//             backgroundSize: 'cover',
//             backgroundPosition: 'center',
//             backgroundRepeat: 'round',
//             backgroundAttachment: 'fixed',
//             margin: 'auto',
//             position: 'relative',
//           }}
//         />
//         <Collapse in={open}>
//           <Alert severity="warning" variant="filled">
//             {errorMessage}
//           </Alert>
//         </Collapse>
//         {userIdLogin && (
//           <>
//             <TextField
//               required
//               name="userName"
//               id="userName"
//               label="Username"
//               onChange={(e) => handleUsername(e)}
//               sx={{
//                 width: 300,
//                 backgroundColor: 'white',
//                 top: 7,
//               }}
//               mt={2}
//             />

//             {/* <TextField
//           sx={{
//             width: 300,
//             backgroundColor: 'white',
//           }}
//           name="passWord"
//           label="Password"
//           required
//           onChange={(e) => handlePassword(e)}
//           type={showPassword ? 'text' : 'password'}
//           InputProps={{
//             endAdornment: (
//               <InputAdornment position="end">
//                 <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
//                   <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
//                 </IconButton>
//               </InputAdornment>
//             ),
//           }}
//         /> */}
//           </>
//         )}
//       </Stack>

//       <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 1 }}>
//         {/* <Checkbox name="remember" label="Remember me" />
//         <Link variant="subtitle2" underline="hover">
//           Forgot password?
//         </Link> */}
//       </Stack>
//       <Stack direction="row" alignItems="center" justifyContent="center" flexDirection={'row'} spacing={2}>
//         <LoadingButton size="large" type="submit" variant="contained" onClick={BagicSso}>
//           Domain Login
//         </LoadingButton>
//         {proceed ? (
//           <LoadingButton size="large" type="submit" variant="contained" onClick={() => handleClick()}>
//             Proceed
//           </LoadingButton>
//         ) : (
//           <LoadingButton
//             size="large"
//             type="submit"
//             variant="contained"
//             onClick={() => {
//               setUserIdLogin(true);
//               handleUsername();
//             }}
//           >
//             User Login
//           </LoadingButton>
//         )}
//       </Stack>
//     </>
//   );
// }

// -----------------------------new flow for sign up --------------------------------
// export default function LoginForm(props) {
//   const navigate = useNavigate();
//   const [open, setOpen] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [userName, setUsername] = useState('');
//   const [passWord, setPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const [userIdLogin, setUserIdLogin] = useState(false);
//   const [proceed, setProceed] = useState(false);

//   const { instance } = useMsal();

//   useEffect(() => {
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
//           const userNameSso = response.idToken.claims.preferred_username.toLowerCase();
//           console.log('userNameSso', userNameSso);

//           const newUsername = userNameSso.split('@');
//           console.log('Updated username', newUsername);
//           const splitedUsername = newUsername[0];
//           const appendedTxt = '@bajajallianz.co.in';
//           const updatedUsername = `${splitedUsername}${appendedTxt}`;
//           console.log('Updated username ===', `${splitedUsername}${appendedTxt}`);

//           const login = {
//             username: updatedUsername,
//           };

//           localStorage.setItem('userName', userNameSso);
//           localStorage.setItem('userName', userNameSso);
//           Configuration.login(login)
//             .then((LoginResponse) => {
//               if (LoginResponse) {
//                 console.log('INSIDE LENGTH  IF ', LoginResponse.data.length);
//                 if (LoginResponse.data.length === 2) {
//                   navigate('/SwitchRole');
//                 } else if (LoginResponse.data.length === 1) {
//                   console.log('INSIDE LENGTH ELSE IF ', LoginResponse.data);

//                   if (LoginResponse?.data?.[0]?.userProfile === 'BAGIC_ADMIN') {
//                     navigate('/Dashboard');
//                   } else if (LoginResponse?.data?.[0]?.userProfile === 'BAGIC_PARTNER') {
//                     navigate('/EmployeesBP');
//                   } else if (LoginResponse?.data?.[0]?.userProfile === 'BAGIC_TL') {
//                     navigate('/EmployeesTL');
//                   } else if (LoginResponse?.data?.[0]?.userProfile === 'BAGIC_SM') {
//                     console.log('INSIDE LENGTH BAGIC SM');
//                     navigate('/EmployeesSM');
//                   } else if (LoginResponse?.data?.[0]?.userProfile === 'BAGIC_ITS') {
//                     navigate('/EmployeesITS');
//                   }
//                 }
//                 let USERDETAILS = {};
//                 USERDETAILS = JSON.stringify(LoginResponse.data);
//                 if (USERDETAILS != null) {
//                   sessionStorage.setItem('USERDETAILS', USERDETAILS);
//                 }

//                 Configuration.getReportingList().then((RAResponse) => {
//                   console.log('LoginForm.getReportingList.LoginResponse', RAResponse.data);
//                   let REPORTINGDETAILS = [];
//                   REPORTINGDETAILS = JSON.stringify(RAResponse.data);
//                   sessionStorage.setItem('REPORTINGDETAILS', REPORTINGDETAILS);
//                 });
//               } else {
//                 console.log('INSIDE LENGTH ELSE ');
//                 setErrorMessage(LoginResponse.data.errorDesc);
//                 setOpen(true);
//               }
//             })
//             .catch((error) => alert('Something went wrong!!'));
//         })
//         .catch((err) => {
//           console.log('err', err);
//           // if bagic sso fails
//           console.log('from first catch>>>>>>>>>>>>');
//           // navigate('/login',{ state: { userLogin: true } })
//           // navigate('/UserLoginPage')
//         });
//     } catch (err) {
//       console.log('catch err', err);
//     }
//   };

//   useEffect(() => {
//     sessionStorage.clear();
//     console.log('Session Cleared!');
//   }, []);

//   return (
//     <>
//       <Stack sx={{ alignItems: 'center', justifyContent: 'center' }}>
//         <img
//           src={'/assets/images/covers/HRLogo.svg'}
//           alt="text"
//           style={{
//             height: '80%',
//             width: '80%',
//             paddingLeft: '3%',
//             display: 'flex',
//             backgroundSize: 'cover',
//             backgroundPosition: 'center',
//             backgroundRepeat: 'round',
//             backgroundAttachment: 'fixed',
//             margin: 'auto',
//             position: 'relative',
//           }}
//         />
//         <Collapse in={open}>
//           <Alert severity="warning" variant="filled">
//             {errorMessage}
//           </Alert>
//         </Collapse>
//       </Stack>

//       <Stack direction="row" alignItems="center" justifyContent="center" flexDirection={'row'} spacing={2}>
//         <LoadingButton size="large" type="submit" variant="contained" onClick={BagicSso}>
//           Domain Login
//         </LoadingButton>
//       </Stack>
//     </>
//   );
// }

