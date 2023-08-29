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
import { Formik, useFormikContext } from 'formik';
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
  const [opneApprovalModal, setApprovalModal] = useState(false);
  const [openRejectionModal, setRejectionModal] = useState(false);

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

  // const handleRejection = (setFieldValue) => {
  //   setReject(true);
  //   // setFieldValue('employeeStatus', 'Rejected by TL');
  //   setTimeout(() => {
  //     updateEmployeeData(true, setFieldValue);
  //   }, 1000);
  // };

  const handleOpenApprovalModal = () => {
    setApprovalModal(true);
  };
  const handleApprovalModal = (param, setFieldValue) => {
    setApprovalModal(false);
    updateEmployeeData(false, setFieldValue);
  };

  const handleOpenRejectionModal = () => {
    setRejectionModal(true);
  };

  const handleRejectionModal = (param, setFieldValue) => {
    setReject(true);
    setRejectionModal(false);
    setTimeout(() => {
      updateEmployeeData(true, setFieldValue);
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

  const updateEmployeeData = (param, setFieldValue) => {
    if (param && typeof param === 'boolean') {
      document.getElementById('employeeStatus').value = 'Rejected by TL';
      setFieldValue('employeeStatus', 'Rejected by TL');
      setState({
        ...state,
        employeeStatus: 'Rejected by TL',
      });
    } else {
      document.getElementById('employeeStatus').value = 'Pending For SM Review';
      setFieldValue('employeeStatus', 'Pending For SM Review');
      setState({
        ...state,
        employeeStatus: 'Pending For SM Review',
      });
    }
    // document.getElementById('employeeStatus').value = 'Pending For SM Review';
    // if (validForm()) {

    state.employeeFullName = `${state.employeeFirstName} ${state.employeeLastName}`;

    const employeeFormObj = new FormData(document.getElementById('employeeForm'));

    const employeeFormData = Object.fromEntries(employeeFormObj.entries());

    console.log('JSON:employeeFormData::', JSON.stringify(employeeFormData));
    console.log('Reject...........', state.employeeStatus);

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

  console.log('EMP DATA', location.state.row.billingSlab);
  console.log('EMP DATA STATE', state.employeeFirstName);

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
      // console.log('ID', empData);

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

  const initialValues = {
    employeeFirstName: location.state.row.employeeFirstName,
    employeeLastName: location.state.row.employeeLastName,
    employeeFullName: location.state.row.employeeFullName,
    mobileNumber: location.state.row.mobileNumber,
    whatsappNumber: location.state.row.whatsappNumber,
    personalEmail: location.state.row.personalEmail,
    officialEmail: location.state.row.officialEmail,
    partnerName: location.state.row.partnerName,
    employeeId: location.state.row.employeeId,
    joiningDate: location.state.row.joiningDate,
    newReplacement: location.state.row.newReplacement,
    replacementEcode: location.state.row.replacementEcode,
    supportDevelopment: location.state.row.supportDevelopment,
    evaluationPeriod: location.state.row.evaluationPeriod,
    employeeStatus: location.state.row.employeeStatus,
    reportingTeamLead: location.state.row.reportingTeamLead,
    reportingManager: location.state.row.reportingManager,
    verticalMain: state.verticalMain,
    verticalSub: state.verticalSub,
    departmentDesc: state.departmentDesc,
    functionDesc: state.functionDesc,
    // remarks: state.remarks,
    // billingSlab: state.billingSlab,
    projectType: state.projectType,
    invoiceType: state.invoiceType,
    maximusOpus: state.maximusOpus,
  };

  const validationSchema = Yup.object({
    // employeeFirstName: Yup.string()
    //   .required('First name is required')
    //   .matches(/^[a-zA-Z]+$/, '* This field cannot contain white space and special character'),
    // employeeLastName: Yup.string()
    //   .required('Last name is required')
    //   .matches(/^[a-zA-Z]+$/, '* This field cannot contain white space and special character'),
    // mobileNumber: Yup.string()
    //   .matches(/^[6-9]\d{9}$/, {
    //     message: 'Please enter valid number.',
    //     excludeEmptyString: false,
    //   })
    //   .required('Contact Number is required'),

    // whatsappNumber: Yup.string()
    //   .matches(/^[6-9]\d{9}$/, {
    //     message: 'Please enter valid number.',
    //     excludeEmptyString: false,
    //   })
    //   .required('Whatsapp Number is required'),

    // personalEmail: Yup.string().email('Invalid personal email').required('Personal email is required'),
    // officialEmail: Yup.string()
    //   .email('Invalid official email')
    //   .required('Official email is required')
    //   .notOneOf([Yup.ref('personalEmail'), null], 'Official email must be different from personal email'),
    // employeeId: Yup.string().required('Employee code is required'),
    // joiningDate: Yup.string().required('Required'),

    // newReplacement: Yup.string().oneOf(['New', 'Replacement']).required('Select an option'),
    // // replacementEcode: Yup.string().required('Required'),
    // supportDevelopment: Yup.string().oneOf(['Support', 'Development'], 'Invalid option').required('Select an option'),
    evaluationPeriod: Yup.string()
      .oneOf(['15 Days', '30 Days', '45 Days', '60 Days'], 'Invalid option')
      .required('Select an option'),
    // reportingTeamLead: Yup.string().required('Please Select'),
    // reportingManager: Yup.string().required('Please Select'),
    // remarks: Yup.string().required('Remarks Required'),
    // billingSlab: Yup.string().required('Please Select'),
    verticalMain: Yup.string().required('Please Select'),
    verticalSub: Yup.string().required('Please Select'),
    departmentDesc: Yup.string().required('Please Select'),
    functionDesc: Yup.string().required('Please Select'),
    projectType: Yup.string().required('Please Select'),
    invoiceType: Yup.string().required('Please Select'),
    maximusOpus: Yup.string().required('Please Select'),
  });

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
          <Formik
            enableReinitialize
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
                <>
                  <Stack alignItems="center" justifyContent="center" spacing={5} sx={{ my: 2 }}>
                    <Modal
                      open={opneApprovalModal || openRejectionModal}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box
                        sx={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          width: 410,
                          bgcolor: 'background.paper',
                          border: '2px solid transparent',
                          boxShadow: 24,
                          p: 4,
                          borderRadius: '8px',
                        }}
                        component="form"
                      >
                        {opneApprovalModal ? (
                          <Typography id="modal-modal-description" sx={{ mt: 1, textAlign: 'center' }}>
                            Are you sure you want to Approve the Employee?
                          </Typography>
                        ) : (
                          <Typography id="modal-modal-description" sx={{ mt: 1, textAlign: 'center' }}>
                            Are you sure you want to Reject the Employee?
                          </Typography>
                        )}

                        <Grid
                          container
                          item
                          xs={12}
                          justifyContent={'center'}
                          style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}
                        >
                          {opneApprovalModal ? (
                            <>
                              <Stack justifyContent="center">
                                <Button
                                  size="medium"
                                  variant="contained"
                                  type="button"
                                  color="primary"
                                  onClick={() => handleApprovalModal(false, setFieldValue)}
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
                                  onClick={() => setApprovalModal(false)}
                                  sx={{ mt: 2 }}
                                >
                                  No
                                </Button>
                              </Stack>
                            </>
                          ) : (
                            <>
                              <Stack justifyContent="center">
                                <Button
                                  size="medium"
                                  variant="contained"
                                  type="button"
                                  color="primary"
                                  onClick={() => handleRejectionModal(true, setFieldValue)}
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
                                  onClick={() => setRejectionModal(false)}
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
                          value={values.employeeFirstName}
                          onChange={handleChange}
                          inputProps={{ readOnly: true, style: { color: 'grey' } }}
                          focused={false}
                        />
                      </Grid>

                      <Grid item xs={12} sm={4}>
                        <TextField
                          InputLabelProps={{ shrink: true }}
                          autoComplete="off"
                          name="employeeLastName"
                          variant="outlined"
                          fullWidth
                          id="employeeLastName"
                          label="Last Name"
                          value={values.employeeLastName}
                          onChange={handleChange}
                          inputProps={{ readOnly: true, style: { color: 'grey' } }}
                          focused={false}
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
                          value={values.employeeFullName}
                          onChange={handleChange}
                          inputProps={{ readOnly: true, style: { color: 'grey' } }}
                          focused={false}
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
                          value={values.mobileNumber}
                          onChange={handleChange}
                          inputProps={{ readOnly: true, style: { color: 'grey' } }}
                          focused={false}
                        />
                      </Grid>
                      <Grid item xs={4} textAlign="center">
                        <Typography variant="body1">WhatsApp is available on same number?</Typography>
                        <Typography variant="body1" display={'inline'}>
                          No
                        </Typography>

                        {state.mobileNumber === state.whatsappNumber ? (
                          <Switch color="success" onChange={handleChangeWaSwitch} defaultChecked disabled />
                        ) : (
                          <Switch color="success" onChange={handleChangeWaSwitch} disabled />
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
                          value={values.whatsappNumber}
                          onChange={handleChange}
                          inputProps={{ readOnly: true, style: { color: 'grey' } }}
                          focused={false}
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
                          onChange={handleChange}
                          inputProps={{ readOnly: true, style: { color: 'grey' } }}
                          focused={false}
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
                          onChange={handleChange}
                          inputProps={{ readOnly: true, style: { color: 'grey' } }}
                          focused={false}
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
                          value={values.partnerName}
                          onBlur={handleChange}
                          inputProps={{ readOnly: true, style: { color: 'grey' } }}
                          focused={false}
                        />
                      </Grid>

                      <Grid item xs={12} sm={4}>
                        <input type="hidden" value={state.id} id="id" name="id" />
                        <input
                          type="hidden"
                          value={location.state.row.billingSlab}
                          id="billingSlab"
                          name="billingSlab"
                        />
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
                          onChange={handleChange}
                          inputProps={{ readOnly: true, style: { color: 'grey' } }}
                          focused={false}
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
                          value={values.joiningDate}
                          onChange={handleChange}
                          inputProps={{ readOnly: true, style: { color: 'grey' } }}
                          focused={false}
                        />
                      </Grid>

                      <Grid item xs={12} sm={4}>
                        {/* <FormControl fullWidth>
                        <InputLabel id="demo-select-small">New / Replacement</InputLabel>

                        <Select
                          InputLabelProps={{ shrink: true }}
                          labelId="demo-select-small"
                          id="newReplacement"
                          name="newReplacement"
                          label="New / Replacement"
                          fullWidth
                          value={values.newReplacement}
                          onChange={handleChangeDropDown}
                          inputProps={{ readOnly: true }}
                        >
                          <MenuItem value="New">New</MenuItem>
                          <MenuItem value="Replacement">Replacement</MenuItem>
                        </Select>
                      </FormControl> */}
                        <TextField
                          InputLabelProps={{ shrink: true }}
                          autoComplete="off"
                          name="newReplacement"
                          variant="outlined"
                          required
                          fullWidth
                          id="newReplacement"
                          label="New / Replacement"
                          value={values.newReplacement}
                          onChange={handleChangeDropDown}
                          inputProps={{ readOnly: true, style: { color: 'grey' } }}
                          focused={false}
                        />
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
                          value={values.replacementEcode}
                          onChange={handleChange}
                          inputProps={{ readOnly: true, style: { color: 'grey' } }}
                          focused={false}
                        />
                      </Grid>

                      <Grid item xs={12} sm={4}>
                        {/* <FormControl fullWidth>
                        <InputLabel id="demo-select-small">Support / Development</InputLabel>

                        <Select
                          InputLabelProps={{ shrink: true }}
                          labelId="demo-select-small"
                          id="supportDevelopment"
                          name="supportDevelopment"
                          label="Support / Development"
                          fullWidth
                          onChange={handleChange}
                          value={values.supportDevelopment}
                          inputProps={{ readOnly: true }}
                        >
                          <MenuItem value="Support">Support</MenuItem>
                          <MenuItem value="Development">Development</MenuItem>
                        </Select>
                      </FormControl> */}
                        <TextField
                          InputLabelProps={{ shrink: true }}
                          autoComplete="off"
                          name="supportDevelopment"
                          variant="outlined"
                          required
                          fullWidth
                          id="supportDevelopment"
                          label="Support / Development"
                          value={values.supportDevelopment}
                          onChange={handleChange}
                          inputProps={{ readOnly: true, style: { color: 'grey' } }}
                          focused={false}
                        />
                      </Grid>

                      <Grid item xs={12} sm={4} sx={{ display: '' }}>
                        {userProfile === 'BAGIC_TL' && reject ? (
                          <input type="hidden" id="tlApprovalFlag" name="tlApprovalFlag" value="Rejected" />
                        ) : (
                          <input type="hidden" id="tlApprovalFlag" name="tlApprovalFlag" value="Approved" />
                        )}
                        <input
                          type="hidden"
                          id="reportingItSpoc"
                          name="reportingItSpoc"
                          value="pooja.rebba@bajajallianz.co.in"
                        />
                        <input type="hidden" id="createdBy" name="createdBy" value={state.createdBy} />

                        {/* <input type="hidden" id="employeeStatus" name="employeeStatus" /> */}
                        <TextField
                          InputLabelProps={{ shrink: true }}
                          autoComplete="off"
                          name="employeeStatus"
                          variant="outlined"
                          required
                          fullWidth
                          id="employeeStatus"
                          label="Employee Status"
                          value={values.employeeStatus}
                          onChange={handleChange}
                          inputProps={{ readOnly: true, style: { color: 'grey' } }}
                          focused={false}
                        />
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
                            fullWidth
                            onChange={(evt) => {
                              handleChange(evt);
                              handleChangeTeamlead(evt);
                            }}
                            value={values.reportingTeamLead || ''}
                            autoComplete="off"
                            inputProps={{ readOnly: true, style: { color: 'grey' } }}
                            focused={false}
                            // onBlur={handleBlur}
                            // error={formik.touched.reportingTeamLead && Boolean(formik.errors.reportingTeamLead)}
                            // helperText={formik.touched.reportingTeamLead && formik.errors.reportingTeamLead}
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
                            onChange={(evt) => {
                              handleChange(evt);
                              handleChangeEvent(evt);
                            }}
                            autoComplete="off"
                            value={values.reportingManager}
                            inputProps={{ readOnly: true, style: { color: 'grey' } }}
                            focused={false}
                            // onBlur={handleBlur}
                            // error={formik.touched.reportingManager && Boolean(formik.errors.reportingManager)}
                            // helperText={formik.touched.reportingManager && formik.errors.reportingManager}
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
                            // onChange={handleChangeMv}
                            required
                            onChange={(evt) => {
                              handleChange(evt);
                              handleChangeMv(evt);
                            }}
                            value={values.verticalMain}
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
                            required
                            // onChange={handleChangeSv}
                            onChange={(evt) => {
                              handleChange(evt);
                              handleChangeSv(evt);
                            }}
                            value={values.verticalSub}
                            autoComplete="off"
                            onBlur={handleBlur}
                            error={formik.touched.verticalSub && Boolean(formik.errors.verticalSub)}
                            helperText={formik.touched.verticalSub && formik.errors.verticalSub}
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
                            required
                            onChange={(evt) => {
                              handleChange(evt);
                              handleChangeDpt(evt);
                            }}
                            value={values.departmentDesc}
                            autoComplete="off"
                            onBlur={handleBlur}
                            error={formik.touched.departmentDesc && Boolean(formik.errors.departmentDesc)}
                            helperText={formik.touched.departmentDesc && formik.errors.departmentDesc}
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
                            required
                            onChange={(evt) => {
                              handleChange(evt);
                              handleChangeFun(evt);
                            }}
                            value={values.functionDesc}
                            autoComplete="off"
                            onBlur={handleBlur}
                            error={formik.touched.functionDesc && Boolean(formik.errors.functionDesc)}
                            helperText={formik.touched.functionDesc && formik.errors.functionDesc}
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
                            onChange={(evt) => {
                              handleChange(evt);
                              handleChangeProject(evt);
                            }}
                            value={values.projectType}
                            autoComplete="off"
                            onBlur={handleBlur}
                            error={formik.touched.projectType && Boolean(formik.errors.projectType)}
                            helperText={formik.touched.projectType && formik.errors.projectType}
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
                            required
                            onChange={(evt) => {
                              handleChange(evt);
                              handleChangeEvent(evt);
                            }}
                            value={values.invoiceType}
                            autoComplete="off"
                            onBlur={handleBlur}
                            error={formik.touched.invoiceType && Boolean(formik.errors.invoiceType)}
                            helperText={formik.touched.invoiceType && formik.errors.invoiceType}
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
                            required
                            onChange={(evt) => {
                              handleChange(evt);
                              handleChangeEvent(evt);
                            }}
                            value={values.maximusOpus}
                            autoComplete="off"
                            onBlur={handleBlur}
                            error={formik.touched.maximusOpus && Boolean(formik.errors.maximusOpus)}
                            helperText={formik.touched.maximusOpus && formik.errors.maximusOpus}
                          >
                            <MenuItem value="Maximus">Maximus</MenuItem>
                            <MenuItem value="Opus">Opus</MenuItem>
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
                    </Grid>
                    <br />

                    <Grid container item xs={12} justifyContent={'center'}>
                      <Stack spacing={2} direction="row" justifyContent="center">
                        {state.employeeStatus === 'Active' ? (
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
                            // onClick={() => updateEmployeeData(false, setFieldValue)}
                            onClick={() => handleOpenApprovalModal()}
                            className={!isValid ? 'disabled-btn' : ''}
                            disabled={!isValid}
                          >
                            Approve
                          </Button>
                        )}
                        <Button
                          type="reset"
                          variant="outlined"
                          color="primary"
                          // onClick={() => handleRejection(setFieldValue)}
                          onClick={() => handleOpenRejectionModal()}
                        >
                          Reject
                        </Button>
                      </Stack>
                    </Grid>
                  </form>
                </>
              );
            }}
          </Formik>
        </Card>
      </Container>
    </>
  );
}
