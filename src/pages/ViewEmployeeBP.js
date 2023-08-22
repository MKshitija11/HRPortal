import { useLocation, useNavigate } from 'react-router-dom';
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
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
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
    evaluationPeriod: '',
  });
  const [openModal, setOpenModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [isFieldDisabled, setIsFieldDisabled] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    saveEmployeeData();
  };

  const handleChangeWaSwitch = (evt) => {
    if (evt.target.checked) {
      document.getElementById('whatsappNumber').value = state.mobileNumber;
      state.whatsappNumber = state.mobileNumber;
    } else {
      document.getElementById('whatsappNumber').value = '';
      state.whatsappNumber = '';
    }
  };
  const handleChange = (evt) => {
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
    console.log('evt.target.value', evt.target.value);
    if (evt.target.value === 'New') {
      document.employeeForm.replacementEcode.value = 'NA';
    } else {
      document.employeeForm.replacementEcode.value = '';
    }
  };

  const navigate = useNavigate();
  const location = useLocation();

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
    // if (document.employeeForm.reportingAvpVpSvp.value === "") {
    //   return failFocus(document.employeeForm.reportingAvpVpSvp);
    // }
    // if (document.employeeForm.verticalHeadHod.value === "") {
    //   return failFocus(document.employeeForm.verticalHeadHod);
    // }
    if (document.employeeForm.functionDesc.value === '') {
      return failFocus(document.employeeForm.functionDesc);
    }
    if (document.employeeForm.departmentDesc.value === '') {
      return failFocus(document.employeeForm.departmentDesc);
    }
    if (document.employeeForm.verticalMain.value === '') {
      return failFocus(document.employeeForm.verticalMain);
    }
    if (document.employeeForm.verticalSub.value === '') {
      return failFocus(document.employeeForm.verticalSub);
    }
    if (document.employeeForm.projectType.value === '') {
      return failFocus(document.employeeForm.projectType);
    }

    if (document.employeeForm.maximusOpus.value === '') {
      return failFocus(document.employeeForm.maximusOpus);
    }
    if (document.employeeForm.billingSlab.value === '') {
      return failFocus(document.employeeForm.billingSlab);
    }
    if (document.employeeForm.invoiceType.value === '') {
      return failFocus(document.employeeForm.invoiceType);
    }
    return true;
  };

  const saveEmployeeData = (event) => {
    // event.preventDefault();

    // if (validForm()) {

    state.employeeFullName = `${state.employeeFirstName} ${state.employeeLastName}`;

    const employeeFormObj = new FormData(document.getElementById('employeeForm'));

    const employeeFormData = Object.fromEntries(employeeFormObj.entries());
    console.log('employeeFormData::', employeeFormData);
    console.log('JSON:employeeFormData::', JSON.stringify(employeeFormData));

    Configuration.saveEmployeeData(employeeFormData).then((employeeFormRes) => {
      console.log('employeeFormRes::', employeeFormRes.data);
      navigate('/EmployeesBP');
    });
    // }
  };

  const [partnerName, setPartnerName] = useState();

  const [empData = {}, setEmpData] = useState();

  const [reportingList = [], setReportingList] = useState();

  useEffect(() => {
    const USERDETAILS = JSON.parse(sessionStorage.getItem('USERDETAILS'));
    const REPORTINGDETAILS = JSON.parse(sessionStorage.getItem('REPORTINGDETAILS'));

    if (USERDETAILS != null) {
      console.log('USERDETAILS', USERDETAILS);
      console.log('USERDETAILS.partnerName', USERDETAILS.partnerName);

      setReportingList(REPORTINGDETAILS);

      setPartnerName(USERDETAILS.partnerName);
      state.partnerName = USERDETAILS.partnerName;
      state.createdBy = USERDETAILS.spocEmailId;
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const viewEmployeeReq = {
      id: location.state.id,
    };

    Configuration.viewEmployeeData(viewEmployeeReq).then((viewEmployeeRes) => {
      console.log('employeeFormRes::', viewEmployeeRes.data);
      const EMP_DETAILS_STR = JSON.stringify(viewEmployeeRes.data);
      const EMP_DETAILS = JSON.parse(EMP_DETAILS_STR);
      setEmpData(EMP_DETAILS);

      state.newReplacement = EMP_DETAILS.newReplacement;
      state.id = EMP_DETAILS.id;
      state.employeeId = EMP_DETAILS.employeeId;
      state.employeeStatus = EMP_DETAILS.employeeStatus;
      state.supportDevelopment = EMP_DETAILS.supportDevelopment;
      state.evaluationPeriod = EMP_DETAILS.evaluationPeriod;
      state.projectType = EMP_DETAILS.projectType;
      state.maximusOpus = EMP_DETAILS.maximusOpus;
      state.billingSlab = EMP_DETAILS.billingSlab;
      state.invoiceType = EMP_DETAILS.invoiceType;
      state.reportingTeamLead = EMP_DETAILS.reportingTeamLead;
      state.reportingManager = EMP_DETAILS.reportingManager;
      state.functionDesc = EMP_DETAILS.functionDesc;
      state.employeeFirstName = EMP_DETAILS.employeeFirstName;
      state.employeeLastName = EMP_DETAILS.employeeLastName;
      state.officialEmail = EMP_DETAILS.officialEmail;
      state.personalEmail = EMP_DETAILS.personalEmail;
      state.mobileNumber = EMP_DETAILS.mobileNumber;
      state.whatsappNumber = EMP_DETAILS.whatsappNumber;
      state.joiningDate = EMP_DETAILS.joiningDate;
    });
    // eslint-disable-next-line
  }, []);

  const initialValues = {
    employeeFirstName: state.employeeFirstName,
    employeeLastName: state.employeeLastName,
    employeeFullName: state.employeeFullName,
    mobileNumber: state.mobileNumber,
    whatsappNumber: state.whatsappNumber,
    // whatsappNumber: state.whatsappNumber,
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
    remarks: state.remarks,
    billingSlab: state.billingSlab,
  };

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
            open={openModal}
            // onClose={() => {
            //   setOpenModal(false);
            //   saveEmployeeData();
            //   // navigate('/EmployeesBP');
            // }}
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
              {/* <Grid container item xs={12} justifyContent={'center'}>
                <Stack spacing={2} direction="row" justifyContent="center">
                  <Iconify
                    icon="material-symbols:check-circle-outline-rounded"
                    width={50}
                    height={50}
                    sx={{ display: 'flex', alignItems: 'flex-end' }}
                    color="#0a3b8a"
                  />
                </Stack>
              </Grid> */}

              {/* <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ textAlign: 'center', mt: 2 }}>
                Thankyou!
              </Typography> */}
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
          <form spacing={2} method="POST" id="employeeForm" name="employeeForm">
            <Typography variant="subtitle1" paddingBottom={'15px'}>
              Personal Information
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                {console.log('state.employeeStatus===>', state.employeeStatus)}
                <TextField
                  InputLabelProps={{ shrink: true }}
                  autoComplete="off"
                  name="employeeFirstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="employeeFirstName"
                  label="First Name"
                  value={state.employeeFirstName}
                  onChange={handleChange}
                  autoFocus
                  disabled={
                    state.employeeStatus === 'Pending For TL Review' ||
                    state.employeeStatus === 'Pending For SM Review' ||
                    state.employeeStatus === 'Pending For IT Spoc Review' ||
                    state.employeeStatus === 'Active'
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
                  value={state.employeeLastName}
                  onChange={handleChange}
                  // inputProps={{ readOnly: true }}
                  disabled={
                    state.employeeStatus === 'Pending For TL Review' ||
                    state.employeeStatus === 'Pending For SM Review' ||
                    state.employeeStatus === 'Pending For IT Spoc Review' ||
                    state.employeeStatus === 'Active'
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
                  value={`${state.employeeFirstName} ${state.employeeLastName}`}
                  onChange={handleChange}
                  disabled={
                    state.employeeStatus === 'Pending For TL Review' ||
                    state.employeeStatus === 'Pending For SM Review' ||
                    state.employeeStatus === 'Pending For IT Spoc Review'||
                    state.employeeStatus === 'Active'
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
                  value={state.mobileNumber}
                  onChange={handleChange}
                  disabled={
                    state.employeeStatus === 'Pending For TL Review' ||
                    state.employeeStatus === 'Pending For SM Review' ||
                    state.employeeStatus === 'Pending For IT Spoc Review'||
                    state.employeeStatus === 'Active'
                  }
                />
              </Grid>
              <Grid item xs={4} textAlign="center">
                <Typography variant="body1">WhatsApp is available on same number?</Typography>
                <Typography variant="body1" display={'inline'}>
                  No
                </Typography>
                {state.mobileNumber === state.whatsappNumber ? (
                  <Switch color="success" onChange={handleChangeWaSwitch} defaultChecked />
                ) : (
                  <Switch color="success" onChange={handleChangeWaSwitch} />
                )}
                <Typography variant="body1" display={'inline'}>
                  Yes
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  required
                  fullWidth
                  name="whatsappNumber"
                  label="WhatApp Number"
                  id="whatsappNumber"
                  autoComplete="off"
                  type="number"
                  value={state.whatsappNumber}
                  onChange={handleChange}
                  disabled={
                    state.employeeStatus === 'Pending For TL Review' ||
                    state.employeeStatus === 'Pending For SM Review' ||
                    state.employeeStatus === 'Pending For IT Spoc Review'||
                    state.employeeStatus === 'Active'
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
                  value={state.personalEmail}
                  onChange={handleChange}
                  disabled={
                    state.employeeStatus === 'Pending For TL Review' ||
                    state.employeeStatus === 'Pending For SM Review' ||
                    state.employeeStatus === 'Pending For IT Spoc Review'||
                    state.employeeStatus === 'Active'
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
                  value={state.officialEmail}
                  onChange={handleChange}
                  disabled={
                    state.employeeStatus === 'Pending For TL Review' ||
                    state.employeeStatus === 'Pending For SM Review' ||
                    state.employeeStatus === 'Pending For IT Spoc Review'||
                    state.employeeStatus === 'Active'
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
                  onBlur={handleChange}
                  disabled={
                    state.employeeStatus === 'Pending For TL Review' ||
                    state.employeeStatus === 'Pending For SM Review' ||
                    state.employeeStatus === 'Pending For IT Spoc Review'||
                    state.employeeStatus === 'Active'
                  }
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                {/* <input type="hidden" value={state.id} id="id" name="id" /> */}
                <TextField
                  InputLabelProps={{ shrink: true }}
                  autoComplete="off"
                  name="employeeId"
                  variant="outlined"
                  required
                  fullWidth
                  id="employeeId"
                  label="Employee Code"
                  value={state.employeeId}
                  onChange={handleChange}
                  disabled={
                    state.employeeStatus === 'Pending For TL Review' ||
                    state.employeeStatus === 'Pending For SM Review' ||
                    state.employeeStatus === 'Pending For IT Spoc Review'||
                    state.employeeStatus === 'Active'
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
                  value={state.joiningDate}
                  onChange={handleChange}
                  disabled={
                    state.employeeStatus === 'Pending For TL Review' ||
                    state.employeeStatus === 'Pending For SM Review' ||
                    state.employeeStatus === 'Pending For IT Spoc Review'||
                    state.employeeStatus === 'Active'
                  }
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <InputLabel id="demo-select-small">New / Replacement</InputLabel>

                  <Select
                    InputLabelProps={{ shrink: true }}
                    labelId="demo-select-small"
                    id="newReplacement"
                    name="newReplacement"
                    label="New / Replacement"
                    fullWidth
                    value={state.newReplacement}
                    onChange={handleChangeDropDown}
                    disabled={
                      state.employeeStatus === 'Pending For TL Review' ||
                      state.employeeStatus === 'Pending For SM Review' ||
                      state.employeeStatus === 'Pending For IT Spoc Review'||
                      state.employeeStatus === 'Active'
                    }
                  >
                    <MenuItem value="New">New</MenuItem>
                    <MenuItem value="Replacement">Replacement</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  autoComplete="off"
                  name="replacementEcode"
                  variant="outlined"
                  required
                  fullWidth
                  id="replacementEcode"
                  label="Replacement Employee Code"
                  value={empData.replacementEcode}
                  onChange={handleChange}
                  disabled={
                    state.employeeStatus === 'Pending For TL Review' ||
                    state.employeeStatus === 'Pending For SM Review' ||
                    state.employeeStatus === 'Pending For IT Spoc Review'||
                    state.employeeStatus === 'Active'
                  }
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
                    onChange={handleChange}
                    value={state.supportDevelopment}
                    disabled={
                      state.employeeStatus === 'Pending For TL Review' ||
                      state.employeeStatus === 'Pending For SM Review' ||
                      state.employeeStatus === 'Pending For IT Spoc Review'||
                      state.employeeStatus === 'Active'
                    }
                  >
                    <MenuItem value="Support">Support</MenuItem>
                    <MenuItem value="Development">Development</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <InputLabel id="demo-select-small">Employee Status</InputLabel>

                  <Select
                    InputLabelProps={{ shrink: true }}
                    labelId="demo-select-small"
                    id="employeeStatus"
                    name="employeeStatus"
                    label="Employee Status"
                    fullWidth
                    // value={state.employeeStatus}
                    defaultValue={'Pending For TL Review'}
                    disabled={
                      state.employeeStatus === 'Pending For TL Review' ||
                      state.employeeStatus === 'Pending For SM Review' ||
                      state.employeeStatus === 'Pending For IT Spoc Review'||
                      state.employeeStatus === 'Active'
                    }
                    // inputProps={{ readOnly: true }}
                  >
                    {/* <MenuItem value={state.employeeStatus}>{state.employeeStatus}</MenuItem> */}
                    <MenuItem value="Pending For TL Review">Pending For TL Review</MenuItem>
                    {/* <MenuItem value="Resigned">P</MenuItem> */}
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
                    onChange={handleChange}
                    value={state.evaluationPeriod}
                    disabled={
                      state.employeeStatus === 'Pending For TL Review' ||
                      state.employeeStatus === 'Pending For SM Review' ||
                      state.employeeStatus === 'Pending For IT Spoc Review'||
                      state.employeeStatus === 'Active'
                    }
                  >
                    <MenuItem value="1 Month">1 Month</MenuItem>
                    <MenuItem value="2 Months">2 Months</MenuItem>
                    <MenuItem value="3 Months">3 Months</MenuItem>
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
                    fullWidth
                    onChange={handleChangeTeamlead}
                    value={state.reportingTeamLead}
                    defaultValue={state.reportingTeamLead}
                    disabled={
                      state.employeeStatus === 'Pending For TL Review' ||
                      state.employeeStatus === 'Pending For SM Review' ||
                      state.employeeStatus === 'Pending For IT Spoc Review'||
                      state.employeeStatus === 'Active'
                    }
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
                    fullWidth
                    onChange={handleChange}
                    defaultValue={state.reportingManager}
                    value={state.reportingManager}
                    disabled={
                      state.employeeStatus === 'Pending For TL Review' ||
                      state.employeeStatus === 'Pending For SM Review' ||
                      state.employeeStatus === 'Pending For IT Spoc Review'||
                      state.employeeStatus === 'Active'
                    }
                  >
                    {reportingList.map((RAs) =>
                      RAs.teamLeadEmail === state.reportingTeamLead ? (
                        <MenuItem key={RAs.managerEmail} value={RAs.managerEmail}>
                          {RAs.managerName}
                        </MenuItem>
                      ) : null
                    )}
                  </Select>
                </FormControl>
              </Grid>
              {/* <Grid item xs={12} sm={6}>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  autoComplete="off"
                  name="reportingAvpVpSvp"
                  variant="outlined"
                  required
                  fullWidth
                  id="reportingAvpVpSvp"
                  label="AVP / VP / SVP"
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  autoComplete="off"
                  name="verticalHeadHod"
                  variant="outlined"
                  required
                  fullWidth
                  id="verticalHeadHod"
                  label="Vertical Head / HOD"
                  onChange={handleChange}
                />
              </Grid> */}
            </Grid>
            <br />
            <Typography variant="subtitle1" paddingBottom={'15px'} style={{ display: 'none' }}>
              Employee Profile Details
            </Typography>

            <Grid container spacing={2} style={{ display: 'none' }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  autoComplete="off"
                  name="functionDesc"
                  variant="outlined"
                  required
                  fullWidth
                  id="functionDesc"
                  label="Function (IT)"
                  onChange={handleChange}
                  value={empData.functionDesc}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  autoComplete="off"
                  name="departmentDesc"
                  variant="outlined"
                  required
                  fullWidth
                  id="departmentDesc"
                  label="Department"
                  onChange={handleChange}
                  value={empData.departmentDesc}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  autoComplete="off"
                  name="verticalMain"
                  variant="outlined"
                  required
                  fullWidth
                  id="verticalMain"
                  label="Main Vertical"
                  onChange={handleChange}
                  value={empData.verticalMain}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  autoComplete="off"
                  name="verticalSub"
                  variant="outlined"
                  required
                  fullWidth
                  id="verticalSub"
                  label="Sub Vertical"
                  onChange={handleChange}
                  value={empData.verticalSub}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  autoComplete="off"
                  name="projectType"
                  variant="outlined"
                  required
                  fullWidth
                  id="projectType"
                  label="Project Type"
                  onChange={handleChange}
                  value={empData.projectType}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  autoComplete="off"
                  name="maximusOpus"
                  variant="outlined"
                  required
                  fullWidth
                  id="maximusOpus"
                  label="Maximus / Opus"
                  onChange={handleChange}
                  value={empData.maximusOpus}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  autoComplete="off"
                  name="invoiceType"
                  variant="outlined"
                  required
                  fullWidth
                  id="invoiceType"
                  label="Invoice Type"
                  onChange={handleChange}
                  value={empData.invoiceType}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  autoComplete="off"
                  name="billingSlab"
                  variant="outlined"
                  required
                  fullWidth
                  id="Billing Slab"
                  label="Invoice Type"
                  onChange={handleChange}
                  value={empData.billingSlab}
                />
              </Grid>
            </Grid>
            <br />

            <Grid container item xs={12} justifyContent={'center'}>
              {/* <Stack spacing={2} direction="row" justifyContent="center">
                {state.employeeStatus === "Active" ? (
                  <Button
                    size="medium"
                    variant="contained"
                    type="button"
                    color="primary"
                    onClick={updateEmployeeData}
                  >
                    Save Details
                  </Button>
                ) : (
                  <Button
                    size="medium"
                    variant="contained"
                    type="button"
                    color="primary"
                    onClick={updateEmployeeData}
                    disabled
                  >
                    Update
                  </Button>
                )}
                <Button type="reset" variant="outlined" color="primary">
                  Reset
                </Button>
              </Stack> */}
              <Stack spacing={2} direction="row" justifyContent="center">
                {state.employeeStatus === 'Rejected by TL' ||
                state.employeeStatus === 'Rejected by SM' ||
                state.employeeStatus === 'Rejected by ITSpoc' ? (
                  <Button
                    size="medium"
                    variant="contained"
                    type="button"
                    color="primary"
                    onClick={() => handleOpenModal()}
                    // disabled
                  >
                    Save
                  </Button>
                ) : null}
              </Stack>
            </Grid>
          </form>
        </Card>
      </Container>
    </>
  );
}
