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
} from '@mui/material';
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
    // billingSlab: '',
    invoiceType: '',
    createdBy: '',
    employeeStatus: '',
    evaluationPeriod: '',
    mainVerticalList: [],
    subVerticalList: [],
    departmentList: [],
    functionsList: [],
    projectsList: [],
    invoiceList: [],
  });

  const [userProfile, setUserProfile] = useState();
  const [reject, setReject] = useState(false);

  const handleChangeWaSwitch = (evt) => {
    console.log();
    if (evt.target.checked) {
      document.getElementById('whatsappNumber').value = state.mobileNumber;
      state.whatsappNumber = state.mobileNumber;
    } else {
      document.getElementById('whatsappNumber').value = '';
      state.whatsappNumber = '';
    }
    console.log('state.mobileNumber', state.mobileNumber);
    console.log('state.whatsappNumber', state.whatsappNumber);
  };
  const handleChange = (evt) => {
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
    setState({
      ...state,
      [evt.target.name]: evt.target.value,
    });

    console.log('state.empProfileSvList', state.empProfileSvList);
    const getSubVerticalsReq = {
      key: 'SUB_VERTICAL',
      value: evt.target.value,
    };

    Configuration.getSubVerticals(getSubVerticalsReq).then((getSubVerticalsRes) => {
      state.subVerticalList = getSubVerticalsRes.data;
      console.log('subVerticalList', state.subVerticalList);
      setVerticalSubList(state.subVerticalList);
      console.log('verticalSubList', verticalSubList);
    });
  };

  const handleChangeSv = (evt) => {
    console.log('evt.target.value', evt.target.value);
    console.log('evt.target.name', evt.target.name);
    setState({
      ...state,
      [evt.target.name]: evt.target.value,
    });
    const getDepartmentReq = {
      key: 'DEPARTMENTS',
      value: evt.target.value,
    };

    Configuration.getDepartments(getDepartmentReq).then((getDepartmentRes) => {
      state.departmentList = getDepartmentRes.data;
      console.log('departmentList', state.departmentList);
      setDepartmentList(state.departmentList);
      console.log('departmentList', departmentList);
    });
  };

  const handleChangeDpt = (evt) => {
    console.log('evt.target.value', evt.target.value);
    console.log('evt.target.name', evt.target.name);

    setState({
      ...state,
      [evt.target.name]: evt.target.value,
    });

    const getFunctionReq = {
      key: 'FUNCTIONS',
      value: evt.target.value,
    };

    Configuration.getFunctions(getFunctionReq).then((getFunctionsRes) => {
      state.functionsList = getFunctionsRes.data;
      console.log('functionList', state.functionsList);
      setFunctionsList(state.functionsList);
      console.log('functionsList', functionsList);
    });
  };

  const handleChangeFun = (evt) => {
    console.log('evt.target.value', evt.target.value);
    console.log('evt.target.name', evt.target.name);
    setState({
      ...state,
      [evt.target.name]: evt.target.value,
    });
    const getProjectsReq = {
      key: 'PROJECTS',
      value: evt.target.value,
    };

    Configuration.getProjects(getProjectsReq).then((getProjectsRes) => {
      state.projectsList = getProjectsRes.data;
      console.log('projectsList', state.projectsList);
      setProjectsList(state.projectsList);
      //   setState("projectsList", state.projectsList);
      console.log('projectsList', projectsList);
    });
  };

  const handleChangeProject = (evt) => {
    console.log('evt.target.value', evt.target.value);
    console.log('evt.target.name', evt.target.name);
    setState({
      ...state,
      [evt.target.name]: evt.target.value,
    });

    const getInvoiceReq = {
      key: 'INVOICE_TYPE',
      value: evt.target.value,
    };

    Configuration.getInvoice(getInvoiceReq).then((getInvoiceRes) => {
      state.invoiceList = getInvoiceRes.data;
      console.log('functionList', state.invoiceList);
      setInvoiceList(state.invoiceList);
      console.log('invoiceList', invoiceList);
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

  console.log('location.state.id', location.state);
  const EmployeeList = () => {
    navigate('/EmployeesTL');
  };

  const handleRejection = () => {
    setReject(true);

    setTimeout(() => {
      updateEmployeeData(true);
    }, 1000);
  };

  const failFocus = (autoFocusObj) => {
    autoFocusObj.focus();
    return false;
  };

  const validForm = () => {
    console.log('Inside update employee valid form');
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

    // if (document.employeeForm.supportDevelopment.value === '') {
    //   return failFocus(document.employeeForm.supportDevelopment);
    // }
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
    // if (document.employeeForm.billingSlab.value === "") {
    //   return failFocus(document.employeeForm.billingSlab);
    // }
    if (document.employeeForm.invoiceType.value === '') {
      return failFocus(document.employeeForm.invoiceType);
    }
    return true;
  };

  const updateEmployeeData = (param) => {
    if (param && typeof param === 'boolean') {
      document.getElementById('employeeStatus').value = 'Rejected by TL';
    } else {
      document.getElementById('employeeStatus').value = 'Pending For SM Review';
    }
    // document.getElementById('employeeStatus').value = 'Pending For SM Review';
    // if (validForm()) {
    // console.log('From update employee valid form');
    state.employeeFullName = `${state.employeeFirstName} ${state.employeeLastName}`;

    const employeeFormObj = new FormData(document.getElementById('employeeForm'));

    const employeeFormData = Object.fromEntries(employeeFormObj.entries());
    // alert(employeeFormData);
    // console.log('employeeFormData::', employeeFormData);
    console.log('JSON:employeeFormData::', JSON.stringify(employeeFormData));
    // console.log('Reject...........', state.employeeStatus);
    Configuration.updateEmployeeData(employeeFormData).then((employeeFormRes) => {
      console.log('employeeFormRes::', employeeFormRes.data);
      navigate('/EmployeesTL');
    });
  };

  const [partnerName, setPartnerName] = useState();

  const [empData = {}, setEmpData] = useState();

  const [reportingList = [], setReportingList] = useState();

  const [verticalMainList = [], setVerticalMainList] = useState();
  const [verticalSubList = [], setVerticalSubList] = useState();
  const [departmentList = [], setDepartmentList] = useState();
  const [functionsList = [], setFunctionsList] = useState();
  const [projectsList = [], setProjectsList] = useState();
  const [invoiceList = [], setInvoiceList] = useState();

  const [buttonDisable, setButtonDisable] = useState();

  useEffect(() => {
    const USERDETAILS = JSON.parse(sessionStorage.getItem('USERDETAILS'));
    const REPORTINGDETAILS = JSON.parse(sessionStorage.getItem('REPORTINGDETAILS'));

    if (USERDETAILS != null) {
      console.log('USERDETAILS', USERDETAILS);
      console.log('USERDETAILS.partnerName', USERDETAILS.partnerName);

      setReportingList(REPORTINGDETAILS);

      setPartnerName(USERDETAILS.partnerName);
      setUserProfile(USERDETAILS.userProfile);
      state.partnerName = USERDETAILS.partnerName;
      state.createdBy = USERDETAILS.spocEmailId;
      console.log('partnerName', partnerName);

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
      state.createdBy = USERDETAILS.spocEmailId;
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    console.log('ID FROM TL', location.state.row.id);
    const viewEmployeeReq = {
      id: location.state.row.id,
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
      // state.billingSlab = EMP_DETAILS.billingSlab;
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
      state.verticalMain = EMP_DETAILS.verticalMain;
      state.verticalSub = EMP_DETAILS.verticalSub;
      state.departmentDesc = EMP_DETAILS.departmentDesc;
      state.functionDesc = EMP_DETAILS.functionDesc;
      console.log('ID', empData);

      if (state.employeeStatus === 'Pending For SM Review') {
        setButtonDisable(true);
      }
      const getSubVerticalsReq = {
        key: 'SUB_VERTICAL',
        value: state.verticalMain,
      };

      Configuration.getSubVerticals(getSubVerticalsReq).then((getSubVerticalsRes) => {
        state.subVerticalList = getSubVerticalsRes.data;
        console.log('subVerticalList', state.subVerticalList);
        setVerticalSubList(state.subVerticalList);

        console.log('verticalSubList', verticalSubList);
      });

      const getDepartmentReq = {
        key: 'DEPARTMENTS',
        value: state.verticalSub,
      };

      Configuration.getDepartments(getDepartmentReq).then((getDepartmentRes) => {
        state.departmentList = getDepartmentRes.data;
        console.log('departmentList', state.departmentList);
        setDepartmentList(state.departmentList);
        console.log('departmentList', departmentList);
      });

      const getFunctionReq = {
        key: 'FUNCTIONS',
        value: state.departmentDesc,
      };

      Configuration.getFunctions(getFunctionReq).then((getFunctionsRes) => {
        state.functionsList = getFunctionsRes.data;
        console.log('functionList', state.functionsList);
        setFunctionsList(state.functionsList);
        console.log('functionsList', functionsList);
      });

      const getProjectsReq = {
        key: 'PROJECTS',
        value: state.functionDesc,
      };

      Configuration.getProjects(getProjectsReq).then((getProjectsRes) => {
        state.projectsList = getProjectsRes.data;
        console.log('functionList', state.projectsList);
        setProjectsList(state.projectsList);
        console.log('projectsList', projectsList);
      });

      const getInvoiceReq = {
        key: 'INVOICE_TYPE',
        value: state.projectType,
      };

      Configuration.getInvoice(getInvoiceReq).then((getInvoiceRes) => {
        state.invoiceList = getInvoiceRes.data;
        console.log('functionList', state.invoiceList);
        setInvoiceList(state.invoiceList);
        console.log('invoiceList', invoiceList);
      });
    });
    // eslint-disable-next-line
  }, []);

  console.log('PROFIEL', userProfile);

  return (
    <>
      {console.log('state reject', reject)}
      <Helmet>
        <title> HR Portal | Employee Details (Team Lead)</title>
      </Helmet>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
          <Typography variant="h4">Employee Details </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:list-fill" />} onClick={EmployeeList}>
            Employee List
          </Button>
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
                <TextField
                  InputLabelProps={{ shrink: true }}
                  autoComplete="off"
                  name="employeeFirstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="employeeFirstName"
                  label="First Name"
                  value={location.state.row.employeeFirstName}
                  onChange={handleChange}
                  autoFocus
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
                  value={location.state.row.employeeLastName}
                  onChange={handleChange}
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
                  // value={`${state.employeeFirstName} ${state.employeeLastName}`}
                  // vlaue={location.state.row.employeeFullName}
                  value={`${location.state.row.employeeFirstName} ${location.state.row.employeeLastName}`}
                  onChange={handleChange}
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
                  value={location.state.row.mobileNumber}
                  onChange={handleChange}
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
                  value={location.state.row.whatsappNumber}
                  onChange={handleChange}
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
                  value={location.state.row.personalEmail}
                  onChange={handleChange}
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
                  value={location.state.row.officialEmail}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <br />
            <Typography variant="subtitle1" paddingBottom={'15px'}>
              Employment Detaills
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
                  value={location.state.row.partnerName}
                  onBlur={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <input type="hidden" value={state.id} id="id" name="id" />
                <TextField
                  InputLabelProps={{ shrink: true }}
                  autoComplete="off"
                  name="employeeId"
                  variant="outlined"
                  required
                  fullWidth
                  id="employeeId"
                  label="Employee Code"
                  value={location.state.row.employeeId}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  autoComplete="off"
                  name="joiningDate"
                  variant="outlined"
                  // required
                  fullWidth
                  id="joiningDate"
                  label="Date of Joining"
                  type="date"
                  value={location.state.row.joiningDate}
                  onChange={handleChange}
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
                    value={location.state.row.newReplacement}
                    onChange={handleChangeDropDown}
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
                  value={location.state.row.replacementEcode}
                  onChange={handleChange}
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
                    value={location.state.row.supportDevelopment}
                  >
                    <MenuItem value="Support">Support</MenuItem>
                    <MenuItem value="Development">Development</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={4} sx={{ display: '' }}>
                {userProfile === 'BAGIC_TL' && reject ? (
                  <input type="hidden" id="tlApprovalFlag" name="tlApprovalFlag" value="Rejected" />
                ) : (
                  <input type="hidden" id="tlApprovalFlag" name="tlApprovalFlag" value="Approved" />
                )}
                <FormControl fullWidth>
                  <input
                    type="hidden"
                    id="reportingItSpoc"
                    name="reportingItSpoc"
                    value="pooja.rebba@bajajallianz.co.in"
                  />
                  <input type="hidden" id="createdBy" name="createdBy" value={state.createdBy} />

                  <input type="hidden" id="employeeStatus" name="employeeStatus" />

                  <InputLabel id="demo-select-small">Employee Status</InputLabel>

                  <Select
                    InputLabelProps={{ shrink: true }}
                    labelId="demo-select-small"
                    id="employeeStatusdd"
                    name="employeeStatusdd"
                    label="Employee Status"
                    fullWidth
                    onChange={handleChange}
                    value={state.employeeStatus}
                    // defaultValue={location.state.row.employeeStatus}
                    disabled
                    inputProps={{ readOnly: true }}
                  >
                    <MenuItem value={state.employeeStatus}>{state.employeeStatus}</MenuItem>
                    {/* <MenuItem value="Pending for TL Review">Pending for TL Review</MenuItem>
                    <MenuItem value="Pending for SM Review">Pending for SM Review</MenuItem> */}
                  </Select>
                </FormControl>
              </Grid>

              {/* <Grid item xs={12} sm={4}>
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
                    value={location.state.row.employeeStatus}
                  >
                    <MenuItem value="Support">Support</MenuItem>
                    <MenuItem value="Development">Development</MenuItem>
                  </Select>
                </FormControl>
              </Grid> */}

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
                    value={state.reportingManager}
                    defaultValue={state.reportingManager}
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
            <Typography variant="subtitle1" paddingBottom={'15px'}>
              Profile Details
            </Typography>

            <Grid container spacing={2}>
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
                    onChange={handleChangeMv}
                    value={state.verticalMain}
                    defaultValue={state.verticalMain}
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
                    onChange={handleChangeSv}
                    defaultValue={state.verticalSub}
                    value={state.verticalSub}
                  >
                    {verticalSubList.map((KeyVal) => (
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
                    fullWidth
                    onChange={handleChangeDpt}
                    value={state.departmentDesc}
                    defaultValue={state.departmentDesc}
                  >
                    {departmentList.map((KeyVal) => (
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
                    onChange={handleChangeFun}
                    value={state.functionDesc}
                    defaultValue={state.functionDesc}
                  >
                    {functionsList.map((KeyVal) => (
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
                    fullWidth
                    required
                    onChange={handleChangeProject}
                  >
                    {projectsList.map((KeyVal) => (
                      <MenuItem key={KeyVal.project_id} value={KeyVal.initcap}>
                        {KeyVal.initcap}
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
                    onChange={handleChange}
                    defaultValue={state.invoiceType}
                    value={state.invoiceType}
                  >
                    {invoiceList.map((KeyVal) => (
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
                    onChange={handleChange}
                    value={state.maximusOpus}
                    defaultValue={state.maximusOpus}
                  >
                    <MenuItem value="Maximus">Maximus</MenuItem>
                    <MenuItem value="Opus">Opus</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} sx={{ display: '' }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-select-small">Billing Slab</InputLabel>

                  <Select
                    InputLabelProps={{ shrink: true }}
                    labelId="demo-select-small"
                    id="billingSlab"
                    name="billingSlab"
                    label="Billing Slab"
                    fullWidth
                    onChange={handleChange}
                    value={state.billingSlab}
                    defaultValue={state.billingSlab}
                  >
                    <MenuItem value="SLB-001">SLB-001</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <br />

            <Grid container item xs={12} justifyContent={'center'}>
              <Stack spacing={2} direction="row" justifyContent="center">
                {state.employeeStatus === 'Active' ? (
                  <Button size="medium" variant="contained" type="button" color="primary" onClick={updateEmployeeData}>
                    Save Details
                  </Button>
                ) : (
                  <Button
                    size="medium"
                    variant="contained"
                    type="button"
                    color="primary"
                    onClick={updateEmployeeData}
                    disabled={buttonDisable}
                  >
                    Approve
                  </Button>
                )}
                <Button type="reset" variant="outlined" color="primary" onClick={handleRejection}>
                  Reject
                </Button>
              </Stack>
            </Grid>
          </form>
        </Card>
      </Container>
    </>
  );
}
