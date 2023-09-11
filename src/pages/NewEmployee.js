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
    reportingAvpVpSvp: '',
    verticalHeadHod: '',
    functionDesc: '',
    departmentDesc: '',
    verticalMain: '',
    verticalSub: '',
    projectType: '',
    maximusOpus: '',
    billingSlab: '',
    invoiceType: '',
    createdBy: '',
    employeeStatus: '',
    mainVerticalList: [],
    subVerticalList: [],
    departmentList: [],
    functionsList: [],
    projectsList: [],
    invoiceList: [],
    evaluationPeriod: '',
    // remarks: '',
  });

  const [openModal, setOpenModal] = useState(false);

  const [isChecked, setIsChecked] = useState(false);

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

  const handleChangeMv = (evt) => {
    console.log('evt.target.value', evt.target.value);
    console.log('evt.target.name', evt.target.name);

    const getSubVerticalsReq = {
      key: 'SUB_VERTICAL',
      value: evt.target.value,
    };

    Configuration.getSubVerticals(getSubVerticalsReq).then((getSubVerticalsRes) => {
      state.subVerticalList = getSubVerticalsRes.data;
      console.log('subVerticalList', state.subVerticalList);
      setVerticalSubList(state.subVerticalList);
    });
  };

  const handleChangeSv = (evt) => {
    console.log('evt.target.value', evt.target.value);
    console.log('evt.target.name', evt.target.name);

    const getDepartmentReq = {
      key: 'DEPARTMENTS',
      value: evt.target.value,
    };

    Configuration.getDepartments(getDepartmentReq).then((getDepartmentRes) => {
      state.departmentList = getDepartmentRes.data;
      console.log('departmentList', state.departmentList);
      setDepartmentList(state.departmentList);
    });
  };

  const handleChangeDpt = (evt) => {
    console.log('evt.target.value', evt.target.value);
    console.log('evt.target.name', evt.target.name);

    const getFunctionReq = {
      key: 'FUNCTIONS',
      value: evt.target.value,
    };

    Configuration.getFunctions(getFunctionReq).then((getFunctionsRes) => {
      state.functionsList = getFunctionsRes.data;
      console.log('functionList', state.functionsList);
      setFunctionsList(state.functionsList);
    });
  };

  const handleChangeFun = (evt) => {
    console.log('evt.target.value', evt.target.value);
    console.log('evt.target.name', evt.target.name);

    const getProjectsReq = {
      key: 'PROJECTS',
      value: evt.target.value,
    };

    Configuration.getProjects(getProjectsReq).then((getProjectsRes) => {
      state.projectsList = getProjectsRes.data;
      setProjectsList(state.projectsList);
    });
  };

  const handleChangeProject = (evt) => {
    console.log('evt.target.value', evt.target.value);
    console.log('evt.target.name', evt.target.name);

    const getInvoiceReq = {
      key: 'INVOICE_TYPE',
      value: evt.target.value,
    };

    Configuration.getInvoice(getInvoiceReq).then((getInvoiceRes) => {
      state.invoiceList = getInvoiceRes.data;
      setInvoiceList(state.invoiceList);
    });
  };
  const handleChangeTeamlead = (evt) => {
    console.log('evt.target.value', evt.target.value);
    console.log('evt.target.name', evt.target.name);

    setTeamLeadSelected(evt.target.value);

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
    // if (document.employeeForm.remarks.value === '') {
    //   return failFocus(document.employeeForm.remarks);
    // }
    // if (document.employeeForm.reportingAvpVpSvp.value === "") {
    //   return failFocus(document.employeeForm.reportingAvpVpSvp);
    // }
    // if (document.employeeForm.verticalHeadHod.value === "") {
    //   return failFocus(document.employeeForm.verticalHeadHod);
    // }
    // if (document.employeeForm.functionDesc.value === "") {
    //   return failFocus(document.employeeForm.functionDesc);
    // }
    // if (document.employeeForm.departmentDesc.value === "") {
    //   return failFocus(document.employeeForm.departmentDesc);
    // }
    // if (document.employeeForm.verticalMain.value === "") {
    //   return failFocus(document.employeeForm.verticalMain);
    // }
    // if (document.employeeForm.verticalSub.value === "") {
    //   return failFocus(document.employeeForm.verticalSub);
    // }
    // if (document.employeeForm.projectType.value === "") {
    //   return failFocus(document.employeeForm.projectType);
    // }

    // if (document.employeeForm.maximusOpus.value === "") {
    //   return failFocus(document.employeeForm.maximusOpus);
    // }
    if (document.employeeForm.billingSlab.value === '') {
      return failFocus(document.employeeForm.billingSlab);
    }
    // if (document.employeeForm.invoiceType.value === "") {
    //   return failFocus(document.employeeForm.invoiceType);
    // }
    return true;
  };

  const saveEmployeeData = (event) => {
    // handleOpenModal();
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

  const [partnerName, setPartnerName] = useState();
  const [reportingList = [], setReportingList] = useState();

  const [verticalMainList = [], setVerticalMainList] = useState();
  const [verticalSubList = [], setVerticalSubList] = useState();
  const [departmentList = [], setDepartmentList] = useState();
  const [functionsList = [], setFunctionsList] = useState();
  const [projectsList = [], setProjectsList] = useState();
  const [invoiceList = [], setInvoiceList] = useState();

  const [teamLeadSelected, setTeamLeadSelected] = useState();

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
      Configuration.getMainVerticals(mainVerticalReq).then((mainVerticalRes) => {
        console.log('mainVerticalRes', mainVerticalRes.data);
        setVerticalMainList(mainVerticalRes);
        console.log(' mainVerticalRes.data', verticalMainList);
        state.mainVerticalList = mainVerticalRes.data;
      });

      setPartnerName(USERDETAILS.partnerName);
      state.partnerName = USERDETAILS.partnerName;
      state.createdBy = USERDETAILS.spocEmailId;
    }

    // eslint-disable-next-line
  }, []);

  const initialValues = {
    employeeFirstName: state.employeeFirstName,
    employeeLastName: state.employeeLastName,
    employeeFullName: `${state.employeeFirstName} ${state.employeeLastName}`,
    mobileNumber: state.mobileNumber,
    whatsappNumber: state.whatsappNumber,
    personalEmail: state.personalEmail,
    officialEmail: state.officialEmail,
    // partnerName: state.partnerName,
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
    // remarks: state.remarks,
    billingSlab: state.billingSlab,
    isChecked,
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
    joiningDate: Yup.string().required('Required'),

    newReplacement: Yup.string().oneOf(['New', 'Replacement']).required('Select an option'),
    // replacementEcode: Yup.string().required('Required'),
    supportDevelopment: Yup.string()
      .oneOf(['Support', 'Development', 'NRCR'], 'Invalid option')
      .required('Select an option'),
    // supportDevelopment: Yup.string().required('Please Select'),
    evaluationPeriod: Yup.string()
      .oneOf(['15 Days', '30 Days', '45 Days', '60 Days'], 'Invalid option')
      .required('Select an option'),
    reportingTeamLead: Yup.string().required('Please Select'),
    reportingManager: Yup.string().required('Please Select'),
    // remarks: Yup.string().required('Remarks Required'),
    billingSlab: Yup.string().required('Billing Slab is required'),
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
      reportingAvpVpSvp: '',
      verticalHeadHod: '',
      functionDesc: '',
      departmentDesc: '',
      verticalMain: '',
      verticalSub: '',
      projectType: '',
      maximusOpus: '',
      billingSlab: '',
      invoiceType: '',
      createdBy: '',
      employeeStatus: '',
      mainVerticalList: [],
      subVerticalList: [],
      departmentList: [],
      functionsList: [],
      projectsList: [],
      invoiceList: [],
      evaluationPeriod: '',
      // remarks: '',
    });
    setIsChecked(false);
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
            startIcon={<Iconify icon="material-symbols:patient-list-outline-rounded" />}
            onClick={EmployeeList}
          >
            Employee List
          </Button>
        </Stack>

        <Stack alignItems="center" justifyContent="center" spacing={5} sx={{ my: 2 }}>
          <Modal open={openModal} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
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
              <Typography id="modal-modal-description" sx={{ mt: 1, textAlign: 'center' }}>
                Are you sure you want to save details ?
              </Typography>

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
              const {
                values,
                handleChange,
                handleSubmit,
                errors,
                touched,
                handleBlur,
                setFieldTouched,
                isValid,
                dirty,
                setFieldValue,
              } = formik;
              return (
                <form onSubmit={handleSubmit} spacing={2} method="POST" id="employeeForm" name="employeeForm">
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
                        // value={values.employeeFirstName}
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
                        <Typography variant="body1">WhatsApp is available on same number?</Typography>
                        <Typography variant="body1" display={'inline'}>
                          No
                        </Typography>
                        <Switch color="success" onChange={handleChangeWaSwitch} checked={isChecked} />
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
                        // type="date"
                        id="joiningDate"
                        label="Date of Joining"
                        inputProps={{
                          min: new Date().toISOString().split('T')[0],
                        }}
                        value={values.joiningDate}
                        onChange={(evt) => {
                          handleChange(evt);
                          handleChangeEvent(evt);
                        }}
                        onBlur={handleBlur}
                      />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-select-small">New / Replacement</InputLabel>
                        {/* <Select
                          InputLabelProps={{ shrink: true }}
                          labelId="demo-select-small"
                          id="newReplacement"
                          name="newReplacement"
                          label="New / Replacement"
                          fullWidth
                          onChange={(evt) => {
                            handleChange(evt);
                            handleChangeDropDown(evt);
                          }}
                          autoComplete="off"
                          // value={values.newReplacement}
                          onBlur={handleBlur}
                          error={formik.touched.newReplacement && Boolean(formik.errors.newReplacement)}
                          helperText={formik.touched.newReplacement && formik.errors.newReplacement}
                        >
                          <MenuItem value="New">New</MenuItem>
                          <MenuItem value="Replacement">Replacement</MenuItem>
                        </Select> */}

                        <Select
                          InputLabelProps={{ shrink: true }}
                          labelId="demo-select-small"
                          id="newReplacement"
                          name="newReplacement"
                          label="New / Replacement"
                          fullWidth
                          onChange={(evt) => {
                            handleChange(evt);
                            handleChangeDropDown(evt);
                          }}
                          autoComplete="off"
                          value={values.newReplacement}
                          onBlur={handleBlur}
                          error={formik.touched.newReplacement && Boolean(formik.errors.newReplacement)}
                          helperText={formik.touched.newReplacement && formik.errors.newReplacement}
                        >
                          <MenuItem value="New">New</MenuItem>
                          <MenuItem value="Replacement">Replacement</MenuItem>
                        </Select>
                      </FormControl>
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
                        // defaultValue={state.replacementEcode}
                        value={state.replacementEcode}
                        onChange={(evt) => {
                          handleChangeEvent(evt);
                          handleChange(evt);
                        }}
                        onBlur={handleBlur}
                        error={formik.touched.replacementEcode && Boolean(formik.errors.replacementEcode)}
                        helperText={formik.touched.replacementEcode && formik.errors.replacementEcode}
                      />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-select-small">Support / Development</InputLabel>

                        <Select
                          InputLabelProps={{ shrink: true }}
                          labelId="demo-select-small"
                          id="supportDevelopment"
                          name="supportDevelopment"
                          label="Support / Development"
                          fullWidth
                          onChange={(evt) => {
                            handleChange(evt);
                            handleChangeEvent(evt);
                          }}
                          autoComplete="off"
                          value={values.supportDevelopment}
                          onBlur={handleBlur}
                          error={formik.touched.supportDevelopment && Boolean(formik.errors.supportDevelopment)}
                          helperText={formik.touched.supportDevelopment && formik.errors.supportDevelopment}
                        >
                          <MenuItem value="Support">Support</MenuItem>
                          {/* <MenuItem value="Development">Development</MenuItem> */}
                          <MenuItem value="NRCR">NRCR</MenuItem>
                        </Select>
                      </FormControl>
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
                          // defaultValue={'Pending For TL Review'}
                        >
                          <MenuItem value="Pending For TL Review">Pending For TL Review</MenuItem>
                          <MenuItem value="Resigned">Resigned</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-select-small">Evaluation Period</InputLabel>

                        <Select
                          InputLabelProps={{ shrink: true }}
                          labelId="demo-select-small"
                          id="evaluationPeriod"
                          name="evaluationPeriod"
                          label="Evaluation Period"
                          fullWidth
                          onChange={(evt) => {
                            handleChange(evt);
                            handleChangeEvent(evt);
                          }}
                          onBlur={handleBlur}
                          error={formik.touched.evaluationPeriod && Boolean(formik.errors.evaluationPeriod)}
                          helperText={formik.touched.evaluationPeriod && formik.errors.evaluationPeriod}
                          value={values.evaluationPeriod}
                          autoComplete="off"
                        >
                          <MenuItem value="15 Days">15 Days</MenuItem>
                          <MenuItem value="30 Days">30 Days</MenuItem>
                          <MenuItem value="45 Days">45 Days</MenuItem>
                          <MenuItem value="60 Days">60 Days</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>

                  <br />
                  <Typography variant="subtitle1" paddingBottom={'15px'}>
                    Reporting Authorities
                  </Typography>

                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-select-small">Reporting Authority (TL)</InputLabel>
                        <Select
                          InputLabelProps={{ shrink: true }}
                          labelId="demo-select-small"
                          id="reportingTeamLead"
                          name="reportingTeamLead"
                          label="Reporting Authority  (TL)"
                          required
                          fullWidth
                          onChange={(evt) => {
                            handleChange(evt);
                            handleChangeTeamlead(evt);
                          }}
                          value={values.reportingTeamLead || ''}
                          autoComplete="off"
                          onBlur={handleBlur}
                          error={formik.touched.reportingTeamLead && Boolean(formik.errors.reportingTeamLead)}
                          helperText={formik.touched.reportingTeamLead && formik.errors.reportingTeamLead}
                        >
                          {reportingList.map((RAs) => (
                            <MenuItem key={RAs.teamLeadEmail} value={RAs.teamLeadEmail}>
                              {RAs.teamLeadName}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-select-small">Reporting Authority (SM)</InputLabel>

                        <Select
                          InputLabelProps={{ shrink: true }}
                          labelId="demo-select-small"
                          id="reportingManager"
                          name="reportingManager"
                          label="Reporting Authority (SM)"
                          required
                          fullWidth
                          onChange={(evt) => {
                            handleChange(evt);
                            handleChangeEvent(evt);
                          }}
                          value={values.reportingManager}
                          autoComplete="off"
                          onBlur={handleBlur}
                          error={formik.touched.reportingManager && Boolean(formik.errors.reportingManager)}
                          helperText={formik.touched.reportingManager && formik.errors.reportingManager}
                        >
                          {reportingList.map((RAs) =>
                            RAs.teamLeadEmail === teamLeadSelected ? (
                              <MenuItem key={RAs.managerEmail} value={RAs.managerEmail}>
                                {RAs.managerName}
                              </MenuItem>
                            ) : null
                          )}
                        </Select>
                      </FormControl>
                    </Grid>

                    {/* <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-select-small">Approve / Reject</InputLabel>

                        <Select
                          required
                          InputLabelProps={{ shrink: true }}
                          labelId="demo-select-small"
                          id="remarks"
                          name="remarks"
                          label="Approve / Reject"
                          fullWidth
                          onChange={(evt) => {
                            handleChange(evt);
                            handleChangeEvent(evt);
                          }}
                          value={values.remarks}
                          autoComplete="off"
                          onBlur={handleBlur}
                          error={formik.touched.remarks && Boolean(formik.errors.remarks)}
                          helperText={formik.touched.remarks && formik.errors.remarks}
                        >
                          <MenuItem value="Approve">Approve</MenuItem>
                          <MenuItem value="Reject">Reject</MenuItem>
                        </Select>
                      </FormControl>
                    
                    </Grid> */}

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
                        error={formik.touched.billingSlab && Boolean(formik.errors.billingSlab)}
                        helperText={formik.touched.billingSlab && formik.errors.billingSlab}
                      />
                      {/* <FormControl fullWidth>
                        <InputLabel id="demo-select-small">Billing Slab</InputLabel>

                        <Select
                          required
                          InputLabelProps={{ shrink: true }}
                          labelId="demo-select-small"
                          id="billingSlab"
                          name="billingSlab"
                          label="Billing Slab"
                          fullWidth
                          onChange={(evt) => {
                            handleChange(evt);
                            handleChangeEvent(evt);
                          }}
                          value={values.billingSlab}
                          autoComplete="off"
                          onBlur={handleBlur}
                          error={formik.touched.billingSlab && Boolean(formik.errors.billingSlab)}
                          helperText={formik.touched.billingSlab && formik.errors.billingSlab}
                        >
                          <MenuItem value="SLB-001">SLB-001</MenuItem>
                        </Select>
                      </FormControl> */}
                    </Grid>
                  </Grid>

                  {/* Profile Details */}
                  <br />
                  <Typography
                    variant="subtitle1"
                    paddingBottom={'15px'}
                    sx={{
                      display: 'none',
                    }}
                  >
                    Profile Details
                  </Typography>
                  <Grid
                    container
                    spacing={2}
                    sx={{
                      display: 'none',
                    }}
                  >
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-select-small">Main Vertical</InputLabel>
                        <Select
                          InputLabelProps={{ shrink: true }}
                          labelId="demo-select-small"
                          id="verticalMain"
                          name="verticalMain"
                          label="Main Vertical"
                          fullWidth
                          // required
                          // onChange={handleChangeMv}
                          value={values.verticalMain}
                          onChange={(evt) => {
                            handleChange(evt);
                            handleChangeMv(evt);
                          }}
                          onBlur={handleBlur}
                          error={formik.touched.verticalMain && Boolean(formik.errors.verticalMain)}
                          helperText={formik.touched.verticalMain && formik.errors.verticalMain}
                        >
                          {state.mainVerticalList.map((KeyVal) => (
                            <MenuItem key={KeyVal.main_vertical_id} value={KeyVal.main_vertical_desc}>
                              {KeyVal.main_vertical_desc}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-select-small">Sub Vertical</InputLabel>

                        <Select
                          InputLabelProps={{ shrink: true }}
                          labelId="demo-select-small"
                          id="verticalSub"
                          name="verticalSub"
                          label="Sub Vertical"
                          fullWidth
                          value={values.verticalSub}
                          onChange={(evt) => {
                            handleChange(evt);
                            handleChangeSv(evt);
                          }}
                          onBlur={handleBlur}
                          error={formik.touched.verticalSub && Boolean(formik.errors.verticalSub)}
                          helperText={formik.touched.verticalSub && formik.errors.verticalSub}
                        >
                          {state.subVerticalList.map((KeyVal) => (
                            <MenuItem key={KeyVal.sub_vertical_id} value={KeyVal.sub_vertical_desc}>
                              {KeyVal.sub_vertical_desc}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-select-small">Department (IT)</InputLabel>

                        <Select
                          InputLabelProps={{ shrink: true }}
                          labelId="demo-select-small"
                          id="departmentDesc"
                          name="departmentDesc"
                          label="Department (IT)"
                          // required
                          fullWidth
                          onChange={(evt) => {
                            handleChange(evt);
                            handleChangeDpt(evt);
                          }}
                          onBlur={handleBlur}
                          error={formik.touched.departmentDesc && Boolean(formik.errors.departmentDesc)}
                          helperText={formik.touched.departmentDesc && formik.errors.departmentDesc}
                        >
                          {state.departmentList.map((KeyVal) => (
                            <MenuItem key={KeyVal.department_id} value={KeyVal.department_desc}>
                              {KeyVal.department_desc}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-select-small">Function (IT)</InputLabel>

                        <Select
                          InputLabelProps={{ shrink: true }}
                          labelId="demo-select-small"
                          id="functionDesc"
                          name="functionDesc"
                          label="Function (IT)"
                          fullWidth
                          // required
                          onChange={(evt) => {
                            handleChange(evt);
                            handleChangeFun(evt);
                          }}
                          onBlur={handleBlur}
                          error={formik.touched.functionDesc && Boolean(formik.errors.functionDesc)}
                          helperText={formik.touched.functionDesc && formik.errors.functionDesc}
                        >
                          {state.functionsList.map((KeyVal) => (
                            <MenuItem key={KeyVal.function_id} value={KeyVal.function_desc}>
                              {KeyVal.function_desc}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-select-small">Project Type</InputLabel>

                        <Select
                          InputLabelProps={{ shrink: true }}
                          labelId="demo-select-small"
                          id="projectType"
                          name="projectType"
                          label="Project Type"
                          onChange={(evt) => {
                            handleChange(evt);
                            handleChangeProject(evt);
                          }}
                          onBlur={handleBlur}
                          error={formik.touched.projectType && Boolean(formik.errors.projectType)}
                          helperText={formik.touched.projectType && formik.errors.projectType}
                          fullWidth
                        >
                          {state.projectsList.map((KeyVal) => (
                            <MenuItem key={KeyVal.project_id} value={KeyVal.project_desc}>
                              {KeyVal.project_desc}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-select-small">Invoice Type</InputLabel>

                        <Select
                          InputLabelProps={{ shrink: true }}
                          labelId="demo-select-small"
                          id="invoiceType"
                          name="invoiceType"
                          label="Invoice Type"
                          fullWidth
                          onChange={(evt) => {
                            handleChange(evt);
                            handleChangeEvent(evt);
                          }}
                          onBlur={handleBlur}
                          error={formik.touched.invoiceType && Boolean(formik.errors.invoiceType)}
                          helperText={formik.touched.invoiceType && formik.errors.invoiceType}
                        >
                          {state.invoiceList.map((KeyVal) => (
                            <MenuItem key={KeyVal.invoice_type_id} value={KeyVal.invoice_type_desc}>
                              {KeyVal.invoice_type_desc}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-select-small">Maximus / Opus</InputLabel>

                        <Select
                          InputLabelProps={{ shrink: true }}
                          labelId="demo-select-small"
                          id="maximusOpus"
                          name="maximusOpus"
                          label="Maximus / Opus"
                          fullWidth
                          onChange={(evt) => {
                            handleChange(evt);
                            handleChangeEvent(evt);
                          }}
                          onBlur={handleBlur}
                          error={formik.touched.maximusOpus && Boolean(formik.errors.maximusOpus)}
                          helperText={formik.touched.maximusOpus && formik.errors.maximusOpus}
                        >
                          <MenuItem value="Maximus">Maximus</MenuItem>
                          <MenuItem value="Opus">Opus</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>

                  <Grid container item xs={12} justifyContent={'center'}>
                    <Stack spacing={2} direction="row" justifyContent="center">
                      <Button
                        size="medium"
                        variant="contained"
                        type="submit"
                        className={!isValid ? 'disabled-btn' : ''}
                        disabled={!isValid}
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
