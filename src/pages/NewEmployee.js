import { useNavigate } from 'react-router-dom';
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

import { Formik } from 'formik';
import * as Yup from 'yup';
// components
import FlatList from 'flatlist-react';
import addMonths from 'date-fns/addMonths';
import format from 'date-fns/format';

import Iconify from '../components/iconify';
import Configuration from '../utils/Configuration';

export default function EmployeeList() {
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
    joiningDate: ''.split('T')[0],
    newReplacement: '',
    replacementEcode: '',
    supportDevelopment: '',
    reportingTeamLead: '',
    reportingManager: '',
    gender: '',
    dateOfBirth: '',
    experience: '',
    totalExperience: '',
    skillSet: '',
    // reportingAvpVpSvp: '',
    // verticalHeadHod: '',
    // functionDesc: '',
    // departmentDesc: '',
    // verticalMain: '',
    // verticalSub: '',
    // projectType: '',
    // maximusOpus: '',
    billingSlab: '',
    // invoiceType: '',
    createdBy: '',
    employeeStatus: '',
    // mainVerticalList: [],
    // subVerticalList: [],
    // departmentList: [],
    // functionsList: [],
    // projectsList: [],
    // invoiceList: [],
    evaluationPeriod: '',
    tlList: [],
  });

  const [openModal, setOpenModal] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [teamLeadBySMList = [], setTeamLeadBySMList] = useState();
  const [referenceNumber, setReferenceNumber] = useState();
  const [selectedTL, setSelectedTL] = useState()
  const [selectedSM, setSelectedSM] = useState()
  console.log("Selected TL", selectedTL)
  console.log("Selected SM", selectedSM)
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

  const genderList = [
    {
      value: 'Male',
      label: 'Male',
    },
    {
      value: 'Female',
      label: 'Female',
    },
  ];

  const experienceSlab = [
    {
      value: '0 - 2 years',
      label: '0 - 2 years',
    },
    {
      value: '2 - 4 years',
      label: '2 - 4 years',
    },
    {
      value: '4 - 6 years',
      label: '4 - 6 years',
    },
    {
      value: '6 - 8 years',
      label: '6 - 8 years',
    },
    {
      value: '8 - 10 years',
      label: '8 - 10 years',
    },
    {
      value: '10 years and above',
      label: '10 years and above',
    },
  ];

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
  const supportDevelopmentList = [
    {
      value: 'Support',
      label: 'Support',
    },
    {
      value: 'Development',
      label: 'Development',
    },
    {
      value: 'Testing',
      label: 'Testing',
    },
    {
      value: 'MIS',
      label: 'MIS',
    },
    {
      value: 'Project',
      label: 'Project',
    },
  ];

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    saveEmployeeData();
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

  const handleChangeSM = (evt) => {
    console.log('evt.target.value MANAGER', evt.target.value);
    console.log('evt.target.name', evt.target.name);

    setState({
      ...state,
      [evt.target.name]: evt.target.value,
    });

    const getTLBySMListReq = {
      managerEmail: evt.target.value,
    };

    Configuration.getTLBySM(getTLBySMListReq).then((getTLBySMListRes) => {
      console.log('departmentList', getTLBySMListRes.data);
      state.tlList = getTLBySMListRes?.data;
      setTeamLeadBySMList(state.tlList);
    });
  };

  const handleChangeDropDown = (evt) => {
    if (evt.target.value === 'New') {
      document.employeeForm.replacementEcode.value = 'NA';
      document.employeeForm.replacementEcode.readOnly = true;
      state.replacementEcode = 'NA';
    } else {
      document.employeeForm.replacementEcode.value = '';
      document.employeeForm.replacementEcode.readOnly = false;
      state.replacementEcode = '';
    }
  };

  const navigate = useNavigate();
  const EmployeeList = () => {
    navigate('/EmployeesBP');
  };

  const failFocus = (autoFocusObj) => {
    autoFocusObj.focus();
    return false;
  };

  const validForm = () => {
    const employeeFormObj = new FormData(document.getElementById('employeeForm'));

    const employeeFormData = Object.fromEntries(employeeFormObj.entries());

    console.log('JSON:employeeFormData::', JSON.stringify(employeeFormData));
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
    if (document.employeeForm.skillSet.value === '') {
      return failFocus(document.employeeForm.skillSet);
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

    if (document.employeeForm.gender.value === '') {
      return failFocus(document.employeeForm.gender);
    }
    if (document.employeeForm.dateOfBirth.value === '') {
      return failFocus(document.employeeForm.dateOfBirth);
    }
    if (document.employeeForm.experience.value === '') {
      return failFocus(document.employeeForm.experience);
    }
    if (document.employeeForm.totalExperience.value === '') {
      return failFocus(document.employeeForm.totalExperience);
    }

    return true;
  };

  const saveEmployeeData = () => {
    if (validForm()) {
      state.employeeFullName = `${state.employeeFirstName} ${state.employeeLastName}`;

      const employeeFormObj = new FormData(document.getElementById('employeeForm'));

      const employeeFormData = Object.fromEntries(employeeFormObj.entries());
      console.log('employeeFormData::', employeeFormData);
      console.log('JSON:employeeFormData::', JSON.stringify(employeeFormData));

      Configuration.saveEmployeeData(employeeFormData).then((employeeFormRes) => {
        console.log('employeeFormRes::', employeeFormRes.data);

        setReferenceNumber(employeeFormRes.data.id);

        if (employeeFormRes) {
          setOpenSuccessModal(true);
        }
        // navigate('/EmployeesBP');
      });
    }
  };

  const [partnerName, setPartnerName] = useState();
  const [reportingList = [], setReportingList] = useState();

  useEffect(() => {
    const USERDETAILS = JSON.parse(sessionStorage.getItem('USERDETAILS'));
    const REPORTINGDETAILS = JSON.parse(sessionStorage.getItem('REPORTINGDETAILS'));
    const FUNCTIONSDETAILS = JSON.parse(sessionStorage.getItem('FUNCTIONSDETAILS'));

    if (USERDETAILS != null) {
      console.log('USERDETAILS', USERDETAILS);
      console.log('REPORTINGDETAILS', REPORTINGDETAILS);
      console.log('FUNCTIONSDETAILS', FUNCTIONSDETAILS);
      console.log('USERDETAILS.partnerName', USERDETAILS.partnerName);

      setReportingList(REPORTINGDETAILS);

      const mainVerticalReq = {
        key: 'MAIN_VERTICAL',
        value: '',
      };

      console.log('mainVerticalReq', mainVerticalReq);

      setPartnerName(USERDETAILS.partnerName);
      state.partnerName = USERDETAILS.partnerName;
      state.createdBy = USERDETAILS.spocEmailId;
    }
  }, []);

  const initialValues = {
    employeeFirstName: state.employeeFirstName,
    employeeLastName: state.employeeLastName,
    employeeFullName: `${state.employeeFirstName} ${state.employeeLastName}`,
    mobileNumber: state.mobileNumber,
    whatsappNumber: state.whatsappNumber || '',
    personalEmail: state.personalEmail,
    officialEmail: state.officialEmail,
    employeeId: state.employeeId,
    joiningDate: state.joiningDate,
    newReplacement: state.newReplacement,
    replacementEcode: state.replacementEcode,
    supportDevelopment: state.supportDevelopment,
    evaluationPeriod: state.evaluationPeriod,
    reportingTeamLead: state.reportingTeamLead,
    reportingManager: state.reportingManager,
    verticalMain: state.verticalMain,
    verticalSub: state.verticalSub,
    departmentDesc: state.departmentDesc,
    functionDesc: state.functionDesc,
    billingSlab: state.billingSlab,
    isChecked,
    gender: state.gender,
    dateOfBirth: state.dateOfBirth,
    experience: state.experience,
    totalExperience: state.totalExperience,
    skillSet: state.skillSet,
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
      .required('Contact Number is required'),
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
    joiningDate: Yup.string().required('Date Required'),

    newReplacement: Yup.string().required('Please Select'),
    supportDevelopment: Yup.string().required('Please Select'),
    // replacementEcode: Yup.string().required('Replacement Code required'),
    evaluationPeriod: Yup.string().required('Please Select'),
    reportingTeamLead: Yup.string().required('Please Select'),
    reportingManager: Yup.string().required('Please Select'),
    billingSlab: Yup.number()
      .min(40000, 'Min amount should be 40000')
      .max(500000, 'Max amount should be 500000')
      .required('Monthly Billing rate is required'),
    gender: Yup.string().required('Please Select'),
    experience: Yup.string().required('Please Select'),
    dateOfBirth: Yup.string().required('Date of Birth Required'),
    totalExperience: Yup.string().required('Total Experience required'),
    skillSet: Yup.string().required('Skill set are required'),
  });

  const handleReset = () => {
    console.log('Inside reset');
    setState({
      ...state,
      employeeFirstName: '',
      employeeLastName: '',
      employeeFullName: '',
      mobileNumber: '',
      whatsappNumber: '',
      personalEmail: '',
      officialEmail: '',
      employeeId: '',
      joiningDate: '',
      newReplacement: '',
      replacementEcode: '',
      supportDevelopment: '',
      reportingTeamLead: '',
      reportingManager: '',
      gender: '',
      dateOfBirth: '',
      experience: '',
      totalExperience: '',
      skillSet: '',
      // reportingAvpVpSvp: '',
      // verticalHeadHod: '',
      // functionDesc: '',
      // departmentDesc: '',
      // verticalMain: '',
      // verticalSub: '',
      // projectType: '',
      // maximusOpus: '',
      billingSlab: '',
      // invoiceType: '',
      createdBy: '',
      employeeStatus: '',
      // mainVerticalList: [],
      // subVerticalList: [],
      // departmentList: [],
      // functionsList: [],
      // projectsList: [],
      // invoiceList: [],
      evaluationPeriod: '',
    });
    setIsChecked(!false);
  };

  return (
    <>
      <Helmet>
        <title> HR Portal | New Employee </title>
      </Helmet>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
          <Typography variant="h4">Create New Employee </Typography>
          <Button
            variant="contained"
            startIcon={<Iconify icon="material-symbols:home-outline-rounded" />}
            onClick={EmployeeList}
          >
            Home
          </Button>
        </Stack>

        <Stack alignItems="center" justifyContent="center" spacing={5} sx={{ my: 2 }}>
          <Modal
            open={openModal || openSuccessModal}
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
              {openSuccessModal ? (
                <Typography id="modal-modal-description" sx={{ mt: 1, textAlign: 'center' }}>
                  Employee with Reference id <b>{referenceNumber}</b> is saved successfully.
                </Typography>
              ) : (
                <Typography id="modal-modal-description" sx={{ mt: 1, textAlign: 'center' }}>
                  Are you sure you want to save details ?
                </Typography>
              )}

              <Grid
                container
                item
                xs={12}
                justifyContent={'center'}
                style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}
              >
                {openSuccessModal ? (
                  <Stack direction="row" justifyContent="center">
                    <Button
                      size="medium"
                      variant="contained"
                      type="button"
                      color="primary"
                      // onClick={() => setApprovalModal(false)}
                      onClick={() => {
                        setOpenSuccessModal(false);
                        navigate('/EmployeesBP');
                      }}
                      sx={{ mt: 2 }}
                    >
                      OK
                    </Button>
                  </Stack>
                ) : (
                  <>
                    <Stack justifyContent="center">
                      <Button
                        size="medium"
                        variant="contained"
                        type="button"
                        color="primary"
                        onClick={() => handleCloseModal()}
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
                        onClick={() => setOpenModal(false)}
                        sx={{ mt: 2 }}
                      >
                        No
                      </Button>
                    </Stack>
                  </>
                )}
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
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => console.log('in on submit .............', values)}
          >
            {(formik) => {
              const { values, handleChange, handleSubmit, errors, touched, handleBlur, isValid, dirty } = formik;
              return (
                <form onSubmit={handleSubmit} spacing={2} method="POST" id="employeeForm" name="employeeForm">
                  {console.log('VALUES', formik.values)}
                  <Typography variant="subtitle1" paddingBottom={'15px'}>
                    Personal Information
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        autoComplete="off"
                        name="employeeFirstName"
                        variant="outlined"
                        required
                        fullWidth
                        id="employeeFirstName"
                        label="First name"
                        value={values.employeeFirstName}
                        onChange={(evt) => {
                          handleChange(evt);
                          handleChangeEvent(evt);
                        }}
                        onBlur={handleBlur}
                        error={touched.employeeFirstName && Boolean(errors.employeeFirstName)}
                        helperText={touched.employeeFirstName && errors.employeeFirstName}
                      />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <TextField
                        autoComplete="off"
                        name="employeeLastName"
                        variant="outlined"
                        required
                        fullWidth
                        id="employeeLastName"
                        label="Last name"
                        value={values.employeeLastName}
                        onChange={(evt) => {
                          handleChange(evt);
                          handleChangeEvent(evt);
                        }}
                        onBlur={handleBlur}
                        error={formik.touched.employeeLastName && Boolean(formik.errors.employeeLastName)}
                        helperText={formik.touched.employeeLastName && formik.errors.employeeLastName}
                      />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <TextField
                        autoComplete="off"
                        name="employeeFullName"
                        variant="outlined"
                        required
                        fullWidth
                        id="employeeFullName"
                        label="Full Name"
                        value={`${state.employeeFirstName} ${state.employeeLastName}`}
                        onChange={(evt) => {
                          handleChange(evt);
                          handleChangeEvent(evt);
                        }}
                        onBlur={handleBlur}
                        error={formik.touched.employeeFullName && Boolean(formik.errors.employeeFullName)}
                        helperText={formik.touched.employeeFullName && formik.errors.employeeFullName}
                      />
                    </Grid>

                    <Grid item xs={4}>
                      <TextField
                        autoComplete="off"
                        name="mobileNumber"
                        variant="outlined"
                        required
                        fullWidth
                        type="number"
                        id="mobileNumber"
                        label="Mobile Number"
                        value={values.mobileNumber}
                        onChange={(evt) => {
                          handleChange(evt);
                          handleChangeEvent(evt);
                        }}
                        onBlur={handleBlur}
                        error={formik.touched.mobileNumber && Boolean(formik.errors.mobileNumber)}
                        helperText={formik.touched.mobileNumber && formik.errors.mobileNumber}
                      />
                    </Grid>

                    <Grid item xs={4} textAlign="center">
                      <div
                        style={{
                          border: '1px solid lightgrey',
                          borderRadius: '5px',
                          padding: '0px',
                          maxHeight: '56px',
                        }}
                      >
                        <Typography variant="body1">Is same number available on Whatsapp ?</Typography>
                        <Typography variant="body1" display={'inline'}>
                          No
                        </Typography>
                        {/* <Switch color="success" onChange={handleChangeWaSwitch} checked={isChecked} /> */}
                        {state.mobileNumber === state.whatsappNumber ? (
                          <Switch
                            color="success"
                            onChange={handleChangeWaSwitch}
                            // defaultChecked={state.whatsappNumber !== '' ? false : null}
                            defaultChecked={false}
                            disabled={
                              state.employeeStatus === 'Pending For TL Review' ||
                              state.employeeStatus === 'Pending For SM Review' ||
                              state.employeeStatus === 'Pending For IT Spoc Review'
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
                              state.employeeStatus === 'Pending For IT Spoc Review'
                            }
                          />
                        )}
                        <Typography variant="body1" display={'inline'}>
                          Yes
                        </Typography>
                      </div>
                      <input type="hidden" id="isChecked" name="isChecked" value={values.isChecked} />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <TextField
                        autoComplete="off"
                        name="whatsappNumber"
                        variant="outlined"
                        required
                        fullWidth
                        id="whatsappNumber"
                        label="Whatsapp Number"
                        value={state.whatsappNumber}
                        onBlur={(evt) => {
                          handleChange(evt);
                          handleChangeEvent(evt);
                        }}
                        onChange={(evt) => {
                          handleChange(evt);
                          handleChangeEvent(evt);
                        }}
                        error={formik.touched.whatsappNumber && Boolean(formik.errors.whatsappNumber)}
                        helperText={formik.touched.whatsappNumber && formik.errors.whatsappNumber}
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <TextField
                        autoComplete="off"
                        name="personalEmail"
                        variant="outlined"
                        required
                        fullWidth
                        id="personalEmail"
                        placeholder="abc@gmail.com"
                        label="Personal Email"
                        value={values.personalEmail}
                        onChange={(evt) => {
                          handleChange(evt);
                          handleChangeEvent(evt);
                        }}
                        onBlur={handleBlur}
                        error={formik.touched.personalEmail && Boolean(formik.errors.personalEmail)}
                        helperText={formik.touched.personalEmail && formik.errors.personalEmail}
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <TextField
                        autoComplete="off"
                        name="officialEmail"
                        variant="outlined"
                        required
                        fullWidth
                        id="officialEmail"
                        label="Official Email"
                        value={values.officialEmail}
                        onChange={(evt) => {
                          handleChange(evt);
                          handleChangeEvent(evt);
                        }}
                        onBlur={handleBlur}
                        error={formik.touched.officialEmail && Boolean(formik.errors.officialEmail)}
                        helperText={formik.touched.officialEmail && formik.errors.officialEmail}
                      />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <TextField
                        labelId="demo-select-small"
                        id="gender"
                        name="gender"
                        select
                        label="Gender"
                        fullWidth
                        required
                        onChange={(evt) => {
                          handleChange(evt);
                          handleChangeEvent(evt);
                        }}
                        value={state.gender}
                        onBlur={handleBlur}
                        error={touched.gender ? errors.gender : ''}
                        helperText={touched.gender ? formik.errors.gender : ''}
                        disabled={
                          state.employeeStatus === 'Pending For TL Review' ||
                          state.employeeStatus === 'Pending For SM Review' ||
                          state.employeeStatus === 'Pending For IT Spoc Review'
                        }
                      >
                        {genderList.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <TextField
                        InputLabelProps={{ shrink: true }}
                        autoComplete="off"
                        name="dateOfBirth"
                        variant="outlined"
                        required
                        fullWidth
                        type="date"
                        id="dateOfBirth"
                        label="Date of Birth"
                        value={values.dateOfBirth}
                        onChange={(evt) => {
                          handleChange(evt);
                          handleChangeEvent(evt);
                        }}
                        onBlur={handleBlur}
                        error={formik.touched.dateOfBirth && Boolean(formik.errors.dateOfBirth)}
                        helperText={formik.touched.dateOfBirth && formik.errors.dateOfBirth}
                      />
                    </Grid>
                  </Grid>
                  <br />

                  {/* Employee Details */}
                  <Typography variant="subtitle1" paddingBottom={'15px'}>
                    Employment Details
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        autoComplete="off"
                        name="partnerName"
                        variant="outlined"
                        required
                        fullWidth
                        id="partnerName"
                        label="Partner Name"
                        value={partnerName}
                        onChange={(evt) => {
                          handleChange(evt);
                          handleChangeEvent(evt);
                        }}
                        onBlur={handleBlur}
                        error={formik.touched.partnerName && Boolean(formik.errors.partnerName)}
                        helperText={formik.touched.partnerName && formik.errors.partnerName}
                      />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <TextField
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
                        error={formik.touched.employeeId && Boolean(formik.errors.employeeId)}
                        helperText={formik.touched.employeeId && formik.errors.employeeId}
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
                        type="date"
                        id="joiningDate"
                        label="Date of Joining"
                        inputProps={{
                          min: new Date().toISOString().split('T')[0],
                          max: format(addMonths(new Date(), 3), 'yyyy-MM-dd'),
                        }}
                        value={values.joiningDate}
                        onChange={(evt) => {
                          handleChange(evt);
                          handleChangeEvent(evt);
                        }}
                        onBlur={handleBlur}
                        error={formik.touched.joiningDate && Boolean(formik.errors.joiningDate)}
                        helperText={formik.touched.joiningDate && formik.errors.joiningDate}
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
                          state.employeeStatus === 'Pending For IT Spoc Review'
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
                        // required
                        fullWidth
                        id="replacementEcode"
                        label="Replacement Employee Code"
                        value={state.replacementEcode}
                        onChange={(evt) => {
                          handleChangeEvent(evt);
                          handleChange(evt);
                        }}
                        onBlur={handleBlur}
                        // error={formik.touched.replacementEcode && Boolean(formik.errors.replacementEcode)}
                        // helperText={formik.touched.replacementEcode && formik.errors.replacementEcode}
                        // error={touched.replacementEcode ? errors.replacementEcode : ''}
                        // helperText={touched.replacementEcode ? formik.errors.replacementEcode : ''}
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
                          state.employeeStatus === 'Pending For IT Spoc Review'
                        }
                      >
                        {supportDevelopmentList.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>

                    <Grid item xs={12} sm={4} sx={{ display: 'none' }}>
                      <FormControl fullWidth>
                        <input
                          type="hidden"
                          id="reportingItSpoc"
                          name="reportingItSpoc"
                          value="pooja.rebba@bajajallianz.co.in"
                        />
                        <input type="hidden" id="createdBy" name="createdBy" value={state.createdBy} />

                        <InputLabel id="demo-select-small">Employee Status</InputLabel>

                        <Select
                          InputLabelProps={{ shrink: true }}
                          labelId="demo-select-small"
                          id="employeeStatus"
                          name="employeeStatus"
                          label="Employee Status"
                          fullWidth
                          onChange={(evt) => {
                            handleChange(evt);
                            handleChangeEvent(evt);
                          }}
                          onBlur={handleBlur}
                          defaultValue={'Pending For TL Review'}
                          error={formik.touched.employeeStatus && Boolean(formik.errors.employeeStatus)}
                          helperText={formik.touched.employeeStatus && formik.errors.employeeStatus}
                        >
                          <MenuItem value="Pending For TL Review">Pending For TL Review</MenuItem>
                          <MenuItem value="Resigned">Resigned</MenuItem>
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
                        value={state.evaluationPeriod}
                        onBlur={handleBlur}
                        error={touched.evaluationPeriod ? errors.evaluationPeriod : ''}
                        helperText={touched.evaluationPeriod ? formik.errors.evaluationPeriod : ''}
                        disabled={
                          state.employeeStatus === 'Pending For TL Review' ||
                          state.employeeStatus === 'Pending For SM Review' ||
                          state.employeeStatus === 'Pending For IT Spoc Review'
                        }
                      >
                        {evaluationPeriodList.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <TextField
                        labelId="demo-select-small"
                        id="experience"
                        name="experience"
                        select
                        label="Experience"
                        fullWidth
                        required
                        onChange={(evt) => {
                          handleChange(evt);
                          handleChangeEvent(evt);
                        }}
                        value={state.experience}
                        onBlur={handleBlur}
                        error={touched.experience ? errors.experience : ''}
                        helperText={touched.experience ? formik.errors.experience : ''}
                        disabled={
                          state.employeeStatus === 'Pending For TL Review' ||
                          state.employeeStatus === 'Pending For SM Review' ||
                          state.employeeStatus === 'Pending For IT Spoc Review'
                        }
                      >
                        {experienceSlab.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <TextField
                        autoComplete="off"
                        name="totalExperience"
                        variant="outlined"
                        required
                        fullWidth
                        id="totalExperience"
                        label="Total Experience"
                        value={values.totalExperience}
                        onChange={(evt) => {
                          handleChange(evt);
                          handleChangeEvent(evt);
                        }}
                        onBlur={handleBlur}
                        error={touched.totalExperience && Boolean(errors.totalExperience)}
                        helperText={touched.totalExperience && errors.totalExperience}
                      />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <TextField
                        autoComplete="off"
                        name="skillSet"
                        variant="outlined"
                        required
                        fullWidth
                        id="skillSet"
                        label="Skill Set"
                        value={values.skillSet}
                        onChange={(evt) => {
                          handleChange(evt);
                          handleChangeEvent(evt);
                        }}
                        onBlur={handleBlur}
                        error={formik.touched.skillSet && Boolean(formik.errors.skillSet)}
                        helperText={formik.touched.skillSet && formik.errors.skillSet}
                      />
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
                        id="reportingManager"
                        name="reportingManager"
                        select
                        label="Reporting Authority (SM)"
                        required
                        fullWidth
                        onChange={(evt) => {
                          handleChange(evt);
                          handleChangeSM(evt);
                          // setSelectedTL(evt.target.value)
                        }}
                        value={state.reportingManager}
                        onBlur={handleBlur}
                        error={touched.reportingManager ? errors.reportingManager : ''}
                        helperText={touched.reportingManager ? formik.errors.reportingManager : ''}
                        disabled={
                          state.employeeStatus === 'Pending For TL Review' ||
                          state.employeeStatus === 'Pending For SM Review' ||
                          state.employeeStatus === 'Pending For IT Spoc Review'
                        }
                      >
                        {reportingList.map((RAs) => (
                          <MenuItem key={RAs.managerEmail} value={RAs.managerEmail}>
                            {RAs.managerName}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>

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
                          // setSelectedSM(evt.target.value)
                        }}
                        value={state.reportingTeamLead}
                        onBlur={handleBlur}
                        error={touched.reportingTeamLead ? errors.reportingTeamLead : ''}
                        helperText={touched.reportingTeamLead ? formik.errors.reportingTeamLead : ''}
                        disabled={
                          state.employeeStatus === 'Pending For TL Review' ||
                          state.employeeStatus === 'Pending For SM Review' ||
                          state.employeeStatus === 'Pending For IT Spoc Review'
                        }
                      >
                        {teamLeadBySMList.map((RAs) => (
                          <MenuItem key={RAs.teamLeadEmail} value={RAs.teamLeadEmail}>
                            {RAs.teamLeadName}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <input type="hidden" id="selectedTL" name="selectedTL" value={selectedTL} />
                    <Grid item xs={12} sm={6}>
                      <TextField
                        autoComplete="off"
                        name="billingSlab"
                        variant="outlined"
                        required
                        fullWidth
                        id="billingSlab"
                        type="number"
                        label="Monthly Billing Rate"
                        value={values.billingSlab}
                        onChange={(evt) => {
                          handleChange(evt);
                          handleChangeEvent(evt);
                        }}
                        inputProps={{ min: 40000, max: 500000 }}
                        onBlur={handleBlur}
                        error={formik.touched.billingSlab && Boolean(formik.errors.billingSlab)}
                        helperText={formik.touched.billingSlab && formik.errors.billingSlab}
                      />
                    </Grid>
                  </Grid>

                  <br />

                  <Grid container item xs={12} justifyContent={'center'}>
                    <Stack spacing={2} direction="row" justifyContent="center">
                      <Button
                        size="medium"
                        variant="contained"
                        type="submit"
                        className={!isValid ? 'disabled-btn' : ''}
                        // disabled={!isValid}
                        disabled={!(dirty && isValid)}
                        color="primary"
                        onClick={() => handleOpenModal()}
                      >
                        Save
                      </Button>

                      <Button
                        type="reset"
                        variant="outlined"
                        color="primary"
                        onClick={() => {
                          formik.resetForm();
                          handleReset();
                        }}
                      >
                        Reset
                      </Button>
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
