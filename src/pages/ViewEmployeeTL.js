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
  Switch,
  Modal,
  Box,
} from '@mui/material';
import { Formik } from 'formik';
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
  const [openApprovalModal, setApprovalModal] = useState(false);
  const [openRejectionModal, setRejectionModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
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

  const maximusOpusList = [
    {
      value: 'Maximus',
      label: 'Maximus',
    },
    {
      value: 'Opus',
      label: 'Opus',
    },
  ];
  const handleChangeWaSwitch = (evt) => {
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

  const handleChangeMv = (evt, setFieldValue) => {
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
      console.log('verticalSubList', getSubVerticalsRes?.data?.[0]?.sub_vertical_desc);
      state.subVerticalList = getSubVerticalsRes.data;
      console.log('subVerticalList', state.subVerticalList);
      setVerticalSubList(state.subVerticalList);
      // if (getSubVerticalsRes.data.length === 1) {
      //   console.log('INSIDE IF');
      //   const subVerticalData = getSubVerticalsRes?.data?.[0]?.sub_vertical_desc;
      //   handleChangeSv(evt, {
      //     verticalSub: subVerticalData,
      //     verticalMain: evt.target.value,
      //   });
      // } else {
      //   console.log('INSIDE ELSE');
      //   state.subVerticalList = getSubVerticalsRes.data;
      //   console.log('subVerticalList', state.subVerticalList);
      //   setVerticalSubList(state.subVerticalList);
      // }
    });
  };

  const handleChangeSv = (evt) => {
    console.log('evt.target.value SV', evt.target.value);
    console.log('evt.target.name SV', evt.target.name);
    // console.log('AUTO FILL', autoFill);
    // console.log('AUTO FILL EVENT ', evt.target);
    setState({
      ...state,
      [evt.target.name]: evt.target.value,
    });

    // if (autoFill) {

    //   console.log('INSIDE AUTO FILL OF SV ', evt.target.name, autoFill, {
    //     verticalSub: autoFill ? autoFill.verticalSub : evt.target.value,
    //     [evt.target.name]: autoFill.verticalMain,
    //   });
    //   setState({
    //     ...state,
    //     [evt.target.name]: autoFill ? autoFill.verticalSub : evt.target.value,
    //     verticalMain: autoFill.verticalMain,
    //   });
    // } else {
    //   console.log('OUTSIDE AUTO FILL', evt.target.value);
    //   setState({
    //     verticalMain: state.verticalMain,
    //     [evt.target.name]: evt.target.value,
    //   });
    // }

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
      document.employeeForm.replacementEcode.readOnly = true;
      state.replacementEcode = 'NA';
    } else {
      document.employeeForm.replacementEcode.value = '';
      document.employeeForm.replacementEcode.readOnly = false;
      state.replacementEcode = '';
    }
  };

  const navigate = useNavigate();
  const location = useLocation();

  const EmployeeList = () => {
    navigate('/EmployeesTL');
  };

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

  const handleOpenUpdateModal = () => {
    setOpenUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setOpenUpdateModal(false);
    updateEmployeeData();
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
      // setFieldValue('employeeStatus', 'Pending For SM Review');
      setState({
        ...state,
        employeeStatus: 'Pending For SM Review',
      });
    }
    // document.getElementById('employeeStatus').value = 'Pending For SM Review';
    state.employeeFullName = `${state.employeeFirstName} ${state.employeeLastName}`;

    const employeeFormObj = new FormData(document.getElementById('employeeForm'));

    const employeeFormData = Object.fromEntries(employeeFormObj.entries());
    if (param === false) {
      if (validForm()) {
        console.log('JSON:employeeFormData::', employeeFormData);

        Configuration.updateEmployeeData(employeeFormData).then((employeeFormRes) => {
          console.log('employeeFormRes::', employeeFormRes.data);
          navigate('/EmployeesTL');
        });
      }
    } else {
      Configuration.updateEmployeeData(employeeFormData).then((employeeFormRes) => {
        console.log('employeeFormRes::', employeeFormRes.data);
        navigate('/EmployeesTL');
      });
    }
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

      setReportingList(REPORTINGDETAILS);

      setPartnerName(USERDETAILS.partnerName);
      setUserProfile(USERDETAILS.userProfile);

      setState({
        ...state,
        // partnerName: USERDETAILS.partnerName,
        createdBy: USERDETAILS.spocEmailId,
      });

      const mainVerticalReq = {
        key: 'MAIN_VERTICAL',
        value: '',
      };

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
    const viewEmployeeReq = {
      id: location.state.row.id,
    };

    Configuration.viewEmployeeData(viewEmployeeReq).then((viewEmployeeRes) => {
      console.log('employeeFormRes::', viewEmployeeRes.data);
      const EMP_DETAILS_STR = JSON.stringify(viewEmployeeRes.data);
      const EMP_DETAILS = JSON.parse(EMP_DETAILS_STR);
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
        verticalMain: EMP_DETAILS.verticalMain,
        verticalSub: EMP_DETAILS.verticalSub,
        departmentDesc: EMP_DETAILS.departmentDesc,
      });
      setPartnerName(EMP_DETAILS.partnerName);

      if (state.employeeStatus === 'Pending For SM Review') {
        setButtonDisable(true);
      }
    });
  }, []);

  const initialValues = {
    employeeFirstName: state.employeeFirstName,
    employeeLastName: state.employeeLastName || '',
    employeeFullName: state.employeeFullName || '',
    mobileNumber: state.mobileNumber || '',
    whatsappNumber: state.whatsappNumber || '',
    personalEmail: state.personalEmail || '',
    officialEmail: state.officialEmail || '',
    partnerName: partnerName || '',
    employeeId: state.employeeId || '',
    joiningDate: state.joiningDate || '',
    newReplacement: state.newReplacement || '',
    replacementEcode: state.replacementEcode || '',
    supportDevelopment: state.supportDevelopment || '',
    evaluationPeriod: state.evaluationPeriod || '',
    employeeStatus: state.employeeStatus || '',
    reportingTeamLead: state.reportingTeamLead || '',
    reportingManager: state.reportingManager || '',
    verticalMain: state.verticalMain || '',
    verticalSub: state.verticalSub || '',
    departmentDesc: state.departmentDesc || '',
    functionDesc: state.functionDesc || '',
    projectType: state.projectType || '',
    invoiceType: state.invoiceType || '',
    maximusOpus: state.maximusOpus || '',
    billingSlab: state.billingSlab || '',
  };
  // console.log('FUNCTION ====', location.state.row.maximusOpus);

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
    supportDevelopment: Yup.string().oneOf(['Support', 'Development'], 'Invalid option').required('Select an option'),
    evaluationPeriod: Yup.string()
      .oneOf(['15 Days', '30 Days', '45 Days', '60 Days'], 'Invalid option')
      .required('Select an option'),
    reportingTeamLead: Yup.string().required('Please Select'),
    reportingManager: Yup.string().required('Please Select'),

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
            validateOnChange={false}
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
                      open={openApprovalModal || openRejectionModal || openUpdateModal}
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
                        {openApprovalModal ? (
                          <Typography id="modal-modal-description" sx={{ mt: 1, textAlign: 'center' }}>
                            Are you sure you want to Approve the Employee?
                          </Typography>
                        ) : openRejectionModal ? (
                          <Typography id="modal-modal-description" sx={{ mt: 1, textAlign: 'center' }}>
                            Are you sure you want to Reject the Employee?
                          </Typography>
                        ) : openUpdateModal ? (
                          <Typography id="modal-modal-description" sx={{ mt: 1, textAlign: 'center' }}>
                            Are you sure you want to Update employee details?
                          </Typography>
                        ) : null}

                        <Grid
                          container
                          item
                          xs={12}
                          justifyContent={'center'}
                          style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}
                        >
                          {/* {opneApprovalModal ? ( */}
                          <>
                            <Stack justifyContent="center">
                              <Button
                                size="medium"
                                variant="contained"
                                type="button"
                                color="primary"
                                // onClick={() => handleApprovalModal(false, setFieldValue)}
                                onClick={() =>
                                  openApprovalModal
                                    ? handleApprovalModal(false, setFieldValue)
                                    : openRejectionModal
                                    ? handleRejectionModal(true, setFieldValue)
                                    : openUpdateModal
                                    ? handleCloseUpdateModal()
                                    : null
                                }
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
                                // onClick={() => setApprovalModal(false)}
                                onClick={() =>
                                  openApprovalModal
                                    ? setApprovalModal(false)
                                    : openRejectionModal
                                    ? setRejectionModal(false)
                                    : openUpdateModal
                                    ? setOpenUpdateModal(false)
                                    : null
                                }
                                sx={{ mt: 2 }}
                              >
                                No
                              </Button>
                            </Stack>
                          </>
                        </Grid>
                      </Box>
                    </Modal>
                  </Stack>
                  <form onSubmit={handleSubmit} spacing={2} method="POST" id="employeeForm" name="employeeForm">
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
                          onChange={(evt) => {
                            handleChange(evt);
                            handleChangeEvent(evt);
                          }}
                          onBlur={handleBlur}
                          error={touched.employeeFirstName ? errors.employeeFirstName : ''}
                          helperText={touched.employeeFirstName ? formik.errors.employeeFirstName : ''}
                          inputProps={{
                            readOnly: state.employeeStatus === 'Pending For TL Review' ? true : null,
                            style: { color: state.employeeStatus === 'Pending For TL Review' ? 'grey' : 'black' },
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
                          inputProps={{
                            readOnly: state.employeeStatus === 'Pending For TL Review' ? true : null,
                            style: { color: state.employeeStatus === 'Pending For TL Review' ? 'grey' : 'black' },
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
                          value={`${values.employeeFirstName} ${values.employeeLastName}`}
                          onChange={(evt) => {
                            handleChange(evt);
                            handleChangeEvent(evt);
                          }}
                          onBlur={handleBlur}
                          error={touched.employeeFullName ? errors.employeeFullName : ''}
                          helperText={touched.employeeFullName ? formik.errors.employeeFullName : ''}
                          inputProps={{
                            readOnly: state.employeeStatus === 'Pending For TL Review' ? true : null,
                            style: { color: state.employeeStatus === 'Pending For TL Review' ? 'grey' : 'black' },
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
                          type="number"
                          value={values.mobileNumber}
                          onChange={(evt) => {
                            handleChange(evt);
                            handleChangeEvent(evt);
                          }}
                          onBlur={handleBlur}
                          // error={Boolean(formik.errors.mobileNumber)}
                          error={touched.mobileNumber ? errors.mobileNumber : ''}
                          helperText={touched.mobileNumber ? formik.errors.mobileNumber : ''}
                          inputProps={{
                            readOnly: state.employeeStatus === 'Pending For TL Review' ? true : null,
                            style: { color: state.employeeStatus === 'Pending For TL Review' ? 'grey' : 'black' },
                          }}
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
                      </Grid>
                      <Grid item xs={4}>
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
                          inputProps={{
                            readOnly: state.employeeStatus === 'Pending For TL Review' ? true : null,
                            style: { color: state.employeeStatus === 'Pending For TL Review' ? 'grey' : 'black' },
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
                          error={touched.personalEmail ? errors.personalEmail : ''}
                          helperText={touched.personalEmail ? formik.errors.personalEmail : ''}
                          inputProps={{
                            readOnly: state.employeeStatus === 'Pending For TL Review' ? true : null,
                            style: { color: state.employeeStatus === 'Pending For TL Review' ? 'grey' : 'black' },
                          }}
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
                          inputProps={{
                            readOnly: state.employeeStatus === 'Pending For TL Review' ? true : null,
                            style: { color: state.employeeStatus === 'Pending For TL Review' ? 'grey' : 'black' },
                          }}
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
                          value={partnerName}
                          // onBlur={handleChange}
                          onChange={(evt) => {
                            handleChange(evt);
                            handleChangeEvent(evt);
                          }}
                          onBlur={handleBlur}
                          error={touched.partnerName ? errors.partnerName : ''}
                          helperText={touched.partnerName ? formik.errors.partnerName : ''}
                         
                          inputProps={{
                            readOnly: state.employeeStatus === 'Pending For TL Review' ? true : null,
                            style: { color: state.employeeStatus === 'Pending For TL Review' ? 'grey' : 'black' },
                          }}
                        />
                      </Grid>

                      <Grid item xs={12} sm={4}>
                        <input type="hidden" value={state.id} id="id" name="id" />
                        <input type="hidden" value={values.billingSlab} id="billingSlab" name="billingSlab" />
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
                          inputProps={{
                            readOnly: state.employeeStatus === 'Pending For TL Review' ? true : null,
                            style: { color: state.employeeStatus === 'Pending For TL Review' ? 'grey' : 'black' },
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
                          inputProps={{
                            min: new Date().toISOString().split('T')[0],
                            readOnly: state.employeeStatus === 'Pending For TL Review' ? true : null,
                            style: { color: state.employeeStatus === 'Pending For TL Review' ? 'grey' : 'black' },
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
                          inputProps={{
                            readOnly: state.employeeStatus === 'Pending For TL Review' ? true : null,
                            style: { color: state.employeeStatus === 'Pending For TL Review' ? 'grey' : 'black' },
                          }}
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
                          // defaultValue={state.replacementEcode}
                          value={values.replacementEcode}
                          onChange={(evt) => {
                            handleChangeEvent(evt);
                            handleChange(evt);
                          }}
                          onBlur={handleBlur}
                          error={touched.replacementEcode ? errors.replacementEcode : ''}
                          helperText={touched.replacementEcode ? formik.errors.replacementEcode : ''}
                          inputProps={{
                            readOnly: state.employeeStatus === 'Pending For TL Review' ? true : null,
                            style: { color: state.employeeStatus === 'Pending For TL Review' ? 'grey' : 'black' },
                          }}
                        />
                      </Grid>

                      <Grid item xs={12} sm={4}>
                        <TextField
                          InputLabelProps={{ shrink: true }}
                          autoComplete="off"
                          name="supportDevelopment"
                          variant="outlined"
                          select
                          required
                          fullWidth
                          id="supportDevelopment"
                          label="Support / Development"
                          onChange={(evt) => {
                            handleChange(evt);
                            handleChangeEvent(evt);
                          }}
                          value={values.supportDevelopment}
                          onBlur={handleBlur}
                          error={touched.supportDevelopment ? errors.supportDevelopment : ''}
                          helperText={touched.supportDevelopment ? formik.errors.supportDevelopment : ''}
                          inputProps={{
                            readOnly: state.employeeStatus === 'Pending For TL Review' ? true : null,
                            style: { color: state.employeeStatus === 'Pending For TL Review' ? 'grey' : 'black' },
                          }}
                        >
                          {supportDevelopmentList.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
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
                          inputProps={{
                            readOnly:
                              state.employeeStatus === 'Pending For TL Review' || state.employeeStatus === 'Active',
                            style: {
                              color:
                                state.employeeStatus === 'Pending For TL Review' || state.employeeStatus === 'Active'
                                  ? 'grey'
                                  : 'black',
                            },
                          }}
                          focused={false}
                          onBlur={handleChange}
                          error={Boolean(errors.employeeStatus)}
                          helperText={errors.employeeStatus}
                        />
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
                          inputProps={{
                            readOnly: state.employeeStatus === 'Pending For TL Review' ? true : null,
                            style: { color: state.employeeStatus === 'Pending For TL Review' ? 'grey' : 'black' },
                          }}
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
                            handleChangeTeamlead(evt);
                          }}
                          value={values.reportingTeamLead}
                          onBlur={handleBlur}
                          error={touched.reportingTeamLead ? errors.reportingTeamLead : ''}
                          helperText={touched.reportingTeamLead ? formik.errors.reportingTeamLead : ''}
                          inputProps={{
                            readOnly: state.employeeStatus === 'Pending For TL Review' ? true : null,
                            style: { color: state.employeeStatus === 'Pending For TL Review' ? 'grey' : 'black' },
                          }}
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
                          inputProps={{
                            readOnly: state.employeeStatus === 'Pending For TL Review' ? true : null,
                            style: { color: state.employeeStatus === 'Pending For TL Review' ? 'grey' : 'black' },
                          }}
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
                    </Grid>
                    <br />
                    <Typography variant="subtitle1" paddingBottom={'15px'}>
                      Profile Details
                    </Typography>

                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          labelId="demo-select-small"
                          id="verticalMain"
                          name="verticalMain"
                          // select={state.mainVerticalList.length !== 0}
                          select={values.verticalMain === ''}
                          label="Main Vertical"
                          fullWidth
                          required
                          value={values.verticalMain}
                          onChange={(evt) => {
                            handleChange(evt);
                            handleChangeMv(evt, setFieldValue);
                          }}
                          // value={values.verticalMain}
                          onBlur={handleBlur}
                          error={touched.verticalMain ? errors.verticalMain : ''}
                          helperText={touched.verticalMain ? formik.errors.verticalMain : ''}
                         
                        >
                          {state.mainVerticalList.map((KeyVal) => (
                            <MenuItem key={KeyVal.main_vertical_id} value={KeyVal.main_vertical_desc}>
                              {KeyVal.main_vertical_desc}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <TextField
                          labelId="demo-select-small"
                          id="verticalSub"
                          name="verticalSub"
                          // select={verticalSubList.length !== 0}
                          select={values.verticalSub === ''}
                          label="Sub Vertical"
                          fullWidth
                          required
                          value={values.verticalSub}
                          onChange={(evt) => {
                            handleChange(evt);
                            handleChangeSv(evt);
                          }}
                          onBlur={handleBlur}
                          error={touched.verticalSub ? errors.verticalSub : ''}
                          helperText={touched.verticalSub ? formik.errors.verticalSub : ''}
                          // disabled={
                          //   state.employeeStatus === 'Pending For TL Review' ||
                          //   state.employeeStatus === 'Pending For SM Review' ||
                          //   state.employeeStatus === 'Pending For IT Spoc Review'
                          // }
                        >
                          {verticalSubList.map((KeyVal) => (
                            <MenuItem key={KeyVal.sub_vertical_id} value={KeyVal.sub_vertical_desc}>
                              {KeyVal.sub_vertical_desc}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <TextField
                          labelId="demo-select-small"
                          id="departmentDesc"
                          name="departmentDesc"
                          // select={departmentList.length !== 0}
                          select={values.departmentDesc === ''}
                          label="Department (IT)"
                          fullWidth
                          required
                          onChange={(evt) => {
                            handleChange(evt);
                            handleChangeDpt(evt);
                          }}
                          value={values.departmentDesc}
                          onBlur={handleBlur}
                          error={touched.departmentDesc ? errors.departmentDesc : ''}
                          helperText={touched.departmentDesc ? formik.errors.departmentDesc : ''}
                          // disabled={
                          //   state.employeeStatus === 'Pending For TL Review' ||
                          //   state.employeeStatus === 'Pending For SM Review' ||
                          //   state.employeeStatus === 'Pending For IT Spoc Review'
                          // }
                        >
                          {departmentList.map((KeyVal) => (
                            <MenuItem key={KeyVal.department_id} value={KeyVal.department_desc}>
                              {KeyVal.department_desc}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <TextField
                          labelId="demo-select-small"
                          id="functionDesc"
                          name="functionDesc"
                          // select={functionsList.length !== 0}
                          select={values.functionDesc === ''}
                          label="Function (IT)"
                          fullWidth
                          required
                          onChange={(evt) => {
                            handleChange(evt);
                            handleChangeFun(evt);
                          }}
                          value={values.functionDesc}
                          onBlur={handleBlur}
                          error={touched.functionDesc ? errors.functionDesc : ''}
                          helperText={touched.functionDesc ? formik.errors.functionDesc : ''}
                          // disabled={
                          //   state.employeeStatus === 'Pending For TL Review' ||
                          //   state.employeeStatus === 'Pending For SM Review' ||
                          //   state.employeeStatus === 'Pending For IT Spoc Review'
                          // }
                        >
                          {functionsList.map((KeyVal) => (
                            <MenuItem key={KeyVal.function_id} value={KeyVal.function_desc}>
                              {KeyVal.function_desc}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <TextField
                          labelId="demo-select-small"
                          id="projectType"
                          name="projectType"
                          // select={projectsList.length !== 0}
                          select={values.projectType === ''}
                          label="Project Type"
                          fullWidth
                          required
                          onChange={(evt) => {
                            handleChange(evt);
                            handleChangeProject(evt);
                          }}
                          value={values.projectType}
                          onBlur={handleBlur}
                          error={touched.projectType ? errors.projectType : ''}
                          helperText={touched.projectType ? formik.errors.projectType : ''}
                          // disabled={
                          //   state.employeeStatus === 'Pending For TL Review' ||
                          //   state.employeeStatus === 'Pending For SM Review' ||
                          //   state.employeeStatus === 'Pending For IT Spoc Review'
                          // }
                        >
                          {projectsList.map((KeyVal) => (
                            <MenuItem key={KeyVal.project_id} value={KeyVal.initcap}>
                              {KeyVal.initcap}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <TextField
                          labelId="demo-select-small"
                          id="invoiceType"
                          name="invoiceType"
                          // select={invoiceList.length !== 0}
                          select={values.invoiceType === ''}
                          label="Invoice Type"
                          fullWidth
                          required
                          onChange={(evt) => {
                            handleChange(evt);
                            handleChangeEvent(evt);
                          }}
                          value={values.invoiceType}
                          onBlur={handleBlur}
                          error={touched.invoiceType ? errors.invoiceType : ''}
                          helperText={touched.invoiceType ? formik.errors.invoiceType : ''}
                          // disabled={
                          //   state.employeeStatus === 'Pending For TL Review' ||
                          //   state.employeeStatus === 'Pending For SM Review' ||
                          //   state.employeeStatus === 'Pending For IT Spoc Review'
                          // }
                        >
                          {invoiceList.map((KeyVal) => (
                            <MenuItem key={KeyVal.invoice_type_id} value={KeyVal.invoice_type_desc}>
                              {KeyVal.invoice_type_desc}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          labelId="demo-select-small"
                          id="maximusOpus"
                          name="maximusOpus"
                          // select={maximusOpusList.length !== 0}
                          select
                          label="Maximus / Opus"
                          fullWidth
                          required
                          onChange={(evt) => {
                            handleChange(evt);
                            handleChangeEvent(evt);
                          }}
                          value={values.maximusOpus}
                          onBlur={handleBlur}
                          error={touched.maximusOpus ? errors.maximusOpus : ''}
                          helperText={touched.maximusOpus ? formik.errors.maximusOpus : ''}
                          // disabled={
                          //   state.employeeStatus === 'Pending For TL Review' ||
                          //   state.employeeStatus === 'Pending For SM Review' ||
                          //   state.employeeStatus === 'Pending For IT Spoc Review'
                          // }
                        >
                          {maximusOpusList.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>
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
                            // onClick={() => updateEmployeeData(false, setFieldValue)}
                            onClick={() => handleOpenUpdateModal()}
                            className={!isValid ? 'disabled-btn' : ''}
                            // disabled={!isValid}
                          >
                            Update
                          </Button>
                        ) : (
                          <>
                            <Button
                              size="medium"
                              variant="contained"
                              type="button"
                              color="primary"
                              onClick={() => handleOpenApprovalModal()}
                              // className={!isValid ? 'disabled-btn' : ''}

                              // disabled={!formik.dirty}
                            >
                              Approve
                            </Button>

                            <Button
                              type="reset"
                              variant="outlined"
                              color="primary"
                              // onClick={() => handleRejection(setFieldValue)}
                              onClick={() => handleOpenRejectionModal()}
                            >
                              Reject
                            </Button>
                          </>
                        )}
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
