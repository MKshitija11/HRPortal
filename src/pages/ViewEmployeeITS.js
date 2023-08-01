import { useLocation, useNavigate } from "react-router-dom";
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

export default function ViewEmployee() {
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
    evaluationPeriod: "",
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

  const handleChangeTeamlead = (evt) => {
    console.log("evt.target.value", evt.target.value);
    console.log("evt.target.name", evt.target.name);

    setState({
      ...state,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleChangeDropDown = (evt) => {
    console.log("evt.target.value", evt.target.value);
    if (evt.target.value === "New") {
      document.employeeForm.replacementEcode.value = "NA";
    } else {
      document.employeeForm.replacementEcode.value = "";
    }
  };

  const navigate = useNavigate();
  const location = useLocation();
  console.log('LOCATION @', location)

  console.log("location.state.id", location.state.id);
  const EmployeeList = () => {
    navigate("/EmployeesITS");
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
    if (document.employeeForm.functionDesc.value === "") {
      return failFocus(document.employeeForm.functionDesc);
    }
    if (document.employeeForm.departmentDesc.value === "") {
      return failFocus(document.employeeForm.departmentDesc);
    }
    if (document.employeeForm.verticalMain.value === "") {
      return failFocus(document.employeeForm.verticalMain);
    }
    if (document.employeeForm.verticalSub.value === "") {
      return failFocus(document.employeeForm.verticalSub);
    }
    if (document.employeeForm.projectType.value === "") {
      return failFocus(document.employeeForm.projectType);
    }

    if (document.employeeForm.maximusOpus.value === "") {
      return failFocus(document.employeeForm.maximusOpus);
    }
    if (document.employeeForm.billingSlab.value === "") {
      return failFocus(document.employeeForm.billingSlab);
    }
    if (document.employeeForm.invoiceType.value === "") {
      return failFocus(document.employeeForm.invoiceType);
    }
    return true;
  };

  const updateEmployeeData = (event) => {
    event.preventDefault();
    document.getElementById("employeeStatus").value = "Active";

    if (validForm()) {
      state.employeeFullName = `${state.employeeFirstName} ${state.employeeLastName}`;

      const employeeFormObj = new FormData(
        document.getElementById("employeeForm")
      );

      const employeeFormData = Object.fromEntries(employeeFormObj.entries());
      console.log("employeeFormData::", employeeFormData);
      console.log("JSON:employeeFormData::", JSON.stringify(employeeFormData));

      Configuration.updateEmployeeData(employeeFormData).then(
        (employeeFormRes) => {
          console.log("employeeFormRes::", employeeFormRes.data);
          navigate("/EmployeesITS");
        }
      );
    }

    // console.log("employeeFirstName", state.employeeFirstName);
    // console.log("employeeLastName", state.employeeLastName);
    // console.log("employeeFullName", state.employeeFullName);
    // console.log("mobileNumber", state.mobileNumber);
    // console.log("whatsappNumber", state.whatsappNumber);
    // console.log("personalEmail", state.personalEmail);
    // console.log("officialEmail", state.officialEmail);
    // console.log("partnerName", state.partnerName);
    // console.log("employeeId", state.employeeId);
    // console.log("joiningDate", state.joiningDate);
    // console.log("newReplacement", state.newReplacement);
    // console.log("replacementEcode	", state.replacementEcode);
    // console.log("supportDevelopment ", state.supportDevelopment);
    // console.log("reportingTeamLead  ", state.reportingTeamLead);
    // console.log("reportingManager   ", state.reportingManager);
    // console.log("reportingAvpVpSvp  ", state.reportingAvpVpSvp);
    // console.log("verticalHeadHod    ", state.verticalHeadHod);
    // console.log("functionDesc       ", state.functionDesc);
    // console.log("departmentDesc     ", state.departmentDesc);
    // console.log("verticalMain       ", state.verticalMain);
    // console.log("verticalSub        ", state.verticalSub);
    // console.log("projectType        ", state.projectType);
    // console.log("maximusOpus        ", state.maximusOpus);
    // console.log("billingSlab        ", state.billingSlab);
    // console.log("invoiceType        ", state.invoiceType);
  };

  const [partnerName, setPartnerName] = useState();

  const [empData = {}, setEmpData] = useState();

  const [reportingList = [], setReportingList] = useState();

  const [buttonDisable, setButtonDisable] = useState();

  useEffect(() => {
    const USERDETAILS = JSON.parse(sessionStorage.getItem("USERDETAILS"));
    const REPORTINGDETAILS = JSON.parse(
      sessionStorage.getItem("REPORTINGDETAILS")
    );

    if (USERDETAILS != null) {
      console.log("USERDETAILS", USERDETAILS);
      console.log("USERDETAILS.partnerName", USERDETAILS.partnerName);

      setReportingList(REPORTINGDETAILS);

      setPartnerName(USERDETAILS.partnerName);
      state.partnerName = USERDETAILS.partnerName;
      state.createdBy = USERDETAILS.spocEmailId;
      console.log("partnerName", partnerName);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
 
    const viewEmployeeReq = {
      id: location.state.id,
     
    };
    console.log('LOCATION.............', location.state.id,)
    Configuration.viewEmployeeData(viewEmployeeReq).then((viewEmployeeRes) => {
      console.log("employeeFormRes::", viewEmployeeRes.data);
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

      if (state.employeeStatus !== "Pending For IT Spoc Review") {
        setButtonDisable(true);
      }
    });
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Helmet>
        <title> HR Portal | Employee Details (IT Spoc)</title>
      </Helmet>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={3}
        >
          <Typography variant="h4">New Employee </Typography>
          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:list-fill" />}
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
                />
              </Grid>
              <Grid item xs={4} textAlign="center">
                <Typography variant="body1">
                  WhatsApp is available on same number?
                </Typography>
                <Typography variant="body1" display={"inline"}>
                  No
                </Typography>
                {state.mobileNumber === state.whatsappNumber ? (
                  <Switch
                    color="success"
                    onChange={handleChangeWaSwitch}
                    defaultChecked
                  />
                ) : (
                  <Switch color="success" onChange={handleChangeWaSwitch} />
                )}
                <Typography variant="body1" display={"inline"}>
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
                />
              </Grid>
            </Grid>
            <br />
            <Typography variant="subtitle1" paddingBottom={"15px"}>
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
                  value={empData.partnerName}
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
                  value={state.employeeId}
                  onChange={handleChange}
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
                    value={state.newReplacement}
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
                  value={empData.replacementEcode}
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
                    value={state.supportDevelopment}
                  >
                    <MenuItem value="Support">Support</MenuItem>
                    <MenuItem value="Development">Development</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <input
                    type="hidden"
                    id="employeeStatus"
                    name="employeeStatus"
                  />

                  <InputLabel id="demo-select-small">
                    Employee Status
                  </InputLabel>

                  <Select
                    InputLabelProps={{ shrink: true }}
                    labelId="demo-select-small"
                    id="employeeStatusdd"
                    name="employeeStatusdd"
                    label="Employee Status"
                    fullWidth
                    onChange={handleChange}
                    value={state.employeeStatus}
                    disabled
                  >
                    <MenuItem value={state.employeeStatus}>
                      {state.employeeStatus}
                    </MenuItem>
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
                    value={state.evaluationPeriod}
                  >
                    <MenuItem value="1 Month">1 Month</MenuItem>
                    <MenuItem value="3 Months">3 Months</MenuItem>
                    <MenuItem value="6 Months">6 Months</MenuItem>
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
                    value={state.reportingTeamLead}
                    readOnly
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
                    value={state.reportingManager}
                    readOnly
                  >
                    {reportingList.map((RAs) =>
                      RAs.teamLeadEmail === state.reportingTeamLead ? (
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
            <Typography variant="subtitle1" paddingBottom={"15px"}>
              Functional Details
            </Typography>

            <Grid container spacing={2}>
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
            </Grid>
            <br />
            <Typography variant="subtitle1" paddingBottom={"15px"}>
              Projects Details
            </Typography>

            <Grid container spacing={2}>
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
            </Grid>
            <br />
            <Typography variant="subtitle1" paddingBottom={"15px"}>
              Costing Details
            </Typography>

            <Grid container spacing={2}>
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

            <Grid container item xs={12} justifyContent={"center"}>
              <Stack spacing={2} direction="row" justifyContent="center">
                {state.employeeStatus === "Active" ? (
                  <Button
                    size="medium"
                    variant="contained"
                    type="button"
                    color="primary"
                    onClick={updateEmployeeData}
                  >
                    Update Details
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
                    Update Details
                  </Button>
                )}
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
