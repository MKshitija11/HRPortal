import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
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
} from "@mui/material";
// components
import Iconify from "../components/iconify";
import Configuration from "../utils/Configuration";

export default function EmployeeList() {
  const [state, setState] = useState({
    employeeFirstName: "",
    employeeLastName: "",
    employeeFullName: "",
    mobileNumber: "",
    whatsappNumber: "",
    personalEmail: "",
    officialEmail: "",
    partnerName: "",
    employeeId: "",
    joiningDate: "",
    newReplacement: "",
    replacementEcode: "",
    supportDevelopment: "",
    reportingTeamLead: "",
    reportingManager: "",
    reportingAvpVpSvp: "",
    verticalHeadHod: "",
    functionDesc: "",
    departmentDesc: "",
    verticalMain: "",
    verticalSub: "",
    projectType: "",
    maximusOpus: "",
    billingSlab: "",
    invoiceType: "",
    createdBy: "",
    employeeStatus: "",
    mainVerticalList: [],
    subVerticalList: [],
    departmentList: [],
    functionsList: [],
    projectsList: [],
    invoiceList: [],
  });

  const handleChangeWaSwitch = (evt) => {
    console.log();
    if (evt.target.checked) {
      document.getElementById("whatsappNumber").value = state.mobileNumber;
      state.whatsappNumber = state.mobileNumber;
    } else {
      document.getElementById("whatsappNumber").value = "";
      state.whatsappNumber = "";
    }
    console.log("state.mobileNumber", state.mobileNumber);
    console.log("state.whatsappNumber", state.whatsappNumber);
  };
  const handleChange = (evt) => {
    console.log("evt.target.value", evt.target.value);
    console.log("evt.target.name", evt.target.name);

    setState({
      ...state,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleChangeMv = (evt) => {
    console.log("evt.target.value", evt.target.value);
    console.log("evt.target.name", evt.target.name);

    console.log("state.empProfileSvList", state.empProfileSvList);
    const getSubVerticalsReq = {
      key: "SUB_VERTICAL",
      value: evt.target.value,
    };

    Configuration.getSubVerticals(getSubVerticalsReq).then(
      (getSubVerticalsRes) => {
        state.subVerticalList = getSubVerticalsRes.data;
        console.log("subVerticalList", state.subVerticalList);
        setVerticalSubList(state.subVerticalList);
        console.log("verticalSubList", verticalSubList);
      }
    );
  };

  const handleChangeSv = (evt) => {
    console.log("evt.target.value", evt.target.value);
    console.log("evt.target.name", evt.target.name);

    const getDepartmentReq = {
      key: "DEPARTMENTS",
      value: evt.target.value,
    };

    Configuration.getDepartments(getDepartmentReq).then((getDepartmentRes) => {
      state.departmentList = getDepartmentRes.data;
      console.log("departmentList", state.departmentList);
      setDepartmentList(state.departmentList);
      console.log("departmentList", departmentList);
    });
  };

  const handleChangeDpt = (evt) => {
    console.log("evt.target.value", evt.target.value);
    console.log("evt.target.name", evt.target.name);

    const getFunctionReq = {
      key: "FUNCTIONS",
      value: evt.target.value,
    };

    Configuration.getFunctions(getFunctionReq).then((getFunctionsRes) => {
      state.functionsList = getFunctionsRes.data;
      console.log("functionList", state.functionsList);
      setFunctionsList(state.functionsList);
      console.log("functionsList", functionsList);
    });
  };

  const handleChangeFun = (evt) => {
    console.log("evt.target.value", evt.target.value);
    console.log("evt.target.name", evt.target.name);

    const getProjectsReq = {
      key: "PROJECTS",
      value: evt.target.value,
    };

    Configuration.getProjects(getProjectsReq).then((getProjectsRes) => {
      state.projectsList = getProjectsRes.data;
      console.log("functionList", state.projectsList);
      setProjectsList(state.projectsList);
      console.log("projectsList", projectsList);
    });
  };

  const handleChangeProject = (evt) => {
    console.log("evt.target.value", evt.target.value);
    console.log("evt.target.name", evt.target.name);

    const getInvoiceReq = {
      key: "INVOICE_TYPE",
      value: evt.target.value,
    };

    Configuration.getInvoice(getInvoiceReq).then((getInvoiceRes) => {
      state.invoiceList = getInvoiceRes.data;
      console.log("functionList", state.invoiceList);
      setInvoiceList(state.invoiceList);
      console.log("invoiceList", invoiceList);
    });
  };
  const handleChangeTeamlead = (evt) => {
    console.log("evt.target.value", evt.target.value);
    console.log("evt.target.name", evt.target.name);

    setTeamLeadSelected(evt.target.value);

    setState({
      ...state,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleChangeDropDown = (evt) => {
    console.log("evt.target.value", evt.target.value);
    if (evt.target.value === "New") {
      document.employeeForm.replacementEcode.value = "NA";
      document.employeeForm.replacementEcode.readOnly = true;
    } else {
      document.employeeForm.replacementEcode.value = "";
      document.employeeForm.replacementEcode.readOnly = false;
    }
  };

  const navigate = useNavigate();
  const EmployeeList = () => {
    navigate("/EmployeesBP");
  };

  const failFocus = (autoFocusObj) => {
    autoFocusObj.focus();
    return false;
  };

  const validForm = () => {
    if (document.employeeForm.employeeFirstName.value === "") {
      return failFocus(document.employeeForm.employeeFirstName);
    }
    if (document.employeeForm.employeeLastName.value === "") {
      return failFocus(document.employeeForm.employeeLastName);
    }
    if (document.employeeForm.employeeFullName.value === "") {
      return failFocus(document.employeeForm.employeeFullName);
    }
    if (document.employeeForm.mobileNumber.value === "") {
      return failFocus(document.employeeForm.mobileNumber);
    }
    if (document.employeeForm.whatsappNumber.value === "") {
      return failFocus(document.employeeForm.whatsappNumber);
    }
    if (document.employeeForm.personalEmail.value === "") {
      return failFocus(document.employeeForm.personalEmail);
    }
    if (document.employeeForm.officialEmail.value === "") {
      return failFocus(document.employeeForm.officialEmail);
    }

    if (document.employeeForm.partnerName.value === "") {
      return failFocus(document.employeeForm.partnerName);
    }

    if (document.employeeForm.employeeId.value === "") {
      return failFocus(document.employeeForm.employeeId);
    }

    if (document.employeeForm.joiningDate.value === "") {
      return failFocus(document.employeeForm.joiningDate);
    }

    if (document.employeeForm.newReplacement.value === "") {
      return failFocus(document.employeeForm.newReplacement);
    }

    if (document.employeeForm.replacementEcode.value === "") {
      return failFocus(document.employeeForm.replacementEcode);
    }

    if (document.employeeForm.supportDevelopment.value === "") {
      return failFocus(document.employeeForm.supportDevelopment);
    }

    if (document.employeeForm.supportDevelopment.value === "") {
      return failFocus(document.employeeForm.supportDevelopment);
    }
    if (document.employeeForm.employeeStatus.value === "") {
      return failFocus(document.employeeForm.employeeStatus);
    }

    if (document.employeeForm.reportingTeamLead.value === "") {
      return failFocus(document.employeeForm.reportingTeamLead);
    }
    if (document.employeeForm.reportingManager.value === "") {
      return failFocus(document.employeeForm.reportingManager);
    }
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
    // if (document.employeeForm.billingSlab.value === "") {
    //   return failFocus(document.employeeForm.billingSlab);
    // }
    // if (document.employeeForm.invoiceType.value === "") {
    //   return failFocus(document.employeeForm.invoiceType);
    // }
    return true;
  };

  const saveEmployeeData = (event) => {
    event.preventDefault();
    if (validForm()) {
      state.employeeFullName = `${state.employeeFirstName} ${state.employeeLastName}`;

      const employeeFormObj = new FormData(
        document.getElementById("employeeForm")
      );

      const employeeFormData = Object.fromEntries(employeeFormObj.entries());
      console.log("employeeFormData::", employeeFormData);
      console.log("JSON:employeeFormData::", JSON.stringify(employeeFormData));

      Configuration.saveEmployeeData(employeeFormData).then(
        (employeeFormRes) => {
          console.log("employeeFormRes::", employeeFormRes.data);
          navigate("/EmployeesBP");
        }
      );
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
    const USERDETAILS = JSON.parse(sessionStorage.getItem("USERDETAILS"));
    const REPORTINGDETAILS = JSON.parse(
      sessionStorage.getItem("REPORTINGDETAILS")
    );
    const FUNCTIONSDETAILS = JSON.parse(
      sessionStorage.getItem("FUNCTIONSDETAILS")
    );

    if (USERDETAILS != null) {
      console.log("USERDETAILS", USERDETAILS);
      console.log("REPORTINGDETAILS", REPORTINGDETAILS);
      console.log("FUNCTIONSDETAILS", FUNCTIONSDETAILS);
      console.log("USERDETAILS.partnerName", USERDETAILS.partnerName);

      setReportingList(REPORTINGDETAILS);

      const mainVerticalReq = {
        key: "MAIN_VERTICAL",
        value: "",
      };

      console.log("mainVerticalReq", mainVerticalReq);
      Configuration.getMainVerticals(mainVerticalReq).then(
        (mainVerticalRes) => {
          console.log("mainVerticalRes", mainVerticalRes.data);
          setVerticalMainList(mainVerticalRes);
          console.log(" mainVerticalRes.data", verticalMainList);
          state.mainVerticalList = mainVerticalRes.data;
        }
      );

      setPartnerName(USERDETAILS.partnerName);
      state.partnerName = USERDETAILS.partnerName;
      state.createdBy = USERDETAILS.spocEmailId;
    }

    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Helmet>
        <title> HR Portal | New Employee </title>
      </Helmet>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={3}
        >
          <Typography variant="h4">Create New Employee </Typography>
          <Button
            variant="contained"
            startIcon={
              <Iconify icon="material-symbols:patient-list-outline-rounded" />
            }
            onClick={EmployeeList}
          >
            Employee List
          </Button>
        </Stack>

        <Card
          container
          sx={{
            padding: "15px",
            border: "1px solid lightgray",
            borderRadius: "8px",
          }}
        >
          <form spacing={2} method="POST" id="employeeForm" name="employeeForm">
            <Typography variant="subtitle1" paddingBottom={"15px"}>
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
                  label="First Name"
                  value={state.employeeFirstName}
                  onChange={handleChange}
                  autoFocus
                  onKeyPress={(event) => {
                    if (!/[a-z|A-Z]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
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
                  label="Last Name"
                  value={state.employeeLastName}
                  onChange={handleChange}
                  onKeyPress={(event) => {
                    if (!/[a-z|A-Z]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
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
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={4}>
                <TextField
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
                  onKeyPress={(event) => {
                    if (
                      !/[0-9]/.test(event.key) ||
                      event.target.value.toString().length > 9
                    ) {
                      event.preventDefault();
                    }
                  }}
                />
              </Grid>
              <Grid item xs={4} textAlign="center">
                <div
                  style={{
                    border: "1px solid lightgrey",
                    borderRadius: "5px",
                    padding: "0px",
                    maxHeight: "56px",
                  }}
                >
                  <Typography variant="body1">
                    WhatsApp is available on same number?
                  </Typography>
                  <Typography variant="body1" display={"inline"}>
                    No
                  </Typography>
                  <Switch color="success" onChange={handleChangeWaSwitch} />
                  <Typography variant="body1" display={"inline"}>
                    Yes
                  </Typography>
                </div>
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
                  onChange={handleChange}
                  onKeyPress={(event) => {
                    if (
                      !/[0-9]/.test(event.key) ||
                      event.target.value.toString().length > 9
                    ) {
                      event.preventDefault();
                    }
                  }}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="personalEmail"
                  label="Personal Email"
                  name="personalEmail"
                  autoComplete="off"
                  onChange={handleChange}
                  onKeyPress={(event) => {
                    if (!/[-|0-9|a-z|@|.|_]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="officialEmail"
                  label="Official Email"
                  id="officialEmail"
                  autoComplete="off"
                  onChange={handleChange}
                  onKeyPress={(event) => {
                    if (!/[-|0-9|a-z|@|.|_]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                />
              </Grid>
            </Grid>
            <br />
            <Typography variant="subtitle1" paddingBottom={"15px"}>
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
                  onBlur={handleChange}
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
                  onChange={handleChange}
                  onKeyPress={(event) => {
                    if (!/[-|a-z|A-Z|0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
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
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <InputLabel id="demo-select-small">
                    New / Replacement
                  </InputLabel>

                  <Select
                    InputLabelProps={{ shrink: true }}
                    labelId="demo-select-small"
                    id="newReplacement"
                    name="newReplacement"
                    label="New / Replacement"
                    fullWidth
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
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <InputLabel id="demo-select-small">
                    Support / Development
                  </InputLabel>

                  <Select
                    InputLabelProps={{ shrink: true }}
                    labelId="demo-select-small"
                    id="supportDevelopment"
                    name="supportDevelopment"
                    label="Support / Development"
                    fullWidth
                    onChange={handleChange}
                  >
                    <MenuItem value="Support">Support</MenuItem>
                    <MenuItem value="Development">Development</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={4} sx={{ display: "none" }}>
                <FormControl fullWidth>
                  <input
                    type="hidden"
                    id="reportingItSpoc"
                    name="reportingItSpoc"
                    value="pooja.rebba@bajajallianz.co.in"
                  />

                  <InputLabel id="demo-select-small">
                    Employee Status
                  </InputLabel>

                  <Select
                    InputLabelProps={{ shrink: true }}
                    labelId="demo-select-small"
                    id="employeeStatus"
                    name="employeeStatus"
                    label="Employee Status"
                    fullWidth
                    onChange={handleChange}
                    defaultValue={"Pending For TL Review"}
                  >
                    <MenuItem value="Pending For TL Review">
                      Pending For TL Review
                    </MenuItem>
                    <MenuItem value="Resigned">Resigned</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <InputLabel id="demo-select-small">
                    Evaluation Period
                  </InputLabel>

                  <Select
                    InputLabelProps={{ shrink: true }}
                    labelId="demo-select-small"
                    id="evaluationPeriod"
                    name="evaluationPeriod"
                    label="Evaluation Period"
                    fullWidth
                    onChange={handleChange}
                  >
                    <MenuItem value="1 Month">1 Month</MenuItem>
                    <MenuItem value="2 Months">2 Months</MenuItem>
                    <MenuItem value="3 Months">3 Months</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <br />

            <Typography variant="subtitle1" paddingBottom={"15px"}>
              Reporting Authorities
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-select-small">
                    Reporting Authority (TL)
                  </InputLabel>

                  <Select
                    InputLabelProps={{ shrink: true }}
                    labelId="demo-select-small"
                    id="reportingTeamLead"
                    name="reportingTeamLead"
                    label="Reporting Authority  (TL)"
                    fullWidth
                    onChange={handleChangeTeamlead}
                  >
                    {reportingList.map((RAs) => (
                      <MenuItem
                        key={RAs.teamLeadEmail}
                        value={RAs.teamLeadEmail}
                      >
                        {RAs.teamLeadName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-select-small">
                    Reporting Authority (SM)
                  </InputLabel>

                  <Select
                    InputLabelProps={{ shrink: true }}
                    labelId="demo-select-small"
                    id="reportingManager"
                    name="reportingManager"
                    label="Reporting Authority (SM)"
                    fullWidth
                    onChange={handleChange}
                  >
                    {reportingList.map((RAs) =>
                      RAs.teamLeadEmail === teamLeadSelected ? (
                        <MenuItem
                          key={RAs.managerEmail}
                          value={RAs.managerEmail}
                        >
                          {RAs.managerName}
                        </MenuItem>
                      ) : null
                    )}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <br />
            <Typography
              variant="subtitle1"
              paddingBottom={"15px"}
              sx={{
                display: "none",
              }}
            >
              Profile Details
            </Typography>

            <Grid
              container
              spacing={2}
              sx={{
                display: "none",
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
                    onChange={handleChangeMv}
                  >
                    {state.mainVerticalList.map((KeyVal) => (
                      <MenuItem
                        key={KeyVal.main_vertical_id}
                        value={KeyVal.main_vertical_desc}
                      >
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
                  >
                    {state.subVerticalList.map((KeyVal) => (
                      <MenuItem
                        key={KeyVal.sub_vertical_id}
                        value={KeyVal.sub_vertical_desc}
                      >
                        {KeyVal.sub_vertical_desc}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-select-small">
                    Department (IT)
                  </InputLabel>

                  <Select
                    InputLabelProps={{ shrink: true }}
                    labelId="demo-select-small"
                    id="departmentDesc"
                    name="departmentDesc"
                    label="Department (IT)"
                    fullWidth
                    onChange={handleChangeDpt}
                  >
                    {state.departmentList.map((KeyVal) => (
                      <MenuItem
                        key={KeyVal.department_id}
                        value={KeyVal.department_desc}
                      >
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
                  >
                    {state.functionsList.map((KeyVal) => (
                      <MenuItem
                        key={KeyVal.function_id}
                        value={KeyVal.function_desc}
                      >
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
                    onChange={handleChangeProject}
                    fullWidth
                  >
                    {state.projectsList.map((KeyVal) => (
                      <MenuItem
                        key={KeyVal.project_id}
                        value={KeyVal.project_desc}
                      >
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
                    onChange={handleChange}
                  >
                    {state.invoiceList.map((KeyVal) => (
                      <MenuItem
                        key={KeyVal.invoice_type_id}
                        value={KeyVal.invoice_type_desc}
                      >
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
                  >
                    <MenuItem value="Maximus">Maximus</MenuItem>
                    <MenuItem value="Opus">Opus</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
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
                  >
                    <MenuItem value="SLB-001">SLB-001</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <br />

            <Grid container item xs={12} justifyContent={"center"}>
              <Stack spacing={2} direction="row" justifyContent="center">
                <Button
                  size="medium"
                  variant="contained"
                  type="button"
                  color="primary"
                  onClick={saveEmployeeData}
                >
                  Save
                </Button>
                <Button type="reset" variant="outlined" color="primary">
                  Reset
                </Button>
              </Stack>
            </Grid>
          </form>
        </Card>
      </Container>
    </>
  );
}
