import React, { useEffect, useState } from 'react';
import { Container, Typography, Card, Stack } from '@mui/material';
import ReactApexChart from 'react-apexcharts';
import { styled, useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Configuration from '../utils/Configuration';
import Loader from '../components/Loader/Loader';
import Iconify from '../components/iconify';
import { fNumber } from '../utils/formatNumber';

// components
import { useChart } from '../components/chart';

const CHART_HEIGHT = 400;
const LEGEND_HEIGHT = 72;

const StyledChartWrapper = styled('div')(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(1),
  '& .apexcharts-canvas svg': { height: CHART_HEIGHT },
  '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
    overflow: 'visible',
  },
  '& .apexcharts-legend': {
    height: LEGEND_HEIGHT,
    // display: 'none',
    alignContent: 'center',
    position: 'relative !important',
    borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
  },
}));

export default function EmpManagmentSM() {
  const theme = useTheme();
  const navigate = useNavigate();

  const [partnerCount, setPartnerCount] = useState();
  const [partnerName, setPartnerName] = useState();
  const [sortedArray, setSortedArray] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [teamLeadList, setTeamLeadList] = useState([]);
  const [employeeCount, setEmployeeCount] = useState([]);
  const [partnerNameWithCount, setPartnerNameWithCount] = useState();

  const chartColors = [
    '#3B00ED',
    '#9C27B0',
    '#D81A60',
    '#FF9800',
    '#C7D500',
    ' #57D900',
    '#CD00FF',
    '#00BE5F',
    '#F978B2',
  ];

  const teamLeadData = teamLeadList.map((i) => i.teamLeadName);
  console.log('with count', teamLeadData);
  useEffect(() => {
    const USERDETAILS = JSON.parse(sessionStorage.getItem('USERDETAILS'));
    if (USERDETAILS != null) {
      const empListManagerReq = {
        managerId: USERDETAILS?.[0]?.spocEmailId,
      };
      setIsLoading(true);
      Configuration.getEmpListManager(empListManagerReq)
        .then((empListSMRes) => {
          if (empListSMRes.data.error) {
            console.log('error');
            //   setErrorMessage(true);
            setTimeout(() => {
              setIsLoading(false);
            }, 500);
          } else {
            console.log('Repsonse.data from else ', empListSMRes.data);
            setTimeout(() => {
              setIsLoading(true);
            }, 500);

            const arr = empListSMRes.data.filter((emp) => emp.employeeStatus === 'Active');

            const dataArr = function findOcc(arr, key) {
              const arr2 = [];
              arr.forEach((x) => {
                if (
                  arr2.some((val) => {
                    return val[key] === x[key];
                  })
                ) {
                  arr2.forEach((k) => {
                    if (k[key] === x[key]) {
                      k.occurrence += 1;
                    }
                  });
                } else {
                  const a = {};
                  a[key] = x[key];
                  a.occurrence = 1;
                  arr2.push(a);
                }
              });

              return arr2;
            };

            const key = 'partnerName';
            const key2 = 'occurrence';
            console.log('ARRAY>>', dataArr(arr, key));
            setSortedArray(dataArr(arr, key));
            setPartnerName(dataArr(arr, key).map(({ partnerName }) => partnerName));
            setPartnerCount(dataArr(arr, key).map(({ occurrence }) => occurrence));
            setPartnerNameWithCount(
              dataArr(arr, key).map(({ partnerName }) => partnerName),
              dataArr(arr, key).map(({ occurrence }) => occurrence)
            );
            setTimeout(() => {
              setIsLoading(false);
            }, 500);
          }
        })
        .catch((error) => {
          alert('Something went wrong');
        });
      //   setIsLoading(false);

      const getTLBySMListReq = {
        managerEmail: USERDETAILS?.[0]?.spocEmailId,
      };
      console.log('USERDETAILS REQ', getTLBySMListReq.managerEmail);
      Configuration.getTLBySM(getTLBySMListReq).then((getTLBySMListRes) => {
        console.log('USERDETAILS', getTLBySMListRes.data);
        setTeamLeadList(getTLBySMListRes.data);
        // getTemaLeadData();
      });
    }
  }, []);

  const handleClickedData = (OBstatus, chartName, chartData) => {
    console.log('OBSTATUS>>>>> 1', OBstatus);
    console.log('OBSTATUS>>>>> 2', chartName);
    console.log('OBSTATUS>>>>> 3', chartData);

    navigate('/EmployeesSM', {
      state: {
        filterByPartnerName: chartData,
      },
    });
  };

  const chartOptions = useChart({
    colors: chartColors,
    labels: partnerName,
    legend: { floating: true, horizontalAlign: 'center' },
    dataLabels: {
      enabled: true,
      dropShadow: { enabled: true },
      formatter(val, opts) {
        return opts.w.config.series[opts.seriesIndex];
      },
    },
    tooltip: {
      fillSeriesColor: true,
      // y: {
      //   formatter: (seriesName) => fNumber(seriesName/1),

      //   title: {
      //     formatter: (seriesName) => `${seriesName}`,
      //   },
      //   // return config.series[opts.seriesIndex]
      // },
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Total',
              color: '#373d3f',
              fontSize: '22px',
              formatter(w) {
                return w.globals.seriesTotals.reduce((a, b) => {
                  return a + b;
                }, 0);
              },
            },
          },
        },
      },
    },
    fill: {
      type: 'solid',
    },
    chart: {
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 500,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
      },
      events: {
        dataPointSelection: (event, chartContext, config) => {
          handleClickedData(
            config.w.config.series[config.seriesIndex].name,
            partnerName,
            partnerName[config.dataPointIndex]
          );
        },
      },
    },
  });

  const chartOptionForTL = {
    series: [
      // { name: 'Team Lead', data: teamLeadData, color: '#008000' }
      {
        data: [15, 15, 15, 15],
      },
    ],
    options: {
      chart: {
        type: 'bar',
        height: 350,
        stacked: true,
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 500,
          animateGradually: {
            enabled: true,
            delay: 150,
          },
          dynamicAnimation: {
            enabled: true,
            speed: 350,
          },
        },
      },
      stroke: {
        width: 1,
        colors: ['#fff'],
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
        },
      },
      // plotOptions: {
      //   bar: {
      //     borderRadius: 4,
      //     horizontal: true,
      //     dataLabels: {
      //       total: {
      //         enabled: true,
      //         offsetX: 0,
      //         style: {
      //           fontSize: '13px',
      //           fontWeight: 900,
      //         },
      //       },
      //     },
      //   },
      // },
      // dataLabels: {
      //   enabled: true,
      //   markers: {
      //     colors: ['#F44336', '#E91E63', '#9C27B0'],
      //   },
      // },
      dataLabels: {
        enabled: true,
      },
      xaxis: {
        categories: teamLeadData,
        // categories1: chartLabels
      },
    },
  };

  return (
    <>
      <Container>
        <Stack spacing={2}>
          <Card
            container
            sx={{
              padding: '15px',
              border: '1px solid lightgray',
              borderRadius: '8px',
            }}
          >
            {isLoading ? (
              <Stack style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Loader />
              </Stack>
            ) : (
              <StyledChartWrapper dir="ltr">
                <Typography
                  style={{
                    margin: 0,
                    fontWeight: '700',
                    lineHeight: '1.5',
                    fontSize: '1.0625rem',
                    fontFamily: 'Roboto,sans-serif',
                  }}
                >
                  Employee Dashboard
                </Typography>
                {sortedArray.length === 0 ? (
                  <Stack alignItems="center" justifyContent="center" marginY="20%" alignContent="center">
                    <Iconify icon="eva:alert-triangle-outline" color="red" width={60} height={60} />
                    <Typography variant="h4" noWrap color="black">
                      No Records Found!!
                    </Typography>
                  </Stack>
                ) : (
                  <ReactApexChart type="donut" height={350} series={partnerCount} options={chartOptions} />
                )}
              </StyledChartWrapper>
            )}
          </Card>
          {/* <Card
            container
            sx={{
              padding: '15px',
              border: '1px solid lightgray',
              borderRadius: '8px',
            }}
            spacing={2}
          >
            {isLoading ? (
              <Stack style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Loader />
              </Stack>
            ) : (
              <StyledChartWrapper dir="ltr">
                <Typography
                  style={{
                    margin: 0,
                    fontWeight: '700',
                    lineHeight: '1.5',
                    fontSize: '1.0625rem',
                    fontFamily: 'Roboto,sans-serif',
                  }}
                >
                  Team Lead Dashboard
                </Typography>
                <ReactApexChart
                  options={chartOptionForTL.options}
                  series={chartOptionForTL.series}
                  type="bar"
                  height={300}
                  colors={chartColors}
                />
              </StyledChartWrapper>
            )}
          </Card> */}
        </Stack>
      </Container>
    </>
  );
}
