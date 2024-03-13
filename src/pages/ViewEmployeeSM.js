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
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { Formik } from 'formik';
import * as Yup from 'yup';
import addMonths from 'date-fns/addMonths';
import { subMonths } from 'date-fns';
import format from 'date-fns/format';
// components
import Loader from '../components/Loader/Loader';
import Iconify from '../components/iconify';
import Configuration from '../utils/Configuration';
import Constants from '../Constants/Constants';
import CustomProgressBar from './CustomProgressBar';

export default function ViewEmployee() {
  const USERDETAILS = JSON.parse(sessionStorage.getItem('USERDETAILS'));
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
    // projectType: '',
    maximusOpus: '',
    billingSlab: '',
    invoiceType: '',
    createdBy: '',
    employeeStatus: '',
    evaluationPeriod: '',
    reportingItSpoc: '',
    mainVerticalList: [],
    subVerticalList: [],
    departmentList: [],
    functionsList: [],
    projectsList: [],
    invoiceList: [],
    gender: '',
    dateOfBirth: '',
    experience: '',
    totalExperience: '',
    lob: '',
    skillSet: '',
    tlList: [],
    // designation: '',
    webUserId: '',
    projectType: '',
    lwd: '',
    resignationDate: '',
    remarks: '',
    // role: USERDETAILS?.[0]?.userProfile,
  });
  const [openApprovalModal, setApprovalModal] = useState(false);
  const [openRejectionModal, setRejectionModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [teamLeadBySMList = [], setTeamLeadBySMList] = useState();
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [openRejectedconfirmationModal, setRejectedConfirmationModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showAlertMessage, setShowAlertMessage] = useState(false);
  const [updateActiveEmp, setUpdateActiveEmp] = useState(false);
  const [data, setData] = useState([
    'Pending For TL Review',
    'Pending For SM Review',
    'Pending For IT Spoc Review',
    'Active',
  ]);
  // const USERDETAILS = JSON.parse(sessionStorage.getItem('USERDETAILS'));
  const handleChangeWaSwitch = (evt) => {
    if (evt.target.checked) {
      document.getElementById('whatsappNumber').value = state.mobileNumber;
      state.whatsappNumber = state.mobileNumber;
    } else {
      document.getElementById('whatsappNumber').value = '';
      state.whatsappNumber = '';
    }
  };
  const handleChangeEvent = (evt) => {
    setState({
      ...state,
      [evt.target.name]: evt.target.value,
    });
  };
  const handleChangeMv = (evt) => {
    setState({
      ...state,
      [evt.target.name]: evt.target.value,
      verticalSub: '',
      departmentDesc: '',
      functionDesc: '',
    });

    const getSubVerticalsReq = {
      key: 'SUB_VERTICAL',
      value: evt.target.value,
    };

    Configuration.getSubVerticals(getSubVerticalsReq).then((getSubVerticalsRes) => {
      state.subVerticalList = getSubVerticalsRes.data;

      setVerticalSubList(state.subVerticalList);
      if (getSubVerticalsRes?.data.length === 1) {
        handleChangeSv(evt, {
          verticalMain: evt.target.value,
          verticalSub: getSubVerticalsRes?.data?.[0]?.sub_vertical_desc,
        });
      }
    });
  };

  const handleChangeSv = (evt, autoFill) => {
    if (autoFill) {
      setState({
        ...state,
        [evt.target.name]: evt.target.value,
        verticalSub: autoFill ? autoFill.verticalSub : evt.target.value,
        departmentDesc: '',
        functionDesc: '',
      });
    } else {
      setState({
        ...state,
        [evt.target.name]: evt.target.value,
        departmentDesc: '',
        functionDesc: '',
      });
    }
    const getDepartmentReq = {
      key: 'DEPARTMENTS',
      value: autoFill ? autoFill.verticalSub : evt.target.value,
    };

    Configuration.getDepartments(getDepartmentReq).then((getDepartmentRes) => {
      state.departmentList = getDepartmentRes.data;
      setDepartmentList(state.departmentList);
      if (getDepartmentRes?.data.length === 1) {
        handleChangeDpt(evt, {
          verticalMain: autoFill ? autoFill?.verticalMain : state.verticalMain,
          verticalSub: autoFill ? autoFill?.verticalSub : evt.target.value,
          departmentDesc: getDepartmentRes?.data?.[0]?.department_desc,
        });
      }
    });
  };

  const handleChangeDpt = (evt, autoFill) => {
    if (autoFill) {
      setState({
        ...state,
        verticalMain: autoFill?.verticalMain,
        verticalSub: autoFill?.verticalSub,
        departmentDesc: autoFill ? autoFill.departmentDesc : evt.target.value,
        // departmentDesc: '',
        functionDesc: '',
      });
    } else {
      setState({
        ...state,
        [evt.target.name]: evt.target.value,
        verticalMain: state.verticalMain,
        verticalSub: state.verticalSub,
        functionDesc: '',
      });
    }
    const getFunctionReq = {
      key: 'FUNCTIONS',
      value: autoFill ? autoFill.departmentDesc : evt.target.value,
    };

    Configuration.getFunctions(getFunctionReq).then((getFunctionsRes) => {
      state.functionsList = getFunctionsRes.data;
      setFunctionsList(state.functionsList);
      if (getFunctionsRes?.data.length === 1) {
        handleChangeFun(evt, {
          verticalMain: autoFill ? autoFill?.verticalMain : state.verticalMain,
          verticalSub: autoFill ? autoFill?.verticalSub : state.verticalSub,
          departmentDesc: autoFill ? autoFill.departmentDesc : evt.target.value,
          functionDesc: getFunctionsRes?.data?.[0]?.function_desc,
        });
      }
    });
  };

  const handleChangeFun = (evt, autoFill) => {
    if (autoFill) {
      setState({
        ...state,
        verticalMain: autoFill?.verticalMain,
        verticalSub: autoFill?.verticalSub,
        departmentDesc: autoFill ? autoFill.departmentDesc : state.departmentDesc,

        functionDesc: autoFill?.functionDesc,
      });
    } else {
      setState({
        ...state,
        verticalMain: state.verticalMain,
        verticalSub: state.verticalSub,
        departmentDesc: state.departmentDesc,
        [evt.target.name]: evt.target.value,
      });
    }
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
      setInvoiceList(state.invoiceList);
    });
  };

  const handleChangeTeamlead = (evt) => {
    setState({
      ...state,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleChangeSM = (evt) => {
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
      document.employeeForm.replacementEcode.value = 'NA';
      setState({
        ...state,
        replacementEcode: 'NA',
        newReplacement: evt.target.value,
      });
    } else {
      document.employeeForm.replacementEcode.value = '';
      setState({
        ...state,
        replacementEcode: '',
        newReplacement: evt.target.value,
      });
    }
  };

  const navigate = useNavigate();
  const location = useLocation();
  console.log('LOCATION', location.state.row.employeeStatus);

  const EmployeeList = () => {
    navigate('/employeesSM');
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

  const handleRejectionModal = (param, setFieldValue) => {
    setReject(true);
    setRejectionModal(false);
    setTimeout(() => {
      updateEmployeeData(true, setFieldValue);
    }, 1000);
  };

  const handleOpenUpdateModal = () => {
    setOpenUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setOpenUpdateModal(false);
    // updateEmployeeData();
    updateActiveEmployee();
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

    // if (document.employeeForm.supportDevelopment.value === "") {
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
    // if (document.employeeForm.projectType.value === '') {
    //   return failFocus(document.employeeForm.projectType);
    // }
    // if (document.employeeForm.lob.value === '') {
    //   return failFocus(document.employeeForm.lob);
    // }

    if (document.employeeForm.maximusOpus.value === '') {
      return failFocus(document.employeeForm.maximusOpus);
    }
    if (document.employeeForm.billingSlab.value === '') {
      return failFocus(document.employeeForm.billingSlab);
    }
    if (document.employeeForm.invoiceType.value === '') {
      return failFocus(document.employeeForm.invoiceType);
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
    if (document.employeeForm.skillSet.value === '') {
      return failFocus(document.employeeForm.skillSet);
    }
    // if (document.employeeForm.designation.value === '') {
    //   return failFocus(document.employeeForm.designation);
    // }
    return true;
  };

  const updateEmployeeData = (param, setFieldValue) => {
    if (param && typeof param === 'boolean') {
      document.getElementById('employeeStatus').value = 'Rejected by SM';

      setState({
        ...state,
        employeeStatus: 'Rejected by SM',
      });
    } else {
      document.getElementById('employeeStatus').value = 'Pending For IT Spoc Review';
      setState({
        ...state,
        employeeStatus: 'Pending For IT Spoc Review',
      });
    }

    state.employeeFullName = `${state.employeeFirstName} ${state.employeeLastName}`;

    const employeeFormObj = new FormData(document.getElementById('employeeForm'));

    const employeeFormData = Object.fromEntries(employeeFormObj.entries());
    employeeFormData.reportingTeamLead = state.reportingTeamLead.teamLeadEmail;
    console.log('JSON:employeeFormData::', JSON.stringify(employeeFormData));
    if (!param) {
      if (validForm()) {
        console.log('JSON:employeeFormData::', JSON.stringify(employeeFormData));
        setIsLoading(true);
        Configuration.updateEmployeeData(employeeFormData)
          .then((employeeFormRes) => {
            console.log('employeeFormRes::', employeeFormRes.data);
            if (employeeFormRes) {
              setTimeout(() => {
                setIsLoading(false);
                setOpenSuccessModal(true);
              }, 500);
            }
            // navigate('/employeesSM');
          })
          .catch((error) => {
            setIsLoading(false);
            alert('Something went wrong');
          });
      } else {
        setShowAlertMessage(true);
      }
    } else {
      setIsLoading(true);
      Configuration.updateEmployeeData(employeeFormData)
        .then((employeeFormRes) => {
          console.log('employeeFormRes::', employeeFormRes.data);
          if (employeeFormRes) {
            setTimeout(() => {
              setIsLoading(false);
              setRejectedConfirmationModal(true);
            }, 500);
          }
          // navigate('/EmployeesSM');
        })
        .catch((error) => {
          setIsLoading(false);
          alert('Something went wrong');
        });
    }
  };

  const updateActiveEmployee = () => {
    if (state.employeeStatus === 'Resigned') {
      document.getElementById('employeeStatus').value = 'Resigned';
      setState({
        ...state,
        employeeStatus: 'Resigned',
      });
    } else if (state.employeeStatus === 'Resignation Initiated') {
      document.getElementById('employeeStatus').value = 'Resignation Initiated';
      setState({
        ...state,
        employeeStatus: 'Resignation Initiated',
      });
    } else {
      document.getElementById('employeeStatus').value = 'Active';
      setState({
        ...state,
        employeeStatus: 'Active',
      });
    }
    state.employeeFullName = `${state.employeeFirstName} ${state.employeeLastName}`;

    const employeeFormObj = new FormData(document.getElementById('employeeForm'));

    const employeeFormData = Object.fromEntries(employeeFormObj.entries());
    employeeFormData.reportingTeamLead = state.reportingTeamLead.teamLeadEmail;

    console.log('JSON:employeeFormData::', employeeFormData);
    if (validForm()) {
      setIsLoading(true);
      console.log('JSON:employeeFormData::', employeeFormData);
      console.log('JSON:employeeFormData update employee::', employeeFormData);
      Configuration.updateEmployeeData(employeeFormData)
        .then((employeeFormRes) => {
          if (employeeFormRes) {
            setTimeout(() => {
              setIsLoading(false);
              setUpdateActiveEmp(true);
            }, 500);
          }
        })
        .catch((error) => {
          setIsLoading(false);
          alert('Something went wrong');
        });
    } else {
      setShowAlertMessage(true);
    }
  };

  const [partnerName, setPartnerName] = useState();
  const [reject, setReject] = useState(false);
  const [userProfile, setUserProfile] = useState();
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
    // const USERDETAILS = JSON.parse(sessionStorage.getItem('USERDETAILS'));
    const REPORTINGDETAILS = JSON.parse(sessionStorage.getItem('REPORTINGDETAILS'));
    if (USERDETAILS != null) {
      console.log('USERDETAILS', USERDETAILS);

      setReportingList(REPORTINGDETAILS);

      setPartnerName(USERDETAILS?.[0]?.partnerName);
      setUserProfile(USERDETAILS?.[0]?.userProfile);
      state.partnerName = USERDETAILS?.[0]?.partnerName;
      state.createdBy = USERDETAILS?.[0]?.spocEmailId;

      getMainVerticalList();
    }
    // eslint-disable-next-line
  }, []);

  const getMainVerticalList = () => {
    console.log('clciked!!');
    const mainVerticalReq = {
      key: 'MAIN_VERTICAL',
      value: '',
    };

    Configuration.getMainVerticals(mainVerticalReq).then((mainVerticalRes) => {
      setVerticalMainList(mainVerticalRes.data);
      state.mainVerticalList = mainVerticalRes.data;
    });
  };

  useEffect(() => {
    const viewEmployeeReq = {
      id: location.state.row.id,
      // role: USERDETAILS?.[0]?.userProfile,
    };
    setIsLoading(true);
    Configuration.viewEmployeeData(viewEmployeeReq).then((viewEmployeeRes) => {
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
        // projectType: EMP_DETAILS.projectType,
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
        // joiningDate: EMP_DETAILS.joiningDate.toString().split('T')[0],
        joiningDate: EMP_DETAILS?.joiningDate,
        replacementEcode: EMP_DETAILS.replacementEcode,
        verticalMain: EMP_DETAILS.verticalMain,
        verticalSub: EMP_DETAILS.verticalSub,
        departmentDesc: EMP_DETAILS.departmentDesc,
        skillSet: EMP_DETAILS.skillSet,
        lob: EMP_DETAILS.lob,
        experience: EMP_DETAILS.experience,
        totalExperience: EMP_DETAILS.totalExperience,
        gender: EMP_DETAILS.gender,
        dateOfBirth: EMP_DETAILS.dateOfBirth,
        reportingItSpoc: EMP_DETAILS.reportingItSpoc,
        employeeFullName: EMP_DETAILS.employeeFullName,
        webUserId: EMP_DETAILS.webUserId,
        reportingAvpVpSvp: EMP_DETAILS.reportingAvpVpSvp,
        projectType: EMP_DETAILS.projectType,
        lwd: EMP_DETAILS.lwd,
        resignationDate: EMP_DETAILS.resignationDate,
        remarks: EMP_DETAILS.remarks,
      };

      if (EMP_DETAILS.employeeStatus === 'Resigned' && !data.includes('Resigned')) {
        console.log('EMP_DETAILS.employeeStatus================>2222', EMP_DETAILS.employeeStatus === 'Resigned');
        setData([...data, 'Resigned']);
      }
      console.log('JOINING DATE', typeof state.joiningDate);
      setPartnerName(EMP_DETAILS.partnerName);

      if (state.employeeStatus === 'Pending For IT Spoc Review') {
        setButtonDisable(true);
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 500);

      const REPORTINGDETAILS = JSON.parse(sessionStorage.getItem('REPORTINGDETAILS'));

      const getTLBySMListReq = {
        managerEmail: EMP_DETAILS.reportingManager,
      };

      Configuration.getTLBySM(getTLBySMListReq).then((getTLBySMListRes) => {
        const TLObj = getTLBySMListRes?.data.find(
          (o) => o.managerEmail === EMP_DETAILS.reportingManager && o.teamLeadEmail === EMP_DETAILS.reportingTeamLead
        );

        state.tlList = getTLBySMListRes?.data;
        setTeamLeadBySMList(state.tlList);
        tempData.reportingTeamLead = TLObj;
        setState(tempData);
      });
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
    // joiningDate: state.joiningDate || '',
    // joiningDate: (state.joiningDate === null ? state.joiningDate : state.joiningDate.toString().split('T')[0]) || '',
    joiningDate: state.joiningDate ? state.joiningDate.toString().split('T')[0] : '',
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
    // projectType: state.projectType || '',
    invoiceType: state.invoiceType || '',
    maximusOpus: state.maximusOpus || '',
    billingSlab: state.billingSlab || '',
    gender: state.gender || '',
    dateOfBirth: state.dateOfBirth || '',
    experience: state.experience || '',
    totalExperience: state.totalExperience || '',
    lob: state.lob || '',
    skillSet: state.skillSet || '',
    // designation: state.designation || '',
    webUserId: state.webUserId || '',
    lwd: state.lwd || '',
    resignationDate: state.resignationDate || '',
    remarks: state.remarks || '',
    // role: state.role || '',
  };
  console.log('INITIAL VALUES', initialValues.employeeStatus);

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

    newReplacement: Yup.string().oneOf(['New', 'Replacement']).required('Select an option'),
    // replacementEcode: Yup.string().required('Required'),
    supportDevelopment: Yup.string().required('Please Select'),
    // evaluationPeriod: Yup.string()
    //   .oneOf(['15 Days', '30 Days', '45 Days', '60 Days'], 'Invalid option')
    //   .required('Select an option'),
    evaluationPeriod: Yup.string().required('Please Select'),
    reportingTeamLead: Yup.object().required('Please Select'),
    reportingManager: Yup.string().required('Please Select'),

    verticalMain: Yup.string().required('Please Select'),
    verticalSub: Yup.string().required('Please Select'),
    departmentDesc: Yup.string().required('Please Select'),
    functionDesc: Yup.string().required('Please Select'),
    // projectType: Yup.string().required('Please Select'),
    invoiceType: Yup.string().required('Please Select'),
    maximusOpus: Yup.string().required('Please Select'),
    gender: Yup.string().required('Please Select'),
    experience: Yup.string().required('Please Select'),
    // dateOfBirth: Yup.string().required('Date of Birth Required'),
    totalExperience: Yup.string().required('Total Experience required'),
    billingSlab: Yup.number()
      .min(40000, 'Min amount should be 40000')
      .max(500000, 'Max amount should be 500000')
      .required('Monthly Billing rate is required'),
    lob: Yup.string().required('Please Select'),
    skillSet: Yup.string().required('Skill set are required'),
    // designation: Yup.string().required('Please Select'),
  });

  const theme = createTheme({
    components: {
      MuiFormLabel: {
        styleOverrides: {
          asterisk: { color: 'red' },
        },
      },
    },
  });

  return (
    <>
      <Helmet>
        <title> New Employee | HR Portal </title>
      </Helmet>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
          <Typography variant="h4">New Employee </Typography>
          <Button
            variant="contained"
            startIcon={<Iconify icon="material-symbols:home-outline-rounded" />}
            onClick={EmployeeList}
          >
            Home
          </Button>
        </Stack>

        {/* <Stack mt={4} mb={4} justifyContent="center">
          <Stack>
            <CustomProgressBar
              employeeStatus={state.employeeStatus}
              data={data}
              percent={100 / (data.length - data.indexOf(state.employeeStatus))}
            />
          </Stack>
        </Stack> */}

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
                const {
                  values,
                  handleChange,
                  handleSubmit,
                  errors,
                  touched,
                  handleBlur,

                  isValid,
                  setFieldTouched,
                  setFieldValue,
                } = formik;
                return (
                  <>
                    <Stack alignItems="center" justifyContent="center" spacing={5} sx={{ my: 2 }}>
                      <Modal
                        open={
                          openApprovalModal ||
                          openRejectionModal ||
                          openUpdateModal ||
                          openSuccessModal ||
                          openRejectedconfirmationModal ||
                          updateActiveEmp
                        }
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
                          ) : openSuccessModal ? (
                            <Typography id="modal-modal-description" sx={{ mt: 1, textAlign: 'center' }}>
                              Details of <b>{empData.employeeFullName}</b> has been saved successfully and approval is
                              pending with <b>{empData.reportingItSpoc}</b>
                            </Typography>
                          ) : openRejectedconfirmationModal ? (
                            <Typography id="modal-modal-description" sx={{ mt: 1, textAlign: 'center' }}>
                              Details of <b>{empData.employeeFullName}</b> has been rejected by{''}
                              <b>{empData.reportingManager}</b>
                            </Typography>
                          ) : updateActiveEmp ? (
                            <Typography id="modal-modal-description" sx={{ mt: 1, textAlign: 'center' }}>
                              Details of <b>{empData.employeeFullName}</b> has been updated successfully
                            </Typography>
                          ) : null}

                          <Grid
                            container
                            item
                            xs={12}
                            justifyContent={'center'}
                            style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}
                          >
                            {openSuccessModal || openRejectedconfirmationModal || updateActiveEmp ? (
                              <Stack direction="row" justifyContent="center">
                                <Button
                                  size="medium"
                                  variant="contained"
                                  type="button"
                                  color="primary"
                                  // onClick={() => setApprovalModal(false)}
                                  onClick={() => {
                                    setOpenSuccessModal(false);
                                    setRejectedConfirmationModal(false);
                                    setUpdateActiveEmp(false);
                                    navigate('/EmployeesSM');
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
                            )}
                          </Grid>
                        </Box>
                      </Modal>
                    </Stack>
                    <ThemeProvider theme={theme}>
                      <form onSubmit={handleSubmit} spacing={2} method="POST" id="employeeForm" name="employeeForm">
                        <Typography variant="subtitle1" paddingBottom={'15px'}>
                          <b>Personal Information</b>
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
                              error={
                                touched.employeeFirstName || errors.employeeFirstName ? errors.employeeFirstName : ''
                              }
                              helperText={
                                touched.employeeFirstName || errors.employeeFirstName
                                  ? formik.errors.employeeFirstName
                                  : ''
                              }
                              // inputProps={{
                              //   readOnly: state.employeeStatus === 'Pending For SM Review' ? true : null,
                              //   style: { color: state.employeeStatus === 'Pending For SM Review' ? 'grey' : 'black' },
                              // }}
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
                              error={touched.employeeLastName || errors.employeeLastName ? errors.employeeLastName : ''}
                              helperText={
                                touched.employeeLastName || errors.employeeLastName
                                  ? formik.errors.employeeLastName
                                  : ''
                              }
                              // inputProps={{
                              //   readOnly: state.employeeStatus === 'Pending For SM Review' ? true : null,
                              //   style: { color: state.employeeStatus === 'Pending For SM Review' ? 'grey' : 'black' },
                              // }}
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
                              error={touched.employeeFullName || errors.employeeFullName ? errors.employeeFullName : ''}
                              helperText={
                                touched.employeeFullName || errors.employeeFullName
                                  ? formik.errors.employeeFullName
                                  : ''
                              }
                              // inputProps={{
                              //   readOnly: state.employeeStatus === 'Pending For SM Review' ? true : null,
                              //   style: { color: state.employeeStatus === 'Pending For SM Review' ? 'grey' : 'black' },
                              // }}
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
                              value={values.mobileNumber}
                              onChange={(evt) => {
                                handleChange(evt);
                                handleChangeEvent(evt);
                              }}
                              onBlur={handleBlur}
                              // error={Boolean(formik.errors.mobileNumber)}
                              error={touched.mobileNumber || errors.mobileNumber ? errors.mobileNumber : ''}
                              helperText={touched.mobileNumber || errors.mobileNumber ? formik.errors.mobileNumber : ''}
                              // inputProps={{
                              //   readOnly: state.employeeStatus === 'Pending For SM Review' ? true : null,
                              //   style: { color: state.employeeStatus === 'Pending For SM Review' ? 'grey' : 'black' },
                              // }}
                              inputProps={{
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
                                // defaultChecked={state.whatsappNumber !== '' ? false : null}
                                defaultChecked={
                                  state.whatsappNumber === state.mobileNumber ||
                                  empData.mobileNumber === empData.whatsappNumber
                                }
                                // disabled={
                                //   state.employeeStatus === 'Pending For TL Review' ||
                                //   state.employeeStatus === 'Pending For SM Review' ||
                                //   state.employeeStatus === 'Pending For IT Spoc Review'
                                // }
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
                              error={touched.whatsappNumber || errors.whatsappNumber ? errors.whatsappNumber : ''}
                              helperText={
                                touched.whatsappNumber || errors.whatsappNumber ? formik.errors.whatsappNumber : ''
                              }
                              // inputProps={{
                              // inputProps={{
                              //   readOnly: state.employeeStatus === 'Pending For SM Review' ? true : null,
                              //   style: { color: state.employeeStatus === 'Pending For SM Review' ? 'grey' : 'black' },
                              // }}
                              inputProps={{
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
                              error={touched.personalEmail || errors.personalEmail ? errors.personalEmail : ''}
                              helperText={
                                touched.personalEmail || errors.personalEmail ? formik.errors.personalEmail : ''
                              }
                              // inputProps={{
                              // inputProps={{
                              //   readOnly: state.employeeStatus === 'Pending For SM Review' ? true : null,
                              //   style: { color: state.employeeStatus === 'Pending For SM Review' ? 'grey' : 'black' },
                              // }}
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
                              placeholder="abc@gmail.com"
                              id="officialEmail"
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
                              // inputProps={{
                              //   readOnly: state.employeeStatus === 'Pending For SM Review' ? true : null,
                              //   style: { color: state.employeeStatus === 'Pending For SM Review' ? 'grey' : 'black' },
                              // }}
                            />
                          </Grid>
                          <Grid item xs={4}>
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
                              error={touched.gender || errors.gender ? errors.gender : ''}
                              helperText={touched.gender || errors.gender ? formik.errors.gender : ''}
                              // disabled={
                              //   state.employeeStatus === 'Pending For TL Review' ||
                              //   state.employeeStatus === 'Pending For SM Review' ||
                              //   state.employeeStatus === 'Pending For IT Spoc Review'
                              // }
                            >
                              {Constants.genderList.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                  {option.label}
                                </MenuItem>
                              ))}
                            </TextField>
                          </Grid>

                          <Grid item xs={4}>
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
                              onBlur={handleBlur}
                              onKeyDown={(e) => e.preventDefault()}
                              // error={formik.touched.dateOfBirth && Boolean(formik.errors.dateOfBirth)}
                              // helperText={formik.touched.dateOfBirth && formik.errors.dateOfBirth}
                            />
                          </Grid>
                        </Grid>
                        <br />
                        <Typography variant="subtitle1" paddingBottom={'15px'}>
                          <b>Employment Details</b>
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
                              error={touched.partnerName || errors.partnerName ? errors.partnerName : ''}
                              helperText={touched.partnerName || errors.partnerName ? formik.errors.partnerName : ''}
                              // inputProps={{
                              //   readOnly: state.employeeStatus === 'Pending For SM Review' ? true : null,
                              //   style: { color: state.employeeStatus === 'Pending For SM Review' ? 'grey' : 'black' },
                              // }}
                            />
                          </Grid>

                          <Grid item xs={4}>
                            <TextField
                              InputLabelProps={{ shrink: true }}
                              variant="outlined"
                              // required
                              fullWidth
                              name="webUserId"
                              label="User Web Id (For TimeSheet Data)"
                              placeholder="abc@its.bajajallianz.com"
                              id="webUserId"
                              autoComplete="off"
                              type="email"
                              value={values.webUserId}
                              onChange={(evt) => {
                                handleChange(evt);
                                handleChangeEvent(evt);
                              }}
                              onBlur={handleBlur}
                              // error={touched.officialEmail ? errors.officialEmail : ''}
                              // helperText={touched.officialEmail ? formik.errors.officialEmail : ''}
                              // inputProps={{
                              //   readOnly: state.employeeStatus === 'Pending For TL Review' ? true : null,
                              //   style: { color: state.employeeStatus === 'Pending For TL Review' ? 'grey' : 'black' },
                              // }}
                            />
                          </Grid>

                          <Grid item xs={12} sm={4}>
                            <input type="hidden" value={state.id} id="id" name="id" />
                            {/* <input type="hidden" value={values.role} id="role" name="role" /> */}
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
                              error={touched.employeeId || errors.employeeId ? errors.employeeId : ''}
                              helperText={touched.employeeId || errors.employeeId ? formik.errors.employeeId : ''}
                              // inputProps={{
                              // inputProps={{
                              //   readOnly: state.employeeStatus === 'Pending For SM Review' ? true : null,
                              //   style: { color: state.employeeStatus === 'Pending For SM Review' ? 'grey' : 'black' },
                              // }}
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
                              onKeyDown={(e) => e.preventDefault()}
                              onBlur={handleBlur}
                              error={touched.joiningDate || errors.joiningDate ? errors.joiningDate : ''}
                              helperText={touched.joiningDate || errors.joiningDate ? formik.errors.joiningDate : ''}
                              inputProps={{
                                min:
                                  state.employeeStatus === 'Active'
                                    ? null
                                    : format(subMonths(new Date(), 2), 'yyyy-MM-dd'),
                                max:
                                  state.employeeStatus === 'Active'
                                    ? null
                                    : format(addMonths(new Date(), 3), 'yyyy-MM-dd'),
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
                              error={touched.newReplacement || errors.newReplacement ? errors.newReplacement : ''}
                              helperText={
                                touched.newReplacement || errors.newReplacement ? formik.errors.newReplacement : ''
                              }
                              // inputProps={{
                              //   readOnly: state.employeeStatus === 'Pending For SM Review' ? true : null,
                              //   style: { color: state.employeeStatus === 'Pending For SM Review' ? 'grey' : 'black' },
                              // }}
                            >
                              {Constants.newReplacementList.map((option) => (
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
                              error={touched.replacementEcode || errors.replacementEcode ? errors.replacementEcode : ''}
                              helperText={
                                touched.replacementEcode || errors.replacementEcode
                                  ? formik.errors.replacementEcode
                                  : ''
                              }
                              // inputProps={{
                              //   readOnly: state.employeeStatus === 'Pending For SM Review' ? true : null,
                              //   style: { color: state.employeeStatus === 'Pending For SM Review' ? 'grey' : 'black' },
                              // }}
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
                              error={
                                touched.supportDevelopment || errors.supportDevelopment ? errors.supportDevelopment : ''
                              }
                              helperText={
                                touched.supportDevelopment || errors.supportDevelopment
                                  ? formik.errors.supportDevelopment
                                  : ''
                              }
                              // inputProps={{
                              //   readOnly: state.employeeStatus === 'Pending For SM Review' ? true : null,
                              //   style: { color: state.employeeStatus === 'Pending For SM Review' ? 'grey' : 'black' },
                              // }}
                            >
                              {Constants.supportDevelopmentList.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                  {option.label}
                                </MenuItem>
                              ))}
                            </TextField>
                          </Grid>

                          <Grid item xs={12} sm={4}>
                            {userProfile === 'BAGIC_SM' && reject ? (
                              <input type="hidden" id="smApprovalFlag" name="smApprovalFlag" value="Rejected" />
                            ) : (
                              <input type="hidden" id="smApprovalFlag" name="smApprovalFlag" value="Approved" />
                            )}
                            <FormControl fullWidth>
                              <input
                                type="hidden"
                                id="reportingItSpoc"
                                name="reportingItSpoc"
                                value={state.reportingItSpoc}
                              />
                              <input
                                type="hidden"
                                id="reportingAvpVpSvp"
                                name="reportingAvpVpSvp"
                                value={state.reportingAvpVpSvp}
                              />
                              <input type="hidden" id="projectType" name="projectType" value={state.projectType} />
                              {/* <input type="hidden" id="invoiceType" name="invoiceType" value={state.invoiceType} /> */}
                              <input type="hidden" id="createdBy" name="createdBy" value={state.createdBy} />

                              {/* <input type="hidden" id="employeeStatus" name="employeeStatus" /> */}

                              {state.employeeStatus === 'Active' ||
                              state.employeeStatus === 'Resigned' ||
                              state.employeeStatus === 'Resignation Initiated' ? (
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
                                  error={touched.employeeStatus || errors.employeeStatus ? errors.employeeStatus : ''}
                                  helperText={
                                    touched.employeeStatus || errors.employeeStatus ? formik.errors.employeeStatus : ''
                                  }
                                  // }
                                  disabled={
                                    state.employeeStatus === 'Pending For TL Review' ||
                                    state.employeeStatus === 'Pending For SM Review' ||
                                    state.employeeStatus === 'Pending For IT Spoc Review'
                                  }
                                >
                                  {location.state.resignedEmployee !== 'Resigned' ? (
                                    Constants.employeeStatusList.map((option) => (
                                      <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                      </MenuItem>
                                    ))
                                  ) : (
                                    <MenuItem value="Revoke">Revoke</MenuItem>
                                  )}
                                </TextField>
                              ) : (
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
                                  // inputProps={{
                                  //   readOnly:
                                  //     state.employeeStatus === 'Pending For SM Review' || state.employeeStatus === 'Active',
                                  //   style: {
                                  //     color:
                                  //       state.employeeStatus === 'Pending For SM Review' || state.employeeStatus === 'Active'
                                  //         ? 'grey'
                                  //         : 'black',
                                  //   },
                                  // }}
                                  focused={false}
                                  onBlur={handleChange}
                                  error={Boolean(errors.employeeStatus)}
                                  helperText={errors.employeeStatus}
                                />
                              )}
                            </FormControl>
                          </Grid>

                          {values.employeeStatus === 'Resigned' || values.employeeStatus === 'Resignation Initiated' ? (
                            <>
                              <Grid item xs={12} sm={4}>
                                <TextField
                                  InputLabelProps={{ shrink: true }}
                                  autoComplete="off"
                                  name="resignationDate"
                                  variant="outlined"
                                  // required
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
                                  error={
                                    formik.touched.resignationDate || errors.resignationDate
                                      ? Boolean(formik.errors.resignationDate)
                                      : ''
                                  }
                                  helperText={
                                    formik.touched.resignationDate || errors.resignationDate
                                      ? formik.errors.resignationDate
                                      : ''
                                  }
                                />
                              </Grid>

                              <Grid item xs={12} sm={4}>
                                <TextField
                                  InputLabelProps={{ shrink: true }}
                                  autoComplete="off"
                                  name="lwd"
                                  variant="outlined"
                                  // required
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
                              error={touched.evaluationPeriod || errors.evaluationPeriod ? errors.evaluationPeriod : ''}
                              helperText={
                                touched.evaluationPeriod || errors.evaluationPeriod
                                  ? formik.errors.evaluationPeriod
                                  : ''
                              }
                              // inputProps={{
                              //   readOnly: state.employeeStatus === 'Pending For SM Review' ? true : null,
                              //   style: { color: state.employeeStatus === 'Pending For SM Review' ? 'grey' : 'black' },
                              // }}
                            >
                              {Constants.evaluationPeriodList.map((option) => (
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
                              error={touched.experience || errors.experience ? errors.experience : ''}
                              helperText={touched.experience || errors.experience ? formik.errors.experience : ''}
                              // disabled={
                              //   state.employeeStatus === 'Pending For TL Review' ||
                              //   state.employeeStatus === 'Pending For SM Review' ||
                              //   state.employeeStatus === 'Pending For IT Spoc Review'
                              // }
                            >
                              {Constants.experienceSlab.map((option) => (
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
                              error={
                                touched.totalExperience || errors.totalExperience ? Boolean(errors.totalExperience) : ''
                              }
                              helperText={
                                touched.totalExperience || errors.totalExperience ? errors.totalExperience : ''
                              }
                              // inputProps={{
                              //   readOnly: state.employeeStatus === 'Pending For SM Review' ? true : null,
                              //   style: { color: state.employeeStatus === 'Pending For SM Review' ? 'grey' : 'black' },
                              // }}
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
                              error={formik.touched.skillSet || errors.skillSet ? Boolean(formik.errors.skillSet) : ''}
                              helperText={formik.touched.skillSet || errors.skillSet ? formik.errors.skillSet : ''}
                            />
                          </Grid>

                          {/* <Grid item xs={12} sm={4}>
                          <TextField
                            labelId="demo-select-small"
                            id="designation"
                            name="designation"
                            select
                            label="Designation"
                            fullWidth
                            required
                            onChange={(evt) => {
                              handleChange(evt);
                              handleChangeEvent(evt);
                            }}
                            value={values.designation}
                            onBlur={handleBlur}
                            error={touched.designation ? errors.designation : ''}
                            helperText={touched.designation ? formik.errors.designation : ''}
                            // inputProps={{
                            //   readOnly: state.employeeStatus === 'Pending For SM Review' ? true : null,
                            //   style: { color: state.employeeStatus === 'Pending For SM Review' ? 'grey' : 'black' },
                            // }}
                          >
                            {designationList.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Grid> */}
                        </Grid>
                        <br />

                        <Typography variant="subtitle1" paddingBottom={'15px'}>
                          <b>Reporting Authorities</b>
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
                              }}
                              value={state.reportingManager}
                              onBlur={handleBlur}
                              error={touched.reportingManager || errors.reportingManager ? errors.reportingManager : ''}
                              helperText={
                                touched.reportingManager || errors.reportingManager
                                  ? formik.errors.reportingManager
                                  : ''
                              }
                              // disabled={
                              //   state.employeeStatus === 'Pending For TL Review' ||
                              //   state.employeeStatus === 'Pending For SM Review' ||
                              //   state.employeeStatus === 'Pending For IT Spoc Review'
                              // }
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
                                // handleChangeEvent(evt);
                                setState({
                                  ...state,
                                  reportingTeamLead: teamLeadBySMList.find((o) => o.teamLeadName === evt.target.value),
                                });
                              }}
                              value={values.reportingTeamLead.teamLeadName ? values.reportingTeamLead.teamLeadName : ''}
                              onBlur={handleBlur}
                              error={
                                touched.reportingTeamLead || errors.reportingTeamLead ? errors.reportingTeamLead : ''
                              }
                              helperText={
                                touched.reportingTeamLead || errors.reportingTeamLead
                                  ? formik.errors.reportingTeamLead
                                  : ''
                              }
                              // disabled={
                              //   state.employeeStatus === 'Pending For TL Review' ||
                              //   state.employeeStatus === 'Pending For SM Review' ||
                              //   state.employeeStatus === 'Pending For IT Spoc Review'
                              // }
                            >
                              {teamLeadBySMList.map((RAs) => (
                                <MenuItem key={RAs.teamLeadEmail} value={RAs.teamLeadName}>
                                  {RAs.teamLeadName}
                                </MenuItem>
                              ))}
                            </TextField>
                          </Grid>
                        </Grid>
                        <br />
                        <Typography variant="subtitle1" paddingBottom={'15px'}>
                          <b>Profile Details</b>
                        </Typography>

                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              labelId="demo-select-small"
                              id="verticalMain"
                              name="verticalMain"
                              // select={state.mainVerticalList.length !== 0}
                              // select={values.verticalMain === ''}
                              select
                              onClick={getMainVerticalList}
                              label="Main Vertical"
                              fullWidth
                              required
                              value={values.verticalMain}
                              onChange={(evt) => {
                                handleChange(evt);
                                handleChangeMv(evt, setFieldValue);
                              }}
                              onBlur={handleBlur}
                              onFocus={(e) => {
                                if (state.mainVerticalList?.length <= 0) {
                                  e.target.value = empData.verticalMain;
                                  // handleChangeMv(e, setFieldValue);
                                  getMainVerticalList();
                                }
                              }}
                              error={touched.verticalMain || errors.verticalMain ? errors.verticalMain : ''}
                              helperText={touched.verticalMain || errors.verticalMain ? formik.errors.verticalMain : ''}
                            >
                              {state?.mainVerticalList?.length > 0 ? (
                                state.mainVerticalList.map((KeyVal) => (
                                  <MenuItem key={KeyVal.main_vertical_id} value={KeyVal.main_vertical_desc}>
                                    {KeyVal.main_vertical_desc}
                                  </MenuItem>
                                ))
                              ) : (
                                <MenuItem key={values.verticalMain} value={values.verticalMain}>
                                  {values.verticalMain}
                                </MenuItem>
                              )}
                            </TextField>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              labelId="demo-select-small"
                              id="verticalSub"
                              name="verticalSub"
                              // select={verticalSubList.length !== 0}
                              // select={values.verticalSub === ''}
                              select
                              label="Sub Vertical"
                              fullWidth
                              required
                              value={values.verticalSub}
                              onChange={(evt) => {
                                handleChange(evt);
                                handleChangeSv(evt);
                              }}
                              onBlur={handleBlur}
                              onFocus={(e) => {
                                if (verticalSubList?.length <= 0) {
                                  e.target.value = empData.verticalMain;
                                  // handleChangeMv(e, setFieldValue);
                                  handleChangeMv(e, setFieldValue);
                                }
                              }}
                              error={touched.verticalSub || errors.verticalSub ? errors.verticalSub : ''}
                              helperText={touched.verticalSub || errors.verticalSub ? formik.errors.verticalSub : ''}
                              // disabled={
                              //   state.employeeStatus === 'Pending For TL Review' ||
                              //   state.employeeStatus === 'Pending For SM Review' ||
                              //   state.employeeStatus === 'Pending For IT Spoc Review'
                              // }
                            >
                              {verticalSubList?.length > 0 ? (
                                verticalSubList.map((KeyVal) => (
                                  <MenuItem
                                    key={KeyVal.sub_vertical_id}
                                    value={KeyVal.sub_vertical_desc}
                                    id={KeyVal.sub_vertical_id}
                                  >
                                    {KeyVal.sub_vertical_desc}
                                  </MenuItem>
                                ))
                              ) : (
                                <MenuItem key={values.verticalSub} value={values.verticalSub} id={values.verticalSub}>
                                  {values.verticalSub}
                                </MenuItem>
                              )}
                            </TextField>
                          </Grid>

                          <Grid item xs={12} sm={6}>
                            <TextField
                              labelId="demo-select-small"
                              id="departmentDesc"
                              name="departmentDesc"
                              // select={departmentList.length !== 0}
                              select
                              // select={values.departmentDesc === ''}
                              label="Department (IT)"
                              fullWidth
                              required
                              onChange={(evt) => {
                                handleChange(evt);
                                handleChangeDpt(evt);
                              }}
                              value={values.departmentDesc}
                              onBlur={handleBlur}
                              onFocus={(e) => {
                                if (departmentList?.length <= 0) {
                                  e.target.value = empData.verticalSub;
                                  handleChangeSv(e, setFieldValue);
                                }
                              }}
                              error={touched.departmentDesc || errors.departmentDesc ? errors.departmentDesc : ''}
                              helperText={
                                touched.departmentDesc || errors.departmentDesc ? formik.errors.departmentDesc : ''
                              }
                              // disabled={
                              //   state.employeeStatus === 'Pending For TL Review' ||
                              //   state.employeeStatus === 'Pending For SM Review' ||
                              //   state.employeeStatus === 'Pending For IT Spoc Review'
                              // }
                            >
                              {departmentList?.length > 0 ? (
                                departmentList.map((KeyVal) => (
                                  <MenuItem key={KeyVal.department_id} value={KeyVal.department_desc}>
                                    {KeyVal.department_desc}
                                  </MenuItem>
                                ))
                              ) : (
                                <MenuItem key={values.departmentDesc} value={values.departmentDesc}>
                                  {values.departmentDesc}
                                </MenuItem>
                              )}
                            </TextField>
                          </Grid>

                          <Grid item xs={12} sm={6}>
                            <TextField
                              labelId="demo-select-small"
                              id="functionDesc"
                              name="functionDesc"
                              // select={functionsList.length !== 0}
                              // select={values.functionDesc === ''}
                              select
                              label="Function (IT)"
                              fullWidth
                              required
                              onChange={(evt) => {
                                handleChange(evt);
                                handleChangeFun(evt);
                              }}
                              value={values.functionDesc}
                              onBlur={handleBlur}
                              onFocus={(e) => {
                                if (functionsList?.length <= 0) {
                                  e.target.value = empData.departmentDesc;
                                  handleChangeDpt(e, setFieldValue);
                                }
                              }}
                              error={touched.functionDesc || errors.functionDesc ? errors.functionDesc : ''}
                              helperText={touched.functionDesc || errors.functionDesc ? formik.errors.functionDesc : ''}
                              // disabled={
                              //   state.employeeStatus === 'Pending For TL Review' ||
                              //   state.employeeStatus === 'Pending For SM Review' ||
                              //   state.employeeStatus === 'Pending For IT Spoc Review'
                              // }
                            >
                              {functionsList.length > 0 ? (
                                functionsList.map((KeyVal) => (
                                  <MenuItem key={KeyVal.function_id} value={KeyVal.function_desc}>
                                    {KeyVal.function_desc}
                                  </MenuItem>
                                ))
                              ) : (
                                <MenuItem key={values.functionDesc} value={values.functionDesc}>
                                  {values.functionDesc}
                                </MenuItem>
                              )}
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
                              error={touched.maximusOpus || errors.maximusOpus ? errors.maximusOpus : ''}
                              helperText={touched.maximusOpus || errors.maximusOpus ? formik.errors.maximusOpus : ''}
                            >
                              {Constants.maximusOpusList.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                  {option.label}
                                </MenuItem>
                              ))}
                            </TextField>
                          </Grid>

                          {values.maximusOpus === 'Maximus' || values.maximusOpus === 'Maximus and Opus' ? (
                            <Grid item xs={12} sm={6}>
                              <TextField
                                labelId="demo-select-small"
                                id="lob"
                                name="lob"
                                // select={projectsList.length !== 0}
                                // select={values.lob === ''}
                                select
                                label="LOB"
                                fullWidth
                                required
                                onChange={(evt) => {
                                  handleChange(evt);
                                  // handleChangeProject(evt);
                                  handleChangeEvent(evt);
                                }}
                                value={values.lob}
                                onBlur={handleBlur}
                                error={touched.lob || errors.lob ? errors.lob : ''}
                                helperText={touched.lob || errors.lob ? formik.errors.lob : ''}
                                // disabled={
                                //   state.employeeStatus === 'Pending For TL Review' ||
                                //   state.employeeStatus === 'Pending For SM Review' ||
                                //   state.employeeStatus === 'Pending For IT Spoc Review'
                                // }
                              >
                                {Constants.LOBList.map((option) => (
                                  <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                  </MenuItem>
                                ))}
                              </TextField>
                            </Grid>
                          ) : (
                            <input type="hidden" id="lob" name="lob" value={values.lob || ''} />
                          )}

                          {(values.lob === 'Others' || values.lob === 'Internal IT App') &&
                          (values.maximusOpus === 'Maximus' || values.maximusOpus === 'Maximus and Opus') ? (
                            <Grid item xs={12} sm={6}>
                              <TextField
                                labelId="demo-select-small"
                                id="remarks"
                                name="remarks"
                                // select={projectsList.length !== 0}
                                // select={values.lob === ''}
                                //  select
                                label="Others"
                                fullWidth
                                required
                                onChange={(evt) => {
                                  handleChange(evt);
                                  handleChangeEvent(evt);
                                }}
                                value={values.remarks}
                                onBlur={handleBlur}
                                error={touched.remarks || errors.remarks ? errors.remarks : ''}
                                helperText={touched.remarks || errors.remarks ? formik.errors.remarks : ''}
                                // disabled={
                                //   state.employeeStatus === 'Pending For TL Review' ||
                                //   state.employeeStatus === 'Pending For SM Review' ||
                                //   state.employeeStatus === 'Pending For IT Spoc Review'
                                // }
                              />
                            </Grid>
                          ) : (
                            <input type="hidden" id="remarks" name="remarks" value={values.remarks || ''} />
                          )}

                          <Grid item xs={12} sm={6}>
                            <TextField
                              labelId="demo-select-small"
                              id="invoiceType"
                              name="invoiceType"
                              // select={invoiceList.length !== 0}
                              select
                              // select={values.invoiceType === ''}
                              label="Invoice Type"
                              fullWidth
                              required
                              onChange={(evt) => {
                                handleChange(evt);
                                handleChangeEvent(evt);
                              }}
                              value={values.invoiceType}
                              onBlur={handleBlur}
                              error={touched.invoiceType || errors.invoiceType ? errors.invoiceType : ''}
                              helperText={touched.invoiceType || errors.invoiceType ? formik.errors.invoiceType : ''}
                              // disabled={
                              //   state.employeeStatus === 'Pending For TL Review' ||
                              //   state.employeeStatus === 'Pending For SM Review' ||
                              //   state.employeeStatus === 'Pending For IT Spoc Review'
                              // }
                            >
                              {Constants.invoiceTypeList.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                  {option.label}
                                </MenuItem>
                              ))}
                            </TextField>
                          </Grid>

                          <Grid item xs={12} sm={6}>
                            <TextField
                              InputLabelProps={{ shrink: true }}
                              autoComplete="off"
                              name="billingSlab"
                              variant="outlined"
                              required
                              fullWidth
                              id="billingSlab"
                              label="Monthly Billing Rate"
                              value={values.billingSlab}
                              onChange={(evt) => {
                                handleChange(evt);
                                handleChangeEvent(evt);
                              }}
                              onBlur={handleBlur}
                              error={touched.billingSlab || errors.billingSlab ? errors.billingSlab : ''}
                              helperText={touched.billingSlab || errors.billingSlab ? formik.errors.billingSlab : ''}
                            />
                          </Grid>
                        </Grid>
                        <br />

                        <Grid container item xs={12} justifyContent={'center'}>
                          <Stack spacing={2} direction="row" justifyContent="center">
                            {state.employeeStatus === 'Active' ||
                            state.employeeStatus === 'Resigned' ||
                            state.employeeStatus === 'Resignation Initiated' ? (
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
                    </ThemeProvider>
                  </>
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
