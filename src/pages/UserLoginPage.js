import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Typography,
  Stack,
  Link,
  Collapse,
  TextField,
  IconButton,
  InputAdornment,
  Alert,
  MenuItem,
  Modal,
  Box,
  Button,
  Grid,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Configuration from '../utils/Configuration';
import { LoginForm } from '../sections/auth/login';
import Iconify from '../components/iconify';
import Card from '../Images/Card.png';
import Constants from '../Constants/Constants';

// -----------------------------------------------------------
const container = {
  position: 'relative',
  textAlign: 'center',
  zIndex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  bottom: 40,
};
const bottomLeft = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  textAlign: 'center',
};
// --------------------------------------------------------------

export default function UserLoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);
  const [openLogin, setOpenLogin] = useState(true);
  const [openForgotPasswordModal, setForgotPasswordModal] = useState(false);
  const [openSsuccessSignUpModal, setOpenSuccessSignUpModal] = useState(false);
  const [failureMessage, setFailureMessage] = useState();
  const [showFailureModal, setShowFailureModal] = useState(false);
  const [openDomainLogin, setOpenDomainLogin] = useState(false);
  const [state, setState] = useState({
    spocPassword: '',
    spocConfirmPassword: '',
    spocMobileNo: '',
    partnerName: '',
    spocMobileNumber: '',
    spocName: '',
    userProfile: 'BAGIC_PARTNER',
    spocEmailId: '',
    activeYn: 'Y',
    spocUsername: '',
    username: '',
    password: '',
  });

  const handleReset = () => {
    setState({
      ...state,
      spocPassword: '',
      spocConfirmPassword: '',
      spocMobileNo: '',
      partnerName: '',
      spocMobileNumber: '',
      spocName: '',
      spocEmailId: '',
    });
  };

  const handleResetForLogin = () => {
    console.log('handle reset');
    setState({
      ...state,
      username: 'abc',
      password: 'abc',
    });
    console.log('reset form values', initialValues.username, state.password);
  };

  const handleClick = () => {
    document.getElementById('spocUsername').value = state.spocEmailId;
    document.getElementById('userProfile').value = state.userProfile;
    const employeeFormObj = new FormData(document.getElementById('signUpForm'));
    const employeeFormData = Object.fromEntries(employeeFormObj.entries());

    setState({
      ...state,
      spocUsername: employeeFormData.spocEmailId,
      userProfile: employeeFormData.userProfile,
    });

    console.log('Employee Form Data', employeeFormData);

    Configuration.signUp(employeeFormData)
      .then((signUpRes) => {
        console.log('Employee Form Data :: ', signUpRes.data.errorCode === '1');
        if (signUpRes.data.errorCode === '1') {
          console.log('inside if');
          setShowFailureModal(true);
          setFailureMessage(signUpRes.data.errorDesc);
          handleReset();
        } else {
          console.log('inside else');
          setOpenSignUp(false);
          setOpenSuccessSignUpModal(true);
        }
      })
      .catch((error) => {
        console.log('ERROR', error);
        alert('Something went wrong!! Please try after sometime');
      });
  };

  const handleClickForLogin = () => {
    console.log('inside handle click for login ');
    const employeeFormObj = new FormData(document.getElementById('partnerLogin'));
    const employeeFormData = Object.fromEntries(employeeFormObj.entries());
    console.log('Employee Form Data', employeeFormData);

    const login = {
      username: employeeFormData.username,
    };
    console.log('Login request', login);
    Configuration.partnerLogin(employeeFormData)
      .then((partnerLoginRes) => {
        console.log('Employee form data::', partnerLoginRes.data.length);
        if (partnerLoginRes.data?.[0]?.errorCode === '1') {
          setShowFailureModal(true);
          setFailureMessage(partnerLoginRes.data?.[0]?.errorDesc);
          handleResetForLogin();
        } else if (partnerLoginRes.data?.[0]?.errorCode === '0') {
          if (partnerLoginRes.data.length >= 1) {
            // Configuration.login(login)
            //   .then((LoginResponse) => {
            //     if (LoginResponse) {
            //       console.log('INSIDE LENGTH  IF ', LoginResponse.data.length);
            //       if (LoginResponse.data.length === 1) {
            //         if (LoginResponse?.data?.[0]?.userProfile === 'BAGIC_ADMIN') {
            //           navigate('/Dashboard');
            //         } else if (LoginResponse?.data?.[0]?.userProfile === 'BAGIC_PARTNER') {
            //           navigate('/EmployeesBP');
            //         } else if (LoginResponse?.data?.[0]?.userProfile === 'BAGIC_TL') {
            //           navigate('/EmployeesTL');
            //         } else if (LoginResponse?.data?.[0]?.userProfile === 'BAGIC_SM') {
            //           console.log('INSIDE LENGTH BAGIC SM');
            //           navigate('/EmployeesSM');
            //         } else if (LoginResponse?.data?.[0]?.userProfile === 'BAGIC_ITS') {
            //           navigate('/EmployeesITS');
            //         }
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
                    } else if (USERDETAILS?.[0]?.userProfile === 'BAGIC_PRESIDENT') {
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
          }
        }
      })
      .catch((error) => {
        alert('Something went wrong');
      });
  };
  console.log('FAILURE MESSAGE', failureMessage);
  const handleChangeEvent = (evt) => {
    setState({
      ...state,
      [evt.target.name]: evt.target.value,
    });
  };

  const initialValues = {
    spocName: state.spocName,
    spocMobileNo: state.spocMobileNo,
    spocEmailId: state.spocEmailId,
    spocPassword: state.spocPassword,
    spocConfirmPassword: state.spocConfirmPassword,
    userProfile: state.userProfile,
    activeYn: state.activeYn,
    partnerName: state.partnerName,
    spocUsername: state.spocUsername,
  };

  const validationSchema = Yup.object({
    spocName: Yup.string()
      .required('Full Name is required field')
      .matches(/^[a-zA-Z\s]+$/, 'Invalid Name'),
    spocMobileNo: Yup.string()
      .matches(/^[5-9]\d{9}$/, {
        message: 'Please enter valid number.',
        excludeEmptyString: false,
      })
      .required('Mobile Number is required field'),
    spocEmailId: Yup.string()
      .matches(/^[a-zA-Z0-9]{0,}([.]?[a-zA-Z0-9]{1,})[@]/, 'Invalid email address')
      .email('Invalid email address')
      .required('Email Id is required field'),
    spocPassword: Yup.string()
      .required('Please Enter your password')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%\\^&\\*])(?=.{8,})/,
        'Must Contain minimum 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
      ),
    spocConfirmPassword: Yup.string()
      .required('Required Field')
      .oneOf([Yup.ref('spocPassword')], 'Your passwords do not match.'),
    partnerName: Yup.string().required('Please Select'),
  });

  const initialValuesForLogin = {
    username: state.username,
    password: state.password,
  };

  const validationSchemaForLogin = Yup.object({
    username: Yup.string()
      .matches(/^[a-zA-Z0-9]{0,}([.]?[a-zA-Z0-9]{1,})[@]/, 'Invalid email address')
      .email('Invalid email address')
      .required('Email Id is required field'),
    password: Yup.string()
      .required('Please Enter your password')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%\\^&\\*])(?=.{8,})/,
        'Must Contain minimum 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
      ),
  });
  const handleNavigation = () => {
    console.log('inside handleNavigation');
    <LoginForm />;
  };
  return (
    <>
      <Stack alignItems="center" justifyContent="center">
        <Modal
          open={openForgotPasswordModal || openSsuccessSignUpModal || showFailureModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              border: '2px solid transparent',
              boxShadow: 24,
              p: 4,
              borderRadius: '8px',
            }}
            component="form"
          >
            {console.log('failue Modal', showFailureModal)}
            {openForgotPasswordModal ? (
              <Typography id="modal-modal-description" sx={{ mt: 1, textAlign: 'center' }}>
                Please contact admin team to reset your password and regain access to your account.
              </Typography>
            ) : openSsuccessSignUpModal ? (
              <Typography id="modal-modal-description" sx={{ mt: 1, textAlign: 'center' }}>
                Thankyou! Your Partner signup was successful. Please Login to continue!
              </Typography>
            ) : showFailureModal ? (
              <Typography id="modal-modal-description" sx={{ mt: 1, textAlign: 'center' }}>
                {failureMessage}
              </Typography>
            ) : null}
            <Grid
              container
              item
              xs={12}
              justifyContent={'center'}
              style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}
            >
              <Stack direction="row" justifyContent="center">
                <Button
                  size="medium"
                  variant="contained"
                  type="button"
                  color="primary"
                  // onClick={() => setApprovalModal(false)}
                  onClick={() =>
                    openForgotPasswordModal
                      ? setForgotPasswordModal(false)
                      : openSsuccessSignUpModal
                      ? (setOpenSuccessSignUpModal(false), setOpenLogin(true))
                      : failureMessage
                      ? (setShowFailureModal(false), setOpenSignUp(false), setOpenLogin(true))
                      : null
                  }
                  sx={{ mt: 2 }}
                >
                  OK
                </Button>
              </Stack>
            </Grid>
          </Box>
        </Modal>
      </Stack>
      <Stack style={{ paddingBottom: 10, bottom: 20 }}>
        {openLogin ? (
          <>
            <Formik initialValues={initialValuesForLogin} validationSchema={validationSchemaForLogin}>
              {(formik) => {
                const { values, handleChange, handleSubmit, errors, touched, handleBlur, isValid, dirty } = formik;
                return (
                  <form onSubmit={handleSubmit} spacing={2} method="POST" id="partnerLogin" name="partnerLogin">
                    <Stack style={container}>
                      <Stack
                        spacing={2}
                        style={{
                          width: '100%',
                          height: 'auto',
                          background: 'white',
                          borderRadius: '8px',

                          bgcolor: 'background.paper',
                          border: '8px solid transparent',
                          boxShadow: '0px 0px 7px 7px lightgrey',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <img
                          src={'/assets/images/covers/HRLogo.svg'}
                          alt="text"
                          style={{
                            height: '40%',
                            width: '40%',
                            // paddingLeft: '10%',
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
                          autoComplete="off"
                          l
                          name="username"
                          id="username"
                          label="Email Id"
                          value={values.username}
                          onChange={(evt) => {
                            handleChange(evt);
                            handleChangeEvent(evt);
                          }}
                          sx={{
                            width: 300,
                            backgroundColor: 'white',
                          }}
                          onBlur={handleBlur}
                          error={formik.touched.username && Boolean(formik.errors.username)}
                          helperText={formik.touched.username && formik.errors.username}
                        />

                        <TextField
                          sx={{
                            width: 300,
                            backgroundColor: 'white',
                          }}
                          autoComplete="current-password"
                          variant="outlined"
                          id="password"
                          name="password"
                          label="Password"
                          // type="password"
                          required
                          onBlur={handleBlur}
                          value={values.password}
                          onChange={(evt) => {
                            handleChange(evt);
                            handleChangeEvent(evt);
                          }}
                          error={formik.touched.password && Boolean(formik.errors.password)}
                          helperText={formik.touched.password && formik.errors.password}
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

                        {/* <Stack direction="row" alignItems="flex-end" justifyContent="flex-end" mt={1}>
                          <Link
                            variant="subtitle2"
                            underline="always"
                            onClick={() => {
                              setForgotPasswordModal(true);
                            }}
                          >
                            {''}Forgot Password
                          </Link>
                        </Stack> */}
                        {/* <Link
                          variant="subtitle2"
                          underline="hover"
                          onClick={() => {
                            setOpenSignUp(false);
                            setOpenLogin(false);
                            setOpenDomainLogin(true);
                          }}
                          style={{ textDecoration: 'underline' }}
                        >
                          {''}Domain Login
                        </Link> */}
                        <Stack direction="row" alignItems="center" justifyContent="center">
                          <Typography>Don't have an account?</Typography>
                          <Link
                            variant="subtitle2"
                            underline="hover"
                            onClick={() => {
                              setOpenSignUp(true);
                              setOpenLogin(false);
                            }}
                            style={{ textDecoration: 'underline' }}
                          >
                            {''}SignUp
                          </Link>
                        </Stack>

                        <Stack
                          direction="row"
                          alignItems="center"
                          justifyContent="center"
                          spacing={5}
                          sx={{ my: 2, mb: 2 }}
                        >
                          <LoadingButton
                            // fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                            disabled={!(dirty && isValid)}
                            onClick={() => {
                              handleClickForLogin();
                              formik.resetForm();
                            }}
                          >
                            Login
                          </LoadingButton>
                        </Stack>
                      </Stack>
                    </Stack>
                  </form>
                );
              }}
            </Formik>
          </>
        ) : null}
        {openSignUp ? (
          <>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values) => console.log('VALUES SIGNUP', values)}
            >
              {(formik) => {
                const { values, handleChange, handleSubmit, errors, touched, handleBlur, isValid, dirty } = formik;
                return (
                  <form onSubmit={handleSubmit} spacing={2} method="POST" id="signUpForm" name="signUpForm">
                    <Stack style={container}>
                      <Stack
                        spacing={2}
                        alignItems="center"
                        justifyContent="center"
                        style={{
                          width: 'auto',
                          height: 'auto',
                          background: 'white',
                          borderRadius: '8px',
                          bgcolor: 'background.paper',
                          border: '8px solid transparent',
                          boxShadow: '0px 0px 7px 7px lightgrey',
                          alignItems: 'center',
                          justifyContent: 'center',
                          top: 20,
                        }}
                      >
                        <img
                          src={'/assets/images/covers/HRLogo.svg'}
                          alt="text"
                          style={{
                            height: '40%',
                            width: '40%',
                            // paddingLeft: '10%',
                            display: 'flex',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'round',
                            backgroundAttachment: 'fixed',
                            // margin: 'auto',
                            position: 'relative',
                          }}
                        />
                        <Collapse in={open}>
                          <Alert severity="warning" variant="filled">
                            {errorMessage}
                          </Alert>
                        </Collapse>
                        <Stack direction="row" spacing={2}>
                          <TextField
                            autoComplete="off"
                            name="spocName"
                            variant="outlined"
                            required
                            id="spocName"
                            label="Full Name"
                            value={values.spocName}
                            onChange={(evt) => {
                              handleChange(evt);
                              handleChangeEvent(evt);
                            }}
                            onBlur={handleBlur}
                            sx={{
                              width: 200,
                              backgroundColor: 'white',
                            }}
                            error={touched.spocName && Boolean(errors.spocName)}
                            helperText={touched.spocName && errors.spocName}
                          />

                          <TextField
                            autoComplete="off"
                            name="spocMobileNo"
                            variant="outlined"
                            type="tel"
                            required
                            id="spocMobileNo"
                            label="Mobile Number"
                            value={values.spocMobileNo}
                            onChange={(evt) => {
                              handleChange(evt);
                              handleChangeEvent(evt);
                            }}
                            inputProps={{
                              maxLength: '10',
                            }}
                            sx={{
                              width: 200,
                              backgroundColor: 'white',
                            }}
                            onBlur={handleBlur}
                            error={formik.touched.spocMobileNo && Boolean(formik.errors.spocMobileNo)}
                            helperText={formik.touched.spocMobileNo && formik.errors.spocMobileNo}
                          />
                        </Stack>

                        {/* email */}
                        <Stack direction="row" spacing={2}>
                          <TextField
                            autoComplete="off"
                            variant="outlined"
                            required
                            name="spocEmailId"
                            id="spocEmailId"
                            label="Email Id"
                            placeholder="abc@gmail.com"
                            value={values.spocEmailId}
                            onChange={(evt) => {
                              handleChange(evt);
                              handleChangeEvent(evt);
                              // handleChangeForEmail(evt);
                            }}
                            sx={{
                              width: 200,
                              backgroundColor: 'white',
                            }}
                            onBlur={handleBlur}
                            error={formik.touched.spocEmailId && Boolean(formik.errors.spocEmailId)}
                            helperText={formik.touched.spocEmailId && formik.errors.spocEmailId}
                          />
                          <TextField
                            autoComplete="off"
                            variant="outlined"
                            required
                            select
                            name="partnerName"
                            id="partnerName"
                            label="Vendor"
                            value={values.partnerName}
                            onChange={(evt) => {
                              handleChange(evt);
                              handleChangeEvent(evt);
                            }}
                            sx={{
                              width: 200,
                              backgroundColor: 'white',
                            }}
                            onBlur={handleBlur}
                            error={formik.touched.partnerName && Boolean(formik.errors.partnerName)}
                            helperText={formik.touched.partnerName && formik.errors.partnerName}
                          >
                            {Constants.vendorList.map((option) => (
                              <MenuItem key={option.value} value={option.label}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Stack>

                        <Stack direction="row" spacing={2}>
                          <TextField
                            autoComplete="off"
                            variant="outlined"
                            required
                            name="spocPassword"
                            id="spocPassword"
                            label="Password"
                            sx={{
                              width: 200,
                              backgroundColor: 'white',
                            }}
                            value={values.spocPassword}
                            onChange={(evt) => {
                              handleChange(evt);
                              handleChangeEvent(evt);
                            }}
                            onBlur={handleBlur}
                            error={formik.touched.spocPassword && Boolean(formik.errors.spocPassword)}
                            helperText={formik.touched.spocPassword && formik.errors.spocPassword}
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

                          <TextField
                            autoComplete="off"
                            variant="outlined"
                            required
                            name="spocConfirmPassword"
                            id="spocConfirmPassword"
                            label="Confirm Password"
                            sx={{
                              width: 200,
                              backgroundColor: 'white',
                            }}
                            value={values.spocConfirmPassword}
                            onChange={(evt) => {
                              handleChange(evt);
                              handleChangeEvent(evt);
                            }}
                            onBlur={handleBlur}
                            error={formik.touched.spocConfirmPassword && Boolean(formik.errors.spocConfirmPassword)}
                            helperText={formik.touched.spocConfirmPassword && formik.errors.spocConfirmPassword}
                            type={showConfirmPassword ? 'text' : 'password'}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                                    <Iconify icon={showConfirmPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Stack>

                        <input type="hidden" id="activeYn" name="activeYn" value="Y" />
                        <input type="hidden" id="spocUsername" name="spocUsername" value={values.spocUsername} />
                        <input type="hidden" id="userProfile" name="userProfile" value={values.userProfile} />
                        <Stack direction="row" alignItems="center" justifyContent="center">
                          <Typography>Already have an account?</Typography>
                          <Link
                            variant="subtitle2"
                            underline="hover"
                            onClick={() => {
                              setOpenSignUp(false);
                              setOpenLogin(true);
                            }}
                            style={{ textDecoration: 'underline' }}
                          >
                            Login
                          </Link>
                        </Stack>
                        <Stack direction="row" alignItems="center" justifyContent="center">
                          <LoadingButton
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                            onClick={handleClick}
                            disabled={!(dirty && isValid)}
                          >
                            Sign Up
                          </LoadingButton>
                        </Stack>
                      </Stack>
                    </Stack>
                  </form>
                );
              }}
            </Formik>
          </>
        ) : null}
        {/* {openDomainLogin ? (
          <Stack style={container}>
            <img src={Card} alt="Snow" style={{ width: '100%', height: '100%' }} />
            <Stack style={bottomLeft} mt={3}>
              <Typography variant="h4" style={{ fontSize: '20px', color: '#0066C7' }}>
                Sign-In to HR Portal
              </Typography>

              <Stack mt={1}>
                <Stack mb={1}>
                  <Collapse in={open}>
                    <Alert severity="warning" variant="filled" style={{ width: '100%' }}>
                      {errorMessage}
                    </Alert>
                  </Collapse>
                </Stack>
                <LoadingButton
                  // fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  // onClick={BagicSso}
                  //  onClick={() =>handleClickBagicSSo}
                >
                  Domain Login
                </LoadingButton>
              </Stack>
            </Stack>
          </Stack>
        ) : null} */}
      </Stack>
    </>
  );
}
