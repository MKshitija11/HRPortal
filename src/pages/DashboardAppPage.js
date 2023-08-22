import { Helmet } from "react-helmet-async";
import { faker } from "@faker-js/faker";
// @mui
import { useTheme } from "@mui/material/styles";
import { Grid, Container, Typography } from "@mui/material";
// components
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// import Iconify from "../components/iconify";
import Configuration from "../utils/Configuration";
// sections
import {
  // AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  // AppWebsiteVisits,
  // AppTrafficBySite,
  // AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from "../sections/@dashboard/app";

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const [state, setState] = useState({
    partnerEmpList: [],
    empStatusList: [],
  });
  const [loggedName, setLoggedName] = useState();
  const navigate = useNavigate();

  const [partnerEmpList = [], setPartnerEmpList] = useState();
  const [empStatusList = [], setEmpStatusList] = useState();

  console.log(state.partnerEmpList);
  useEffect(() => {
    let USERDETAILS = "";
    USERDETAILS = JSON.parse(sessionStorage.getItem("USERDETAILS"));
    if (USERDETAILS != null) {
      console.log("USERDETAILS", USERDETAILS);
      console.log("USERDETAILS.partnerName", USERDETAILS.partnerName);

      console.log("USERDETAILS.userProfile", USERDETAILS.userProfile);

      if (USERDETAILS.userProfile !== "BAGIC_ITS") {
        console.log(USERDETAILS.userProfile);
        navigate("/401");
      }

      setLoggedName(USERDETAILS.spocName);

      const dashBoardReq = {
        key: USERDETAILS.userProfile,
        value: USERDETAILS.spocUsername,
      };

      Configuration.getDashBoardData(dashBoardReq).then((dashBoardRes) => {
        console.log("partnerEmployees", dashBoardRes.data.partnerEmployees);
        console.log("statusOnboarding", dashBoardRes.data.statusOnboarding);
        setPartnerEmpList(dashBoardRes.data.partnerEmployees);
        setEmpStatusList(dashBoardRes.data.statusOnboarding);
        console.log(" PartempList.data:2", partnerEmpList);
        console.log(" EmpStatusList.data:2", empStatusList);
        setState(partnerEmpList, dashBoardRes.data.partnerEmployees);
        setState(empStatusList, dashBoardRes.data.statusOnboarding);

        console.log(" PartempList.data:3", partnerEmpList);
        console.log(" empStatusList.data:3", empStatusList);
      });
    }
    // eslint-disable-next-line
  }, []);

  const theme = useTheme();

  return (
    <>
      <Helmet>
        <title> HR Portal | Dashboard </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi {loggedName} , Welcome back!
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}  style={{ display: "" }}>
            <AppConversionRates
              title="Partner Resources Details"
              sx={{ border: "1px solid lightgrey", borderRadius: "8px" }}
              subheader=""
              chartData={partnerEmpList}
            />
          </Grid>

          <Grid item xs={12} md={4} lg={5} style={{ display: "none" }}>
            <AppCurrentVisits
              sx={{ border: "1px solid lightgrey", borderRadius: "8px" }}
              title="Onboarding Status"
              subheader=""
              chartType="donut"
              chartData={empStatusList}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={3} style={{ display: "none" }}>
            <AppCurrentSubject
              title="Current Subject"
              chartLabels={[
                "English",
                "History",
                "Physics",
                "Geography",
                "Chinese",
                "Math",
              ]}
              chartData={[
                { name: "Series 1", data: [80, 50, 30, 40, 100, 20] },
                { name: "Series 2", data: [20, 30, 40, 80, 20, 80] },
                { name: "Series 3", data: [44, 76, 78, 13, 43, 10] },
              ]}
              chartColors={[...Array(6)].map(
                () => theme.palette.text.secondary
              )}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8} style={{ display: "none" }}>
            <AppNewsUpdate
              title="News Update"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: faker.name.jobTitle(),
                description: faker.name.jobTitle(),
                image: `/assets/images/covers/cover_${index + 1}.jpg`,
                postedAt: faker.date.recent(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4} style={{ display: "none" }}>
            <AppOrderTimeline
              title="Order Timeline"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  "1983, orders, $4220",
                  "12 Invoices have been paid",
                  "Order #37745 from September",
                  "New order placed #XF-2356",
                  "New order placed #XF-2346",
                ][index],
                type: `order${index + 1}`,
                time: faker.date.past(),
              }))}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
