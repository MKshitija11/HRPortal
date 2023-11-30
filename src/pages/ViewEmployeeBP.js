/* eslint-disable no-plusplus */
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
import addMonths from 'date-fns/addMonths';
import { subMonths } from 'date-fns';
import format from 'date-fns/format';
// components
import Loader from '../components/Loader/Loader';
import Iconify from '../components/iconify';
import Configuration from '../utils/Configuration';

export default function ViewEmployee({ props }) {
  const location = useLocation();
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
    gender: '',
    dateOfBirth: '',
    experience: '',
    totalExperience: '',
    skillSet: '',
    lob: '',
    tlList: [],
    lwd: '',
    resignationDate: '',
    maximusOpus: '',
    functionDesc: '',
    departmentDesc: '',
  });
  const [openModal, setOpenModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [teamLeadBySMList = [], setTeamLeadBySMList] = useState();
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  // const [failedModal, setFailedModal] = useState(false);
  const [showAlertMessage, setShowAlertMessage] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [teamLead, setTeamLead] = useState();

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
    {
      value: 'Infra Support',
      label: 'Infra Support',
    },
  ];

  const employeeStatusList = [
    {
      value: 'Active',
      label: 'Active',
    },
    {
      value: 'Resigned',
      label: 'Resigned',
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

  const LOBist = [
    {
      value: 'Health',
      label: 'Health',
    },
    {
      value: 'Motor',
      label: 'Motor',
    },
    {
      value: 'Non-motor',
      label: 'Non-motor',
    },
    {
      value: 'Travel',
      label: 'Travel',
    },
    {
      value: 'PG',
      label: 'PG',
    },
    {
      value: 'DBA',
      label: 'DBA',
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
      value: 'Accounting',
      label: 'Accounting',
    },
    {
      value: 'Customer Support',
      label: 'Customer Support',
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

  const handleChangeSM = (evt) => {
    console.log('evt.target.value of SM', evt.target.value);
    console.log('evt.target.name', evt.target.name);

    setState({
      ...state,
      [evt.target.name]: evt.target.value,
    });

    const getTLBySMListReq = {
      managerEmail: evt.target.value,
    };

    Configuration.getTLBySM(getTLBySMListReq).then((getTLBySMListRes) => {
      state.tlList = getTLBySMListRes?.data;
      setTeamLeadBySMList(state.tlList);
    });
  };

  const handleChangeDropDown = (evt) => {
    if (evt.target.value === 'New') {
      // document.employeeForm.replacementEcode.value = 'NA';
      document.employeeForm.replacementEcode.readOnly = true;
      state.replacementEcode = 'NA';
      setState({
        ...state,
        replacementEcode: 'NA',
        newReplacement: evt.target.value,
      });
    } else {
      // document.employeeForm.replacementEcode.value = '';
      document.employeeForm.replacementEcode.readOnly = false;
      state.replacementEcode = '';
      setState({
        ...state,
        replacementEcode: '',
        newReplacement: evt.target.value,
      });
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
    // if (document.employeeForm.officialEmail.value === '') {
    //   return failFocus(document.employeeForm.officialEmail);
    // }
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
    // if (document.employeeForm.dateOfBirth.value === '') {
    //   return failFocus(document.employeeForm.dateOfBirth);
    // }
    if (document.employeeForm.experience.value === '') {
      return failFocus(document.employeeForm.experience);
    }
    if (document.employeeForm.totalExperience.value === '') {
      return failFocus(document.employeeForm.totalExperience);
    }

    return true;
  };

  const saveEmployeeData = () => {
    // event.preventDefault();

    state.employeeFullName = `${state.employeeFirstName} ${state.employeeLastName}`;

    const employeeFormObj = new FormData(document.getElementById('employeeForm'));

    const employeeFormData = Object.fromEntries(employeeFormObj.entries());
    console.log('employeeFormData::', employeeFormData);
    console.log('JSON:employeeFormData::', JSON.stringify(employeeFormData));

    if (validForm()) {
      Configuration.saveEmployeeData(employeeFormData).then((employeeFormRes) => {
        console.log('employeeFormRes::', employeeFormRes.data);
        navigate('/EmployeesBP');
      });
    } else {
      // setFailedModal(true);
      setShowAlertMessage(true);
    }
  };

  const updateEmployeeData = () => {
    document.getElementById('employeeStatus').value = 'Pending For TL Review';

    if (validForm()) {
      state.employeeFullName = `${state.employeeFirstName} ${state.employeeLastName}`;
      const employeeFormObj = new FormData(document.getElementById('employeeForm'));
      const employeeFormData = Object.fromEntries(employeeFormObj.entries());

      setState({
        ...state,
        lwd: employeeFormData.lwd,
        resignationDate: employeeFormData.resignationDate,
      });

      if (state.employeeStatus === 'Revoke') {
        employeeFormData.employeeStatus = 'Active';
        setState({
          ...state,
          employeeStatus: 'Active',
        });
      }
      employeeFormData.reportingTeamLead = state.reportingTeamLead.teamLeadEmail;
      console.log('employeeFormData::', employeeFormData);
      console.log('JSON:employeeFormData ::', JSON.stringify(employeeFormData));

      console.log('Data', employeeFormData);
      setIsLoading(true);
      Configuration.updateEmployeeData(employeeFormData)
        .then((employeeFormRes) => {
          console.log('employeeFormRes::', employeeFormRes.data);
          if (employeeFormRes.data) {
            setTimeout(() => {
              setIsLoading(false);
              setOpenSuccessModal(true);
            }, 500);
          }
        })
        .catch((error) => {
          setIsLoading(false);
          alert('Something went wrong');
        });
    } else {
      // setFailedModal(true);
      setShowAlertMessage(true);
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
      setPartnerName(USERDETAILS?.[0]?.partnerName);
      state.partnerName = USERDETAILS?.[0]?.partnerName;
      state.createdBy = USERDETAILS?.[0]?.spocEmailId;
    }
  }, []);

  useEffect(() => {
    const viewEmployeeReq = {
      id: location.state.id,
    };

    setIsLoading(true);
    Configuration.viewEmployeeData(viewEmployeeReq)
      .then((viewEmployeeRes) => {
        console.log('employeeFormRes::', viewEmployeeRes.data);
        const EMP_DETAILS_STR = JSON.stringify(viewEmployeeRes.data);
        const EMP_DETAILS = JSON.parse(EMP_DETAILS_STR);

        setEmpData(EMP_DETAILS);
        const tempData = {
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
          joiningDate: EMP_DETAILS.joiningDate.toString().split('T')[0],

          replacementEcode: EMP_DETAILS.replacementEcode,
          skillSet: EMP_DETAILS.skillSet,
          // lob: EMP_DETAILS.lob,
          gender: EMP_DETAILS.gender,
          dateOfBirth: EMP_DETAILS.dateOfBirth,
          totalExperience: EMP_DETAILS.totalExperience,
          experience: EMP_DETAILS.experience,
          lwd: EMP_DETAILS.lwd,
          resignationDate: EMP_DETAILS.resignationDate,
          employeeFullName: EMP_DETAILS.employeeFullName,
        };
        setTimeout(() => {
          setIsLoading(false);
        }, 500);

        const REPORTINGDETAILS = JSON.parse(sessionStorage.getItem('REPORTINGDETAILS'));
        console.log(
          'API SENIOR MANAGER===',
          REPORTINGDETAILS.find((o) => o.managerEmail === state.reportingManager)?.managerName
        );

        const getTLBySMListReq = {
          managerEmail: EMP_DETAILS.reportingManager,
        };

        console.log('API GET TL BY SM REQ===', getTLBySMListReq);

        Configuration.getTLBySM(getTLBySMListReq).then((getTLBySMListRes) => {
          console.log('API GET TL BY SM RES===', getTLBySMListRes?.data);

          console.log(
            'TEAM LEAD',
            getTLBySMListRes?.data.find(
              (o) =>
                o.managerEmail === EMP_DETAILS.reportingManager && o.teamLeadEmail === EMP_DETAILS.reportingTeamLead
            )?.teamLeadName
          );

          const TLObj = getTLBySMListRes?.data.find(
            (o) => o.managerEmail === EMP_DETAILS.reportingManager && o.teamLeadEmail === EMP_DETAILS.reportingTeamLead
          );

          state.tlList = getTLBySMListRes?.data;
          setTeamLeadBySMList(state.tlList);
          tempData.reportingTeamLead = TLObj;
          setState(tempData);
        });
      })
      .catch((error) => {
        setIsLoading(false);
        alert('Something went wrong');
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
    reportingTeamLead: state.reportingTeamLead || {},
    reportingManager: state.reportingManager || '',
    billingSlab: state.billingSlab || '',
    gender: state.gender || '',
    dateOfBirth: state.dateOfBirth || '',
    experience: state.experience || '',
    totalExperience: state.totalExperience || '',
    skillSet: state.skillSet || '',
    lob: state.lob || '',
    employeeStatus: state.employeeStatus || '',
    lwd: state.lwd || '',
    resignationDate: state.resignationDate || '',
  };
  console.log('API INITIAL VALUEs', initialValues.reportingTeamLead);

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
    personalEmail: Yup.string()
      .matches(/^[a-zA-Z0-9]{0,}([.]?[a-zA-Z0-9]{1,})[@]/, 'Invalid email address')
      .email('Invalid email address')
      .required('Personal email is required'),
    // officialEmail: Yup.string()
    //   .email('Invalid official email')
    //   .required('Official email is required')
    //   .notOneOf([Yup.ref('personalEmail'), null], 'Official email must be different from personal email'),
    employeeId: Yup.string().required('Employee code is required'),
    joiningDate: Yup.string().required('Required'),
    newReplacement: Yup.string().nullable().required('Please Select'),
    supportDevelopment: Yup.string().required('Please Select'),
    evaluationPeriod: Yup.string().nullable().required('Please Select'),
    reportingTeamLead: Yup.object().required('Please Select'),
    reportingManager: Yup.string().required('Please Select'),
    billingSlab: Yup.number()
      .min(40000, 'Min amount should be 40000')
      .max(500000, 'Max amount should be 500000')
      .required('Monthly Billing rate is required'),
    replacementEcode: Yup.string().required('Employee code required'),
    gender: Yup.string().required('Please Select'),
    experience: Yup.string().required('Please Select'),
    // dateOfBirth: Yup.string().required('Date of Birth Required'),
    totalExperience: Yup.string().required('Total Experience required'),
    skillSet: Yup.string().required('Skill set are required'),
    lob: Yup.string().required('Please Select'),
    lwd: Yup.string().required('Required field'),
    resignationDate: Yup.string().required('Required field'),
  });

  console.log('API TL', teamLead);

  return (
    <>
      <Helmet>
        {console.log('values on render', state.reportingTeamLead)}
        <title> HR Portal | Employee Details (Partner)</title>
      </Helmet>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
          <Typography variant="h4">Employee Details </Typography>
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
            open={openModal || openUpdateModal || openSuccessModal}
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
              ) : openUpdateModal ? (
                <Typography id="modal-modal-description" sx={{ mt: 1, textAlign: 'center' }}>
                  Are you sure you want to Update employee details?
                </Typography>
              ) : openSuccessModal ? (
                <Typography id="modal-modal-description" sx={{ mt: 1, textAlign: 'center' }}>
                  Details of <b>{empData.employeeFullName}</b> has been Updated successfully
                </Typography>
              ) : null}

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
          {isLoading ? (
            <Stack justifyContent="center" alignItems="center" mb={20}>
              <Loader />
            </Stack>
          ) : (
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
                    <>
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
                            inputProps={{
                              readOnly:
                                state.employeeStatus === 'Pending For TL Review' ||
                                state.employeeStatus === 'Pending For SM Review' ||
                                state.employeeStatus === 'Pending For IT Spoc Review'
                                  ? true
                                  : null,
                              style: {
                                color:
                                  state.employeeStatus === 'Pending For TL Review' ||
                                  state.employeeStatus === 'Pending For SM Review' ||
                                  state.employeeStatus === 'Pending For IT Spoc Review'
                                    ? 'grey'
                                    : 'black',
                              },
                            }}
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
                            // }
                            inputProps={{
                              readOnly:
                                state.employeeStatus === 'Pending For TL Review' ||
                                state.employeeStatus === 'Pending For SM Review' ||
                                state.employeeStatus === 'Pending For IT Spoc Review'
                                  ? true
                                  : null,
                              style: {
                                color:
                                  state.employeeStatus === 'Pending For TL Review' ||
                                  state.employeeStatus === 'Pending For SM Review' ||
                                  state.employeeStatus === 'Pending For IT Spoc Review'
                                    ? 'grey'
                                    : 'black',
                              },
                            }}
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
                            // }
                            inputProps={{
                              readOnly:
                                state.employeeStatus === 'Pending For TL Review' ||
                                state.employeeStatus === 'Pending For SM Review' ||
                                state.employeeStatus === 'Pending For IT Spoc Review'
                                  ? true
                                  : null,
                              style: {
                                color:
                                  state.employeeStatus === 'Pending For TL Review' ||
                                  state.employeeStatus === 'Pending For SM Review' ||
                                  state.employeeStatus === 'Pending For IT Spoc Review'
                                    ? 'grey'
                                    : 'black',
                              },
                            }}
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
                            type="tel"
                            value={values.mobileNumber ?? ''}
                            onChange={(evt) => {
                              handleChange(evt);
                              handleChangeEvent(evt);
                            }}
                            onBlur={handleBlur}
                            // error={Boolean(formik.errors.mobileNumber)}
                            error={touched.mobileNumber ? errors.mobileNumber : ''}
                            helperText={touched.mobileNumber ? formik.errors.mobileNumber : ''}
                            // }
                            inputProps={{
                              readOnly:
                                state.employeeStatus === 'Pending For TL Review' ||
                                state.employeeStatus === 'Pending For SM Review' ||
                                state.employeeStatus === 'Pending For IT Spoc Review'
                                  ? true
                                  : null,
                              style: {
                                color:
                                  state.employeeStatus === 'Pending For TL Review' ||
                                  state.employeeStatus === 'Pending For SM Review' ||
                                  state.employeeStatus === 'Pending For IT Spoc Review'
                                    ? 'grey'
                                    : 'black',
                              },

                              maxLength: '10',
                            }}
                          />
                        </Grid>
                        <Grid item xs={4} textAlign="center">
                          <Typography variant="body1">Is same number available on Whatsapp ?</Typography>
                          <Typography variant="body1" display={'inline'}>
                            No
                          </Typography>
                          {state.mobileNumber === state.whatsappNumber ? (
                            <Switch
                              color="success"
                              onChange={handleChangeWaSwitch}
                              defaultChecked={state.whatsappNumber !== '' ? false : null}
                              // }
                              inputProps={{
                                readOnly:
                                  state.employeeStatus === 'Pending For TL Review' ||
                                  state.employeeStatus === 'Pending For SM Review' ||
                                  state.employeeStatus === 'Pending For IT Spoc Review'
                                    ? true
                                    : null,
                                style: {
                                  color:
                                    state.employeeStatus === 'Pending For TL Review' ||
                                    state.employeeStatus === 'Pending For SM Review' ||
                                    state.employeeStatus === 'Pending For IT Spoc Review'
                                      ? 'grey'
                                      : 'black',
                                },
                              }}
                            />
                          ) : (
                            <Switch
                              color="success"
                              onChange={handleChangeWaSwitch}
                              defaultChecked={false}
                              // }
                              inputProps={{
                                readOnly:
                                  state.employeeStatus === 'Pending For TL Review' ||
                                  state.employeeStatus === 'Pending For SM Review' ||
                                  state.employeeStatus === 'Pending For IT Spoc Review'
                                    ? true
                                    : null,
                                style: {
                                  color:
                                    state.employeeStatus === 'Pending For TL Review' ||
                                    state.employeeStatus === 'Pending For SM Review' ||
                                    state.employeeStatus === 'Pending For IT Spoc Review'
                                      ? 'grey'
                                      : 'black',
                                },
                              }}
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
                            type="tel"
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
                            // }
                            inputProps={{
                              readOnly:
                                state.employeeStatus === 'Pending For TL Review' ||
                                state.employeeStatus === 'Pending For SM Review' ||
                                state.employeeStatus === 'Pending For IT Spoc Review'
                                  ? true
                                  : null,
                              style: {
                                color:
                                  state.employeeStatus === 'Pending For TL Review' ||
                                  state.employeeStatus === 'Pending For SM Review' ||
                                  state.employeeStatus === 'Pending For IT Spoc Review'
                                    ? 'grey'
                                    : 'black',
                              },
                              maxLength: '10',
                            }}
                          />
                        </Grid>

                        <Grid item xs={6}>
                          <TextField
                            InputLabelProps={{ shrink: true }}
                            variant="outlined"
                            required
                            fullWidth
                            id="personalEmail"
                            placeholder="abc@gmail.com"
                            label="Partner Official Email"
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
                            // }
                            inputProps={{
                              readOnly:
                                state.employeeStatus === 'Pending For TL Review' ||
                                state.employeeStatus === 'Pending For SM Review' ||
                                state.employeeStatus === 'Pending For IT Spoc Review'
                                  ? true
                                  : null,
                              style: {
                                color:
                                  state.employeeStatus === 'Pending For TL Review' ||
                                  state.employeeStatus === 'Pending For SM Review' ||
                                  state.employeeStatus === 'Pending For IT Spoc Review'
                                    ? 'grey'
                                    : 'black',
                              },
                            }}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            InputLabelProps={{ shrink: true }}
                            variant="outlined"
                            // required
                            fullWidth
                            name="officialEmail"
                            label="Bagic Official Email"
                            id="officialEmail"
                            placeholder="abc@gmail.com"
                            autoComplete="off"
                            type="email"
                            value={values.officialEmail}
                            onChange={(evt) => {
                              handleChange(evt);
                              handleChangeEvent(evt);
                            }}
                            onBlur={handleBlur}
                            // error={touched.officialEmail ? errors.officialEmail : ''}
                            // helperText={touched.officialEmail ? formik.errors.officialEmail : ''}
                            // }
                            inputProps={{
                              readOnly:
                                state.employeeStatus === 'Pending For TL Review' ||
                                state.employeeStatus === 'Pending For SM Review' ||
                                state.employeeStatus === 'Pending For IT Spoc Review'
                                  ? true
                                  : null,
                              style: {
                                color:
                                  state.employeeStatus === 'Pending For TL Review' ||
                                  state.employeeStatus === 'Pending For SM Review' ||
                                  state.employeeStatus === 'Pending For IT Spoc Review'
                                    ? 'grey'
                                    : 'black',
                              },
                            }}
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
                            // }
                            inputProps={{
                              readOnly:
                                state.employeeStatus === 'Pending For TL Review' ||
                                state.employeeStatus === 'Pending For SM Review' ||
                                state.employeeStatus === 'Pending For IT Spoc Review'
                                  ? true
                                  : null,
                              style: {
                                color:
                                  state.employeeStatus === 'Pending For TL Review' ||
                                  state.employeeStatus === 'Pending For SM Review' ||
                                  state.employeeStatus === 'Pending For IT Spoc Review'
                                    ? 'grey'
                                    : 'black',
                              },
                            }}
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
                            // required
                            fullWidth
                            type="date"
                            id="dateOfBirth"
                            label="Date of Birth"
                            value={values.dateOfBirth}
                            onChange={(evt) => {
                              handleChange(evt);
                              handleChangeEvent(evt);
                            }}
                            // }
                            inputProps={{
                              readOnly:
                                state.employeeStatus === 'Pending For TL Review' ||
                                state.employeeStatus === 'Pending For SM Review' ||
                                state.employeeStatus === 'Pending For IT Spoc Review'
                                  ? true
                                  : null,
                              style: {
                                color:
                                  state.employeeStatus === 'Pending For TL Review' ||
                                  state.employeeStatus === 'Pending For SM Review' ||
                                  state.employeeStatus === 'Pending For IT Spoc Review'
                                    ? 'grey'
                                    : 'black',
                              },
                            }}
                            onBlur={handleBlur}
                            // error={formik.touched.dateOfBirth && Boolean(formik.errors.dateOfBirth)}
                            // helperText={formik.touched.dateOfBirth && formik.errors.dateOfBirth}
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
                            // }
                            inputProps={{
                              readOnly:
                                state.employeeStatus === 'Pending For TL Review' ||
                                state.employeeStatus === 'Pending For SM Review' ||
                                state.employeeStatus === 'Pending For IT Spoc Review'
                                  ? true
                                  : null,
                              style: {
                                color:
                                  state.employeeStatus === 'Pending For TL Review' ||
                                  state.employeeStatus === 'Pending For SM Review' ||
                                  state.employeeStatus === 'Pending For IT Spoc Review'
                                    ? 'grey'
                                    : 'black',
                              },
                            }}
                          />
                        </Grid>

                        <Grid item xs={12} sm={4}>
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
                            // }
                            inputProps={{
                              readOnly:
                                state.employeeStatus === 'Pending For TL Review' ||
                                state.employeeStatus === 'Pending For SM Review' ||
                                state.employeeStatus === 'Pending For IT Spoc Review'
                                  ? true
                                  : null,
                              style: {
                                color:
                                  state.employeeStatus === 'Pending For TL Review' ||
                                  state.employeeStatus === 'Pending For SM Review' ||
                                  state.employeeStatus === 'Pending For IT Spoc Review'
                                    ? 'grey'
                                    : 'black',
                              },
                            }}
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
                            value={values.joiningDate}
                            onChange={(evt) => {
                              handleChange(evt);
                              handleChangeEvent(evt);
                            }}
                            onBlur={handleBlur}
                            error={touched.joiningDate ? errors.joiningDate : ''}
                            helperText={touched.joiningDate ? formik.errors.joiningDate : ''}
                            // }
                            inputProps={{
                              // min: new Date().toISOString().split('T')[0],
                              min: format(subMonths(new Date(), 2), 'yyyy-MM-dd'),
                              max: format(addMonths(new Date(), 3), 'yyyy-MM-dd'),
                              readOnly:
                                state.employeeStatus === 'Pending For TL Review' ||
                                state.employeeStatus === 'Pending For SM Review' ||
                                state.employeeStatus === 'Pending For IT Spoc Review'
                                  ? true
                                  : null,
                              style: {
                                color:
                                  state.employeeStatus === 'Pending For TL Review' ||
                                  state.employeeStatus === 'Pending For SM Review' ||
                                  state.employeeStatus === 'Pending For IT Spoc Review'
                                    ? 'grey'
                                    : 'black',
                              },
                            }}
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
                            // }
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
                            // }
                            inputProps={{
                              readOnly:
                                state.employeeStatus === 'Pending For TL Review' ||
                                state.employeeStatus === 'Pending For SM Review' ||
                                state.employeeStatus === 'Pending For IT Spoc Review'
                                  ? true
                                  : null,
                              style: {
                                color:
                                  state.employeeStatus === 'Pending For TL Review' ||
                                  state.employeeStatus === 'Pending For SM Review' ||
                                  state.employeeStatus === 'Pending For IT Spoc Review'
                                    ? 'grey'
                                    : 'black',
                              },
                            }}
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
                            disabled={
                              state.employeeStatus === 'Pending For TL Review' ||
                              state.employeeStatus === 'Pending For SM Review' ||
                              state.employeeStatus === 'Pending For IT Spoc Review'
                            }
                            required
                            onChange={(evt) => {
                              handleChange(evt);
                              handleChangeEvent(evt);
                            }}
                            value={values.supportDevelopment}
                            onBlur={handleBlur}
                            error={touched.supportDevelopment ? errors.supportDevelopment : ''}
                            helperText={touched.supportDevelopment ? formik.errors.supportDevelopment : ''}
                            // }
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

                          <input type="hidden" id="maximusOpus" name="maximusOpus" value="NA" />
                          <input type="hidden" id="functionDesc" name="functionDesc" value="NA" />
                          <input type="hidden" id="departmentDesc" name="departmentDesc" value="NA" />
                          {/* {location.state.resignedEmployee !== 'Resigned' ? ( */}
                          <TextField
                            labelId="demo-select-small"
                            id="employeeStatus"
                            name="employeeStatus"
                            select
                            label="Employee Status"
                            fullWidth
                            required
                            onChange={(evt) => {
                              handleChange(evt);
                              handleChangeEvent(evt);
                            }}
                            value={values.employeeStatus}
                            onBlur={handleBlur}
                            error={touched.employeeStatus ? errors.employeeStatus : ''}
                            helperText={touched.employeeStatus ? formik.errors.employeeStatus : ''}
                            // }
                            disabled={
                              state.employeeStatus === 'Pending For TL Review' ||
                              state.employeeStatus === 'Pending For SM Review' ||
                              state.employeeStatus === 'Pending For IT Spoc Review'
                            }
                          >
                            {location.state.resignedEmployee !== 'Resigned' ? (
                              employeeStatusList.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                  {option.label}
                                </MenuItem>
                              ))
                            ) : (
                              <MenuItem value="Revoke">Revoke</MenuItem>
                            )}
                          </TextField>
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
                            // }
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
                            // }
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
                            // }
                            inputProps={{
                              readOnly:
                                state.employeeStatus === 'Pending For TL Review' ||
                                state.employeeStatus === 'Pending For SM Review' ||
                                state.employeeStatus === 'Pending For IT Spoc Review'
                                  ? true
                                  : null,
                              style: {
                                color:
                                  state.employeeStatus === 'Pending For TL Review' ||
                                  state.employeeStatus === 'Pending For SM Review' ||
                                  state.employeeStatus === 'Pending For IT Spoc Review'
                                    ? 'grey'
                                    : 'black',
                              },
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
                            // }
                            inputProps={{
                              readOnly:
                                state.employeeStatus === 'Pending For TL Review' ||
                                state.employeeStatus === 'Pending For SM Review' ||
                                state.employeeStatus === 'Pending For IT Spoc Review'
                                  ? true
                                  : null,
                              style: {
                                color:
                                  state.employeeStatus === 'Pending For TL Review' ||
                                  state.employeeStatus === 'Pending For SM Review' ||
                                  state.employeeStatus === 'Pending For IT Spoc Review'
                                    ? 'grey'
                                    : 'black',
                              },
                            }}
                            onBlur={handleBlur}
                            error={formik.touched.skillSet && Boolean(formik.errors.skillSet)}
                            helperText={formik.touched.skillSet && formik.errors.skillSet}
                          />
                        </Grid>
                        {values.employeeStatus === 'Resigned' ? (
                          <>
                            <Grid item xs={12} sm={4}>
                              <TextField
                                InputLabelProps={{ shrink: true }}
                                autoComplete="off"
                                name="resignationDate"
                                variant="outlined"
                                required
                                fullWidth
                                type="date"
                                id="resignationDate"
                                label="Resignation Date"
                                value={values.resignationDate}
                                onChange={(evt) => {
                                  handleChange(evt);
                                  handleChangeEvent(evt);
                                }}
                                // }
                                inputProps={{
                                  readOnly:
                                    state.employeeStatus === 'Pending For TL Review' ||
                                    state.employeeStatus === 'Pending For SM Review' ||
                                    state.employeeStatus === 'Pending For IT Spoc Review'
                                      ? true
                                      : null,
                                  style: {
                                    color:
                                      state.employeeStatus === 'Pending For TL Review' ||
                                      state.employeeStatus === 'Pending For SM Review' ||
                                      state.employeeStatus === 'Pending For IT Spoc Review'
                                        ? 'grey'
                                        : 'black',
                                  },
                                }}
                                onBlur={handleBlur}
                                error={formik.touched.resignationDate && Boolean(formik.errors.resignationDate)}
                                helperText={formik.touched.resignationDate && formik.errors.resignationDate}
                              />
                            </Grid>

                            <Grid item xs={12} sm={4}>
                              <TextField
                                InputLabelProps={{ shrink: true }}
                                autoComplete="off"
                                name="lwd"
                                variant="outlined"
                                required
                                fullWidth
                                type="date"
                                id="lwd"
                                label="Last Working Date"
                                value={values.lwd}
                                onChange={(evt) => {
                                  handleChange(evt);
                                  handleChangeEvent(evt);
                                }}
                                // }
                                inputProps={{
                                  readOnly:
                                    state.employeeStatus === 'Pending For TL Review' ||
                                    state.employeeStatus === 'Pending For SM Review' ||
                                    state.employeeStatus === 'Pending For IT Spoc Review'
                                      ? true
                                      : null,
                                  style: {
                                    color:
                                      state.employeeStatus === 'Pending For TL Review' ||
                                      state.employeeStatus === 'Pending For SM Review' ||
                                      state.employeeStatus === 'Pending For IT Spoc Review'
                                        ? 'grey'
                                        : 'black',
                                  },
                                }}
                                onBlur={handleBlur}
                                error={formik.touched.lwd && Boolean(formik.errors.lwd)}
                                helperText={formik.touched.lwd && formik.errors.lwd}
                              />
                            </Grid>
                          </>
                        ) : null}
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
                              // setSelectedSM(evt.target.value);
                              setState({
                                ...state,
                                reportingManager: evt.target.value,
                              });
                            }}
                            value={values.reportingManager}
                            onBlur={handleBlur}
                            error={touched.reportingManager ? errors.reportingManager : ''}
                            helperText={touched.reportingManager ? formik.errors.reportingManager : ''}
                            // }
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
                        {console.log('TL===>', values.reportingTeamLead.teamLeadName, teamLeadBySMList)}
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
                              // handleChangeEvent(evt);
                              setState({
                                ...state,
                                reportingTeamLead: teamLeadBySMList.find((o) => o.teamLeadName === evt.target.value),
                              });
                            }}
                            value={values.reportingTeamLead.teamLeadName ? values.reportingTeamLead.teamLeadName : ''}
                            // values={teamLead}
                            onBlur={handleBlur}
                            error={touched.reportingTeamLead ? errors.reportingTeamLead : ''}
                            helperText={touched.reportingTeamLead ? formik.errors.reportingTeamLead : ''}
                            // }
                            disabled={
                              state.employeeStatus === 'Pending For TL Review' ||
                              state.employeeStatus === 'Pending For SM Review' ||
                              state.employeeStatus === 'Pending For IT Spoc Review'
                            }
                          >
                            {teamLeadBySMList.map((RAs) => (
                              <MenuItem key={RAs.teamLeadEmail} value={RAs.teamLeadName}>
                                {RAs.teamLeadName}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Grid>
                        {state.employeeStatus === 'Active' ||
                        state.employeeStatus === 'Revoke' ||
                        state.employeeStatus === 'Resigned' ? (
                          <input type="hidden" value={state.id} id="id" name="id" />
                        ) : null}

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
                            onBlur={handleBlur}
                            error={formik.touched.billingSlab && Boolean(formik.errors.billingSlab)}
                            helperText={formik.touched.billingSlab && formik.errors.billingSlab}
                            // }
                            inputProps={{
                              min: 40000,
                              max: 500000,
                              readOnly:
                                state.employeeStatus === 'Pending For TL Review' ||
                                state.employeeStatus === 'Pending For SM Review' ||
                                state.employeeStatus === 'Pending For IT Spoc Review'
                                  ? true
                                  : null,
                              style: {
                                color:
                                  state.employeeStatus === 'Pending For TL Review' ||
                                  state.employeeStatus === 'Pending For SM Review' ||
                                  state.employeeStatus === 'Pending For IT Spoc Review'
                                    ? 'grey'
                                    : 'black',
                              },
                            }}
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
                          ) : state.employeeStatus === 'Active' ||
                            state.employeeStatus === 'Resigned' ||
                            state.employeeStatus === 'Revoke' ? (
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
                        {/* {state.employeeStatus === 'Revoke' ? (
                      <Stack spacing={2} direction="row" justifyContent="center">
                        <Button
                          size="medium"
                          variant="contained"
                          type="button"
                          color="primary"
                          className={!isValid ? 'disabled-btn' : ''}
                          disabled={!isValid}
                          onClick={() => handleOpenUpdateModal()}
                        >
                          Update
                        </Button>
                      </Stack>
                    ) : null} */}
                      </Grid>
                    </>
                  </form>
                );
              }}
            </Formik>
          )}
          {showAlertMessage ? (
            <Typography style={{ color: 'red', fontSize: 13, textAlign: 'center', mt: 2 }}>
              Note: Please provide values for mandatory fields
            </Typography>
          ) : null}
        </Card>
      </Container>
    </>
  );
}
