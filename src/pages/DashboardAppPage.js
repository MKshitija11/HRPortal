import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Stack } from '@mui/material';

// components
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HandleApi from '../components/CustomComponent/HandleApi';
import Loader from '../components/Loader/Loader';

// import Iconify from "../components/iconify";
import Configuration from '../utils/Configuration';
// sections
import {
  // AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  // AppWebsiteVisits,
  // AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
  AppSMResourceList,
} from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const [state, setState] = useState({
    partnerEmpList: [],
    empStatusList: [],
    smResourceList: [],
  });
  const [loggedName, setLoggedName] = useState();
  const navigate = useNavigate();

  const [partnerEmpList = [], setPartnerEmpList] = useState();
  const [empStatusList = [], setEmpStatusList] = useState();
  const [errorMessage, setErrorMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [smResourceList = [], setSmResourceList] = useState();

  console.log(state.partnerEmpList);
  useEffect(() => {
    let USERDETAILS = '';
    USERDETAILS = JSON.parse(sessionStorage.getItem('USERDETAILS'));
    if (USERDETAILS != null) {
      console.log("USERDETAILS?.[0]?.userProfile ", USERDETAILS)
      // if (USERDETAILS?.[0]?.userProfile !== 'BAGIC_ITS' ) {
      //   navigate('/401');
      // } 
      // else if(USERDETAILS?.[0]?.userProfile !== 'BAGIC_PRESIDENT') {
      //   navigate('/401');
      // }

      setLoggedName(USERDETAILS?.[0]?.spocName);

      const dashBoardReq = {
        key: USERDETAILS?.[0]?.userProfile,
        value: USERDETAILS?.[0]?.spocUsername,
      };

      setIsLoading(true);
      Configuration.getDashBoardData(dashBoardReq)
        .then((dashBoardRes) => {
          if (dashBoardRes.data.error) {
            setErrorMessage(true);
            setIsLoading(false);
          } else {
            // setPartnerEmpList(dashBoardRes.data.partnerEmployees);
            setEmpStatusList(dashBoardRes.data.statusOnboarding);
            // setState(partnerEmpList, dashBoardRes.data.partnerEmployees);
            setState(empStatusList, dashBoardRes.data.statusOnboarding);
            setIsLoading(false);
          }
        })
        .catch((error) => {
          setIsLoading(false);
          alert('Something went wrong');
        });

      const seniormanagerReq = {
        key: 'BAGIC_SM',
        value: '',
      };

      Configuration.getDashBoardForSM(seniormanagerReq).then((seniormanagerRes) => {
        console.log('Respons e===', seniormanagerRes);
        if (seniormanagerRes.data.error) {
          setErrorMessage(true);
          setIsLoading(false);
        } else {
          // setPartnerEmpList(dashBoardRes.data.partnerEmployees);
          // setEmpStatusList(dashBoardRes.data.statusOnboarding);
          // setState(partnerEmpList, dashBoardRes.data.partnerEmployees);
          // setState(empStatusList, dashBoardRes.data.statusOnboarding);
          setSmResourceList(seniormanagerRes.data.smEmployees);
          setIsLoading(false);
        }
      });

      Configuration.getDashBoardForPartner()
        .then((partnerRes) => {
          if (partnerRes.data.error) {
            setErrorMessage(true);
            setIsLoading(false);
          } else {
            setPartnerEmpList(partnerRes.data.partnerEmployees);
            setState(partnerEmpList, partnerRes.data.partnerEmployees);
            setIsLoading(false);
          }
        })
        .catch((error) => {
          setIsLoading(false);
          alert('Something went wrong');
        });
    }
    // eslint-disable-next-line
  }, []);

  const theme = useTheme();
  return (
    <>
      {console.log('SM resource list==>', smResourceList)}
      <Helmet>
        <title> HR Portal | Dashboard </title>
      </Helmet>

      {isLoading ? (
        <Stack justifyContent="center" alignItems="center" mb={20}>
          <Loader />
        </Stack>
      ) : (
        <Container maxWidth="xl">
          <Typography variant="h4" sx={{ mb: 5 }}>
            Hi {loggedName} , Welcome back!
          </Typography>

          {errorMessage ? (
            <HandleApi />
          ) : (
            <Grid container spacing={2}>
              <Grid item xs={12} style={{ display: '', alignItems: 'center', justifyContent: 'center' }}>
                <AppCurrentVisits
                  sx={{
                    border: '1px solid lightgrey',
                    borderRadius: '8px',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  title="Employee Onboarding Status"
                  subheader=""
                  chartType="donut"
                  chartData={empStatusList}
                />
              </Grid>

              <Grid item xs={12} style={{ display: '' }}>
                <AppConversionRates
                  title="Partner Resources Details"
                  sx={{ border: '1px solid lightgrey', borderRadius: '8px' }}
                  subheader=""
                  chartData={partnerEmpList}
                />
              </Grid>

              <Grid item xs={12} style={{ display: '' }}>
                <AppSMResourceList
                  title="Senior Manager Resources Details"
                  sx={{ border: '1px solid lightgrey', borderRadius: '8px' }}
                  subheader=""
                  chartData={smResourceList}
                />
              </Grid>

              {/* <Grid item xs={12} md={6} lg={3} style={{ display: 'none' }}>
                <AppCurrentSubject
                  title="Current Subject"
                  chartLabels={['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math']}
                  chartData={[
                    { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                    { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                    { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
                  ]}
                  chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
                />
              </Grid> */}

              {/* <Grid item xs={12} md={6} lg={8} style={{ display: 'none' }}>
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
              </Grid> */}
{/* 
              <Grid item xs={12} md={6} lg={4} style={{ display: 'none' }}>
                <AppOrderTimeline
                  title="Order Timeline"
                  list={[...Array(5)].map((_, index) => ({
                    id: faker.datatype.uuid(),
                    title: [
                      '1983, orders, $4220',
                      '12 Invoices have been paid',
                      'Order #37745 from September',
                      'New order placed #XF-2356',
                      'New order placed #XF-2346',
                    ][index],
                    type: `order${index + 1}`,
                    time: faker.date.past(),
                  }))}
                />
              </Grid> */}
            </Grid>
          )}
        </Container>
      )}
    </>
  );
}
