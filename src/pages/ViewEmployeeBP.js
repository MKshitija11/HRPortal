import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
// @mui
import {
  TextField,
  Grid,
  Card,
  Stack,
  Button,
  Container,
  Typography,
  MenuItem,
  InputLabel,
  Select,
  FormControl,
  Switch,
  Modal,
  Box,
} from '@mui/material';
import FormHelperText from '@mui/material/FormHelperText';

import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';
// components
import Iconify from '../components/iconify';
import Configuration from '../utils/Configuration';

export default function ViewEmployee() {
  const [state, setState] = useState({
    employeeFirstName: '',
    employeeLastName: '',
    employeeFullName: '',
    mobileNumber: '',
    whatsappNumber: '',
    personalEmail: '',
    officialEmail: '',
    partnerName: '',
    employeeId: '',
    joiningDate: '',
    newReplacement: '',
    replacementEcode: '',
    supportDevelopment: '',
    reportingTeamLead: '',
    reportingManager: '',
    billingSlab: '',
    createdBy: '',
    employeeStatus: '',
    evaluationPeriod: '',
  });
  const [openModal, setOpenModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const evaluationPeriodList = [
    {
      value: '15 Days',
      label: '15 Days',
    },
    {
      value: '30 Days',
      label: '30 Days',
    },
    {
      value: '45 Days',
      label: '45 Days',
    },
    {
      value: '60 Days',
      label: '60 Days',
    },
  ];
  const newReplacementList = [
    {
      value: 'New',
      label: 'New',
    },
    {
      value: 'Replacement',
      label: 'Replacement',
    },
  ];

  const supportDevelopmentList = [
    {
      value: 'Support',
      label: 'Support',
    },
    {
      value: 'NRCR',
      label: 'NRCR',
    },
  ];
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    saveEmployeeData();
  };

  const handleOpenUpdateModal = (formik, valid, dirty) => {
    // console.log('values ', Object.keys(initialValues), Object.keys(initialValues).reverse());
    // let validationArr = Object.keys(initialValues).reverse()

    // .map((item) => {
    //   return formik.setTouched({ ...formik.touched, [item]: true });
    // });

    setOpenUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setOpenUpdateModal(false);
    updateEmployeeData();
  };

  const handleChangeWaSwitch = (evt) => {
    if (evt.target.checked) {
      setIsChecked(!isChecked);
      document.getElementById('whatsappNumber').value = state.mobileNumber;
      document.getElementById('whatsappNumber').focus();
      document.getElementById('whatsappNumber').blur();

      setState({
        ...state,
        whatsappNumber: state.mobileNumber,
      });
    } else {
      setIsChecked(!isChecked);
      document.getElementById('whatsappNumber').value = '';
      setState({
        ...state,
        whatsappNumber: '',
      });
    }

    console.log('state.mobileNumber', state.mobileNumber);
    console.log('state.whatsappNumber', state.whatsappNumber);
  };

  const handleChangeEvent = (evt) => {
    console.log('evt.target.value', evt.target.value);
    console.log('evt.target.name', evt.target.name);

    setState({
      ...state,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleChangeTeamlead = (evt) => {
    console.log('evt.target.value', evt.target.value);
    console.log('evt.target.name', evt.target.name);

    setState({
      ...state,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleChangeDropDown = (evt) => {
    if (evt.target.value === 'New') {
      document.employeeForm.replacementEcode.value = 'NA';
      document.employeeForm.replacementEcode.readOnly = true;
      state.replacementEcode = 'NA';
      setState({
        ...state,
        newReplacement: 'NA',
      });
    } else {
      document.employeeForm.replacementEcode.value = '';
      document.employeeForm.replacementEcode.readOnly = false;
      state.replacementEcode = '';
      setState({
        ...state,
        newReplacement: '',
      });
    }
  };

  const navigate = useNavigate();
  const location = useLocation();
  console.log('location', location);

  const EmployeeList = () => {
    navigate('/EmployeesBP');
  };

  const failFocus = (autoFocusObj) => {
    autoFocusObj.focus();
    return false;
  };

  const validForm = () => {
    if (document.employeeForm.employeeFirstName.value === '') {
      return failFocus(document.employeeForm.employeeFirstName);
    }
    if (document.employeeForm.employeeLastName.value === '') {
      return failFocus(document.employeeForm.employeeLastName);
    }
    if (document.employeeForm.employeeFullName.value === '') {
      return failFocus(document.employeeForm.employeeFullName);
    }
    if (document.employeeForm.mobileNumber.value === '') {
      return failFocus(document.employeeForm.mobileNumber);
    }
    if (document.employeeForm.whatsappNumber.value === '') {
      return failFocus(document.employeeForm.whatsappNumber);
    }
    if (document.employeeForm.personalEmail.value === '') {
      return failFocus(document.employeeForm.personalEmail);
    }
    if (document.employeeForm.officialEmail.value === '') {
      return failFocus(document.employeeForm.officialEmail);
    }

    if (document.employeeForm.partnerName.value === '') {
      return failFocus(document.employeeForm.partnerName);
    }

    if (document.employeeForm.employeeId.value === '') {
      return failFocus(document.employeeForm.employeeId);
    }

    if (document.employeeForm.joiningDate.value === '') {
      return failFocus(document.employeeForm.joiningDate);
    }

    if (document.employeeForm.newReplacement.value === '') {
      return failFocus(document.employeeForm.newReplacement);
    }

    if (document.employeeForm.replacementEcode.value === '') {
      return failFocus(document.employeeForm.replacementEcode);
    }

    if (document.employeeForm.supportDevelopment.value === '') {
      return failFocus(document.employeeForm.supportDevelopment);
    }

    if (document.employeeForm.employeeStatus.value === '') {
      return failFocus(document.employeeForm.employeeStatus);
    }

    if (document.employeeForm.reportingTeamLead.value === '') {
      return failFocus(document.employeeForm.reportingTeamLead);
    }
    if (document.employeeForm.reportingManager.value === '') {
      return failFocus(document.employeeForm.reportingManager);
    }

    if (document.employeeForm.billingSlab.value === '') {
      return failFocus(document.employeeForm.billingSlab);
    }

    return true;
  };

  const saveEmployeeData = () => {
    // event.preventDefault();

    if (validForm()) {
      state.employeeFullName = `${state.employeeFirstName} ${state.employeeLastName}`;

      const employeeFormObj = new FormData(document.getElementById('employeeForm'));

      const employeeFormData = Object.fromEntries(employeeFormObj.entries());
      console.log('employeeFormData::', employeeFormData);
      console.log('JSON:employeeFormData::', JSON.stringify(employeeFormData));

      Configuration.saveEmployeeData(employeeFormData).then((employeeFormRes) => {
        console.log('employeeFormRes::', employeeFormRes.data);
        navigate('/EmployeesBP');
      });
    }
  };

  const updateEmployeeData = () => {
    document.getElementById('employeeStatus').value = 'Pending For TL Review';
    if (validForm()) {
      console.log('FROM VALID FORM');
      state.employeeFullName = `${state.employeeFirstName} ${state.employeeLastName}`;
      const employeeFormObj = new FormData(document.getElementById('employeeForm'));
      const employeeFormData = Object.fromEntries(employeeFormObj.entries());
      console.log('employeeFormData::', employeeFormData);
      console.log('UPDATE --- JSON:employeeFormData ::', JSON.stringify(employeeFormData));

      // Configuration.updateEmployeeData(employeeFormData).then((employeeFormRes) => {
      //   console.log('employeeFormRes::', employeeFormRes.data);
      //   navigate('/EmployeesBP');
      // });
    }
  };

  const [partnerName, setPartnerName] = useState();

  const [empData = {}, setEmpData] = useState();

  const [reportingList = [], setReportingList] = useState();

  useEffect(() => {
    const USERDETAILS = JSON.parse(sessionStorage.getItem('USERDETAILS'));
    const REPORTINGDETAILS = JSON.parse(sessionStorage.getItem('REPORTINGDETAILS'));

    if (USERDETAILS != null) {
      console.log('USERDETAILS', USERDETAILS);

      setReportingList(REPORTINGDETAILS);

      setPartnerName(USERDETAILS.partnerName);
      state.partnerName = USERDETAILS.partnerName;
      state.createdBy = USERDETAILS.spocEmailId;
    }
  }, []);

  useEffect(() => {
    const viewEmployeeReq = {
      id: location.state.id,
    };

    Configuration.viewEmployeeData(viewEmployeeReq).then((viewEmployeeRes) => {
      console.log('employeeFormRes::', viewEmployeeRes.data);
      const EMP_DETAILS_STR = JSON.stringify(viewEmployeeRes.data);
      const EMP_DETAILS = JSON.parse(EMP_DETAILS_STR);

      // Object.keys(EMP_DETAILS).forEach((key) => {
      //   if (EMP_DETAILS[key] === null) {
      //     EMP_DETAILS[key] = '--';
      //   }
      // });
      console.log('EMP_DETAILS::', EMP_DETAILS);
      setEmpData(EMP_DETAILS);
      setState({
        ...state,
        newReplacement: EMP_DETAILS.newReplacement,
        id: EMP_DETAILS.id,
        employeeId: EMP_DETAILS.employeeId,
        employeeStatus: EMP_DETAILS.employeeStatus,
        supportDevelopment: EMP_DETAILS.supportDevelopment,
        evaluationPeriod: EMP_DETAILS.evaluationPeriod,
        projectType: EMP_DETAILS.projectType,
        maximusOpus: EMP_DETAILS.maximusOpus,
        billingSlab: EMP_DETAILS.billingSlab,
        invoiceType: EMP_DETAILS.invoiceType,
        reportingTeamLead: EMP_DETAILS.reportingTeamLead,
        reportingManager: EMP_DETAILS.reportingManager,
        functionDesc: EMP_DETAILS.functionDesc,
        employeeFirstName: EMP_DETAILS.employeeFirstName,
        employeeLastName: EMP_DETAILS.employeeLastName,
        officialEmail: EMP_DETAILS.officialEmail,
        personalEmail: EMP_DETAILS.personalEmail,
        mobileNumber: EMP_DETAILS.mobileNumber,
        whatsappNumber: EMP_DETAILS.whatsappNumber,
        joiningDate: EMP_DETAILS.joiningDate,
        replacementEcode: EMP_DETAILS.replacementEcode,
      });
    });
  }, []);

  const initialValues = {
    employeeFirstName: state.employeeFirstName || '',
    employeeLastName: state.employeeLastName || '',
    employeeFullName: `${state.employeeFirstName} ${state.employeeLastName}` || '',
    mobileNumber: state.mobileNumber || '',
    whatsappNumber: state.whatsappNumber || '',
    personalEmail: state.personalEmail || '',
    officialEmail: state.officialEmail || '',
    employeeId: state.employeeId || '',
    joiningDate: state.joiningDate || '',
    newReplacement: state.newReplacement || '',
    replacementEcode: state.replacementEcode || '',
    supportDevelopment: state.supportDevelopment || '',
    evaluationPeriod: state.evaluationPeriod || '',
    reportingTeamLead: state.reportingTeamLead || '',
    reportingManager: state.reportingManager || '',

    billingSlab: state.billingSlab || '',
  };

  const validationSchema = Yup.object({
    employeeFirstName: Yup.string()
      .required('First name is required')
      .matches(/^[a-zA-Z]+$/, '* This field cannot contain white space and special character'),
    employeeLastName: Yup.string()
      .required('Last name is required')
      .matches(/^[a-zA-Z]+$/, '* This field cannot contain white space and special character'),
    mobileNumber: Yup.string()
      .matches(/^[6-9]\d{9}$/, {
        message: 'Please enter valid number.',
        excludeEmptyString: false,
      })
      .required('Mobile Number is required'),
    whatsappNumber: Yup.string()
      .matches(/^[6-9]\d{9}$/, {
        message: 'Please enter valid number.',
        excludeEmptyString: false,
      })
      .required('Whatsapp Number is required'),
    personalEmail: Yup.string().email('Invalid personal email').required('Personal email is required'),
    officialEmail: Yup.string()
      .email('Invalid official email')
      .required('Official email is required')
      .notOneOf([Yup.ref('personalEmail'), null], 'Official email must be different from personal email'),
    employeeId: Yup.string().required('Employee code is required'),
    joiningDate: Yup.string().required('Required'),
    newReplacement: Yup.string().nullable().required('Please Select'),
    supportDevelopment: Yup.string().required('Please Select'),
    evaluationPeriod: Yup.string().nullable().required('Please Select'),
    reportingTeamLead: Yup.string().required('Please Select'),
    reportingManager: Yup.string().required('Please Select'),
    billingSlab: Yup.string().required('Billing Slab is required'),
    replacementEcode: Yup.string().required('Employee code required'),
  });

  return (
    <>
      <Helmet>
        <title> HR Portal | Employee Details (Partner)</title>
      </Helmet>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
          <Typography variant="h4">Employee Details </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:list-fill" />} onClick={EmployeeList}>
            Employee List
          </Button>
        </Stack>

        <Stack alignItems="center" justifyContent="center" spacing={5} sx={{ my: 2 }}>
          <Modal
            open={openModal || openUpdateModal}
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
              {openModal ? (
                <Typography id="modal-modal-description" sx={{ mt: 1, textAlign: 'center' }}>
                  Are you sure you want to save details ?
                </Typography>
              ) : (
                <Typography id="modal-modal-description" sx={{ mt: 1, textAlign: 'center' }}>
                  Are you sure you want to Update employee details?
                </Typography>
              )}

              <Grid
                container
                item
                xs={12}
                justifyContent={'center'}
                style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}
              >
                <Stack justifyContent="center">
                  <Button
                    size="medium"
                    variant="contained"
                    type="button"
                    color="primary"
                    onClick={() => (openModal ? handleCloseModal() : handleCloseUpdateModal())}
                    sx={{ mt: 2 }}
                  >
                    Yes
                  </Button>
                </Stack>
                <Stack direction="row" justifyContent="center">
                  <Button
                    size="medium"
                    variant="contained"
                    type="button"
                    color="primary"
                    onClick={() => (openModal ? setOpenModal(false) : setOpenUpdateModal(false))}
                    sx={{ mt: 2 }}
                  >
                    No
                  </Button>
                </Stack>
              </Grid>
            </Box>
          </Modal>
        </Stack>

        <Card
          container
          sx={{
            padding: '15px',
            border: '1px solid lightgray',
            borderRadius: '8px',
          }}
        >
          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => console.log('in on submit .............', values)}
          >
            {(formik) => {
              const { values, handleChange, handleSubmit, errors, handleBlur, isValid, dirty, touched } = formik;
              return (
                <form onSubmit={handleSubmit} spacing={2} method="POST" id="employeeForm" name="employeeForm">
                  <Typography variant="subtitle1" paddingBottom={'15px'}>
                    Personal Information
                  </Typography>

                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        InputLabelProps={{ shrink: true }}
                        name="employeeFirstName"
                        variant="outlined"
                        required
                        fullWidth
                        id="employeeFirstName"
                        label="First Name"
                        value={values.employeeFirstName}
                        onChange={(evt) => {
                          handleChange(evt);
                          handleChangeEvent(evt);
                        }}
                        onBlur={handleBlur}
                        error={touched.employeeFirstName ? errors.employeeFirstName : ''}
                        helperText={touched.employeeFirstName ? formik.errors.employeeFirstName : ''}
                        disabled={
                          state.employeeStatus === 'Pending For TL Review' ||
                          state.employeeStatus === 'Pending For SM Review' ||
                          state.employeeStatus === 'Pending For IT Spoc Review' ||
                          state.employeeStatus === 'Resigned'
                        }
                      />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <TextField
                        InputLabelProps={{ shrink: true }}
                        autoComplete="off"
                        name="employeeLastName"
                        variant="outlined"
                        required
                        fullWidth
                        id="employeeLastName"
                        label="Last Name"
                        value={values.employeeLastName}
                        onChange={(evt) => {
                          handleChange(evt);
                          handleChangeEvent(evt);
                        }}
                        onBlur={handleBlur}
                        error={touched.employeeLastName ? errors.employeeLastName : ''}
                        helperText={touched.employeeLastName ? formik.errors.employeeLastName : ''}
                        disabled={
                          state.employeeStatus === 'Pending For TL Review' ||
                          state.employeeStatus === 'Pending For SM Review' ||
                          state.employeeStatus === 'Pending For IT Spoc Review' ||
                          state.employeeStatus === 'Resigned'
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        InputLabelProps={{ shrink: true }}
                        autoComplete="off"
                        name="employeeFullName"
                        variant="outlined"
                        required
                        fullWidth
                        id="employeeFullName"
                        label="Full Name"
                        value={values.employeeFullName}
                        onChange={(evt) => {
                          handleChange(evt);
                          handleChangeEvent(evt);
                        }}
                        onBlur={handleBlur}
                        error={touched.employeeFullName ? errors.employeeFullName : ''}
                        helperText={touched.employeeFullName ? formik.errors.employeeFullName : ''}
                        disabled={
                          state.employeeStatus === 'Pending For TL Review' ||
                          state.employeeStatus === 'Pending For SM Review' ||
                          state.employeeStatus === 'Pending For IT Spoc Review' ||
                          state.employeeStatus === 'Resigned'
                        }
                      />
                    </Grid>

                    <Grid item xs={4}>
                      <TextField
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                        required
                        fullWidth
                        id="mobileNumber"
                        label="Mobile Number"
                        name="mobileNumber"
                        autoComplete="off"
                        type="number"
                        value={values.mobileNumber ?? ''}
                        onChange={(evt) => {
                          handleChange(evt);
                          handleChangeEvent(evt);
                        }}
                        onBlur={handleBlur}
                        // error={Boolean(formik.errors.mobileNumber)}
                        error={touched.mobileNumber ? errors.mobileNumber : ''}
                        helperText={touched.mobileNumber ? formik.errors.mobileNumber : ''}
                        disabled={
                          state.employeeStatus === 'Pending For TL Review' ||
                          state.employeeStatus === 'Pending For SM Review' ||
                          state.employeeStatus === 'Pending For IT Spoc Review' ||
                          state.employeeStatus === 'Resigned'
                        }
                      />
                    </Grid>
                    <Grid item xs={4} textAlign="center">
                      <Typography variant="body1">WhatsApp is available on same number?</Typography>
                      <Typography variant="body1" display={'inline'}>
                        No
                      </Typography>
                      {state.mobileNumber === state.whatsappNumber ? (
                        <Switch
                          color="success"
                          onChange={handleChangeWaSwitch}
                          defaultChecked={state.whatsappNumber !== '' ? false : null}
                          disabled={
                            state.employeeStatus === 'Pending For TL Review' ||
                            state.employeeStatus === 'Pending For SM Review' ||
                            state.employeeStatus === 'Pending For IT Spoc Review' ||
                            state.employeeStatus === 'Resigned'
                          }
                        />
                      ) : (
                        <Switch
                          color="success"
                          onChange={handleChangeWaSwitch}
                          defaultChecked={false}
                          disabled={
                            state.employeeStatus === 'Pending For TL Review' ||
                            state.employeeStatus === 'Pending For SM Review' ||
                            state.employeeStatus === 'Pending For IT Spoc Review' ||
                            state.employeeStatus === 'Resigned'
                          }
                        />
                      )}
                      {/* <Switch color="success" onChange={handleChangeWaSwitch} checked={isChecked} disabled={
                            state.employeeStatus === 'Pending For TL Review' ||
                            state.employeeStatus === 'Pending For SM Review' ||
                            state.employeeStatus === 'Pending For IT Spoc Review'
                          }/> */}
                      <Typography variant="body1" display={'inline'}>
                        Yes
                      </Typography>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <TextField
                        variant="outlined"
                        autoComplete="off"
                        name="whatsappNumber"
                        required
                        fullWidth
                        id="whatsappNumber"
                        label="Whatsapp Number"
                        value={values.whatsappNumber}
                        onBlur={(evt) => {
                          handleChange(evt);
                          handleChangeEvent(evt);
                        }}
                        onChange={(evt) => {
                          handleChange(evt);
                          handleChangeEvent(evt);
                        }}
                        error={touched.whatsappNumber ? errors.whatsappNumber : ''}
                        helperText={touched.whatsappNumber ? formik.errors.whatsappNumber : ''}
                        disabled={
                          state.employeeStatus === 'Pending For TL Review' ||
                          state.employeeStatus === 'Pending For SM Review' ||
                          state.employeeStatus === 'Pending For IT Spoc Review' ||
                          state.employeeStatus === 'Resigned'
                        }
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <TextField
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                        required
                        fullWidth
                        id="personalEmail"
                        label="Personal Email"
                        name="personalEmail"
                        autoComplete="off"
                        type="email"
                        value={values.personalEmail}
                        onChange={(evt) => {
                          handleChange(evt);
                          handleChangeEvent(evt);
                        }}
                        onBlur={handleBlur}
                        // error={Boolean(formik.errors.personalEmail)}
                        // helperText={formik.errors.personalEmail}
                        error={touched.personalEmail ? errors.personalEmail : ''}
                        helperText={touched.personalEmail ? formik.errors.personalEmail : ''}
                        disabled={
                          state.employeeStatus === 'Pending For TL Review' ||
                          state.employeeStatus === 'Pending For SM Review' ||
                          state.employeeStatus === 'Pending For IT Spoc Review' ||
                          state.employeeStatus === 'Resigned'
                        }
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                        required
                        fullWidth
                        name="officialEmail"
                        label="Official Email"
                        id="officialEmail"
                        autoComplete="off"
                        type="email"
                        value={values.officialEmail}
                        onChange={(evt) => {
                          handleChange(evt);
                          handleChangeEvent(evt);
                        }}
                        onBlur={handleBlur}
                        error={touched.officialEmail ? errors.officialEmail : ''}
                        helperText={touched.officialEmail ? formik.errors.officialEmail : ''}
                        disabled={
                          state.employeeStatus === 'Pending For TL Review' ||
                          state.employeeStatus === 'Pending For SM Review' ||
                          state.employeeStatus === 'Pending For IT Spoc Review' ||
                          state.employeeStatus === 'Resigned'
                        }
                      />
                    </Grid>
                  </Grid>
                  <br />
                  <Typography variant="subtitle1" paddingBottom={'15px'}>
                    Employment Details
                  </Typography>

                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        InputLabelProps={{ shrink: true }}
                        autoComplete="off"
                        name="partnerName"
                        variant="outlined"
                        required
                        fullWidth
                        id="partnerName"
                        label="Partner Name"
                        value={partnerName}
                        // onBlur={handleChange}
                        onChange={(evt) => {
                          handleChange(evt);
                          handleChangeEvent(evt);
                        }}
                        onBlur={handleBlur}
                        error={touched.partnerName ? errors.partnerName : ''}
                        helperText={touched.partnerName ? formik.errors.partnerName : ''}
                        disabled={
                          state.employeeStatus === 'Pending For TL Review' ||
                          state.employeeStatus === 'Pending For SM Review' ||
                          state.employeeStatus === 'Pending For IT Spoc Review' ||
                          state.employeeStatus === 'Resigned'
                        }
                      />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      {state.employeeStatus === 'Active' && <input type="hidden" value={state.id} id="id" name="id" />}

                      <TextField
                        InputLabelProps={{ shrink: true }}
                        autoComplete="off"
                        name="employeeId"
                        variant="outlined"
                        required
                        fullWidth
                        id="employeeId"
                        label="Employee Code"
                        value={values.employeeId}
                        onChange={(evt) => {
                          handleChange(evt);
                          handleChangeEvent(evt);
                        }}
                        onBlur={handleBlur}
                        error={touched.employeeId ? errors.employeeId : ''}
                        helperText={touched.employeeId ? formik.errors.employeeId : ''}
                        disabled={
                          state.employeeStatus === 'Pending For TL Review' ||
                          state.employeeStatus === 'Pending For SM Review' ||
                          state.employeeStatus === 'Pending For IT Spoc Review' ||
                          state.employeeStatus === 'Resigned'
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        InputLabelProps={{ shrink: true }}
                        autoComplete="off"
                        name="joiningDate"
                        variant="outlined"
                        required
                        fullWidth
                        id="joiningDate"
                        label="Date of Joining"
                        type="date"
                        inputProps={{
                          min: new Date().toISOString().split('T')[0],
                        }}
                        value={values.joiningDate}
                        onChange={(evt) => {
                          handleChange(evt);
                          handleChangeEvent(evt);
                        }}
                        onBlur={handleBlur}
                        error={touched.joiningDate ? errors.joiningDate : ''}
                        helperText={touched.joiningDate ? formik.errors.joiningDate : ''}
                        disabled={
                          state.employeeStatus === 'Pending For TL Review' ||
                          state.employeeStatus === 'Pending For SM Review' ||
                          state.employeeStatus === 'Pending For IT Spoc Review' ||
                          state.employeeStatus === 'Resigned'
                        }
                      />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <TextField
                        labelId="demo-select-small"
                        id="newReplacement"
                        name="newReplacement"
                        select
                        label="New / Replacement"
                        fullWidth
                        required
                        onChange={(evt) => {
                          handleChange(evt);
                          handleChangeDropDown(evt);
                        }}
                        value={values.newReplacement}
                        onBlur={handleBlur}
                        error={touched.newReplacement ? errors.newReplacement : ''}
                        helperText={touched.newReplacement ? formik.errors.newReplacement : ''}
                        disabled={
                          state.employeeStatus === 'Pending For TL Review' ||
                          state.employeeStatus === 'Pending For SM Review' ||
                          state.employeeStatus === 'Pending For IT Spoc Review' ||
                          state.employeeStatus === 'Resigned'
                        }
                      >
                        {newReplacementList.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <TextField
                        autoComplete="off"
                        name="replacementEcode"
                        variant="outlined"
                        required
                        fullWidth
                        id="replacementEcode"
                        label="Replacement Employee Code"
                        value={values.replacementEcode}
                        onChange={(evt) => {
                          handleChangeEvent(evt);
                          handleChange(evt);
                        }}
                        onBlur={handleBlur}
                        error={touched.replacementEcode ? errors.replacementEcode : ''}
                        helperText={touched.replacementEcode ? formik.errors.replacementEcode : ''}
                        disabled={
                          state.employeeStatus === 'Pending For TL Review' ||
                          state.employeeStatus === 'Pending For SM Review' ||
                          state.employeeStatus === 'Pending For IT Spoc Review' ||
                          state.employeeStatus === 'Resigned'
                        }
                      />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <TextField
                        labelId="demo-select-small"
                        id="supportDevelopment"
                        name="supportDevelopment"
                        select
                        label="Support / Development"
                        fullWidth
                        required
                        onChange={(evt) => {
                          handleChange(evt);
                          handleChangeEvent(evt);
                        }}
                        value={values.supportDevelopment}
                        onBlur={handleBlur}
                        error={touched.supportDevelopment ? errors.supportDevelopment : ''}
                        helperText={touched.supportDevelopment ? formik.errors.supportDevelopment : ''}
                        disabled={
                          state.employeeStatus === 'Pending For TL Review' ||
                          state.employeeStatus === 'Pending For SM Review' ||
                          state.employeeStatus === 'Pending For IT Spoc Review' ||
                          state.employeeStatus === 'Resigned'
                        }
                      >
                        {supportDevelopmentList.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <input type="hidden" id="reportingItSpoc" name="reportingItSpoc" value="" />
                      <input type="hidden" id="createdBy" name="createdBy" value={state.createdBy} />
                      <FormControl fullWidth>
                        <InputLabel id="demo-select-small">Employee Status</InputLabel>

                        <Select
                          InputLabelProps={{ shrink: true }}
                          labelId="demo-select-small"
                          id="employeeStatus"
                          name="employeeStatus"
                          required
                          label="Employee Status"
                          fullWidth
                          value={values.employeeStatus}
                          defaultValue={'Pending For TL Review'}
                          disabled={
                            state.employeeStatus === 'Pending For TL Review' ||
                            state.employeeStatus === 'Pending For SM Review' ||
                            state.employeeStatus === 'Pending For IT Spoc Review' ||
                            state.employeeStatus === 'Resigned'
                          }
                        >
                          {/* <MenuItem value={state.employeeStatus}>{state.employeeStatus}</MenuItem> */}
                          <MenuItem value="Pending For TL Review">Pending For TL Review</MenuItem>
                          {/* <MenuItem value="Resigned">P</MenuItem> */}
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <TextField
                        labelId="demo-select-small"
                        id="evaluationPeriod"
                        name="evaluationPeriod"
                        select
                        label="Evaluation Period"
                        fullWidth
                        required
                        onChange={(evt) => {
                          handleChange(evt);
                          handleChangeEvent(evt);
                        }}
                        value={values.evaluationPeriod}
                        onBlur={handleBlur}
                        error={touched.evaluationPeriod ? errors.evaluationPeriod : ''}
                        helperText={touched.evaluationPeriod ? formik.errors.evaluationPeriod : ''}
                        disabled={
                          state.employeeStatus === 'Pending For TL Review' ||
                          state.employeeStatus === 'Pending For SM Review' ||
                          state.employeeStatus === 'Pending For IT Spoc Review' ||
                          state.employeeStatus === 'Resigned'
                        }
                      >
                        {evaluationPeriodList.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                  </Grid>
                  <br />

                  <Typography variant="subtitle1" paddingBottom={'15px'}>
                    Reporting Authorities
                  </Typography>

                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        labelId="demo-select-small"
                        id="reportingTeamLead"
                        name="reportingTeamLead"
                        select
                        label="Reporting Authority (TL)"
                        fullWidth
                        required
                        onChange={(evt) => {
                          handleChange(evt);
                          handleChangeEvent(evt);
                        }}
                        value={values.reportingTeamLead}
                        onBlur={handleBlur}
                        error={touched.reportingTeamLead ? errors.reportingTeamLead : ''}
                        helperText={touched.reportingTeamLead ? formik.errors.reportingTeamLead : ''}
                        disabled={
                          state.employeeStatus === 'Pending For TL Review' ||
                          state.employeeStatus === 'Pending For SM Review' ||
                          state.employeeStatus === 'Pending For IT Spoc Review' ||
                          state.employeeStatus === 'Resigned'
                        }
                      >
                        {reportingList.map((RAs) => (
                          <MenuItem key={RAs.teamLeadEmail} value={RAs.teamLeadEmail}>
                            {RAs.teamLeadName}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        labelId="demo-select-small"
                        id="reportingManager"
                        name="reportingManager"
                        select
                        label="Reporting Authority (SM)"
                        fullWidth
                        required
                        onChange={(evt) => {
                          handleChange(evt);
                          handleChangeEvent(evt);
                        }}
                        value={values.reportingManager}
                        onBlur={handleBlur}
                        error={touched.reportingManager ? errors.reportingManager : ''}
                        helperText={touched.reportingManager ? formik.errors.reportingManager : ''}
                        disabled={
                          state.employeeStatus === 'Pending For TL Review' ||
                          state.employeeStatus === 'Pending For SM Review' ||
                          state.employeeStatus === 'Pending For IT Spoc Review' ||
                          state.employeeStatus === 'Resigned'
                        }
                      >
                        {reportingList.map((RAs) =>
                          RAs.teamLeadEmail === state.reportingTeamLead ? (
                            <MenuItem key={RAs.managerEmail} value={RAs.managerEmail}>
                              {RAs.managerName}
                            </MenuItem>
                          ) : null
                        )}
                      </TextField>
                    </Grid>

                    <br />

                    <Grid item xs={12} sm={6}>
                      <TextField
                        autoComplete="off"
                        name="billingSlab"
                        variant="outlined"
                        required
                        fullWidth
                        id="billingSlab"
                        label="Billing Slab"
                        value={values.billingSlab}
                        onChange={(evt) => {
                          handleChange(evt);
                          handleChangeEvent(evt);
                        }}
                        onBlur={handleBlur}
                        disabled={
                          state.employeeStatus === 'Pending For TL Review' ||
                          state.employeeStatus === 'Pending For SM Review' ||
                          state.employeeStatus === 'Pending For IT Spoc Review' ||
                          state.employeeStatus === 'Resigned'
                        }
                        error={touched.billingSlab ? errors.billingSlab : ''}
                        helperText={touched.billingSlab ? formik.errors.billingSlab : ''}
                      />
                    </Grid>
                  </Grid>
                  <br />

                  <Grid container item xs={12} justifyContent={'center'}>
                    <Stack spacing={2} direction="row" justifyContent="center">
                      {state.employeeStatus === 'Rejected by TL' ||
                      state.employeeStatus === 'Rejected by SM' ||
                      state.employeeStatus === 'Rejected by IT Spoc' ? (
                        <Button
                          size="medium"
                          variant="contained"
                          type="button"
                          color="primary"
                          className={!isValid ? 'disabled-btn' : ''}
                          disabled={!isValid}
                          onClick={() => handleOpenModal()}
                        >
                          Save
                        </Button>
                      ) : state.employeeStatus === 'Active' ? (
                        <Button
                          size="medium"
                          variant="contained"
                          type={'button'}
                          // type="submit"
                          color="primary"
                          className={!isValid ? 'disabled-btn' : ''}
                          // disabled={!(isValid)}
                          // disabled={isSubmitting}
                          onClick={() => handleOpenUpdateModal(formik, isValid, dirty)}
                        >
                          Update
                        </Button>
                      ) : null}
                    </Stack>
                  </Grid>
                </form>
              );
            }}
          </Formik>
        </Card>
      </Container>
    </>
  );
}
