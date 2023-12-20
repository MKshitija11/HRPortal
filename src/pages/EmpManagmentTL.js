import React, { useEffect, useState } from 'react';
import { Container, Typography, Card, Stack } from '@mui/material';
import ReactApexChart from 'react-apexcharts';
import { styled, useTheme } from '@mui/material/styles';
import Configuration from '../utils/Configuration';
import { fNumber } from '../utils/formatNumber';
import Loader from '../components/Loader/Loader';
import Iconify from '../components/iconify';

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

export default function EmpManagmentTL() {
  const theme = useTheme();
  const [partnerCount, setPartnerCount] = useState();
  const [partnerName, setPartnerName] = useState();
  const [sortedArray, setSortedArray] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // const colors = ['#FFFF33', '#EC01C5', '#0121EC' ]
  const colors = ['#FEB801', '#F57F4D', '#0090C4', '#27BFBE'];
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

  useEffect(() => {
    const USERDETAILS = JSON.parse(sessionStorage.getItem('USERDETAILS'));
    if (USERDETAILS != null) {
      const getEmpListTLReq = {
        teamLeadId: USERDETAILS?.[0]?.spocEmailId,
      };

      setIsLoading(true);
      Configuration.getEmpListTeamLead(getEmpListTLReq)
        .then((empListTLRes) => {
          if (empListTLRes.data.error) {
            console.log('error');
            //   setErrorMessage(true);
            setTimeout(() => {
              setIsLoading(false);
            }, 500);
          } else {
            setTimeout(() => {
              setIsLoading(true);
            }, 500);

            const arr = empListTLRes.data;

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
            console.log('ARRAY>>', dataArr(arr, key));
            setSortedArray(dataArr(arr, key));
            setPartnerName(dataArr(arr, key).map(({ partnerName }) => partnerName));
            setPartnerCount(dataArr(arr, key).map(({ occurrence }) => occurrence));
            setTimeout(() => {
              setIsLoading(false);
            }, 500);
          }
        })
        .catch((error) => {
          alert('Something went wrong');
        });
      //   setIsLoading(false);
    }
  }, []);

  console.log('ARRAY partnerName...>>', partnerName);
  console.log('ARRAY partnerCount...>>', partnerCount);

  const chartOptions = {
    colors: chartColors,
    labels: partnerName,
    legend: { floating: true, horizontalAlign: 'center' },
    stroke: { colors: [theme.palette.background.paper] },
    dataLabels: {
      enabled: true,
      dropShadow: { enabled: true },
      formatter(val, opts) {
        return opts.w.config.series[opts.seriesIndex];
      },
    },
    tooltip: {
      fillSeriesColor: true,
      y: {
        formatter: (seriesName) => fNumber(seriesName),

        title: {
          formatter: (seriesName) => `${seriesName}`,
        },
        // return config.series[opts.seriesIndex]
      },
    },
    plotOptions: {
      pie: {
        // horizontal: true,
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
    },
    yaxis: {
      min: -30,
      max: 30,
    },
  };

  // const chartOptions = {
  //   series: [
  //     {
  //       name: 'count',
  //       data: partnerCount,
  //     },
  //   ],
  //   options: {
  //     chart: {
  //       type: 'bar',
  //       height: 350,
  //       animations: {
  //         enabled: true,
  //         easing: 'easeinout',
  //         speed: 500,
  //         animatedGradually: {
  //           enabled: true,
  //           delay: 150,
  //         },
  //         dynamicAnimation: {
  //           enabled: true,
  //           spedd: 350,
  //         },
  //       },
  //     },
  //     stroke: {
  //       width: 1,
  //       colors: ['#fff'],
  //     },
  //     plotOptions: {
  //       bar: {
  //         distributed: true,
  //         borderRadius: 4,
  //         barHeight: '40%',
  //         horizontal: true,
  //         dataLabels: {
  //           total: {
  //             enabled: true,
  //             offsetX: 0,
  //             style: {
  //               fontSize: '13px',
  //               fontWeight: 900,
  //             },
  //           },
  //         },
  //       },
  //     },
  //     colors: [
  //       '#33b2df',
  //       '#546E7A',
  //       '#d4526e',
  //       '#13d8aa',
  //       '#A5978B',
  //       '#2b908f',
  //       '#f9a3a4',
  //       '#90ee7e',
  //       '#f48024',
  //       '#69d2e7',
  //       // '#FEB801',
  //       // '#F57F4D',
  //       // '#0090C4',
  //       // '#27BFBE',
  //     ],

  //     dataLabels: {
  //       enabled: true,
  //       markers: {
  //         colors: ['#F44336', '#E91E63', '#9C27B0'],
  //       },
  //     },
  //     xaxis: {
  //       categories: partnerName,
  //     },
  //   },
  // };
  return (
    <>
      <Container>
        {console.log('Array length', sortedArray.length)}
        <Stack>
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
                {sortedArray.length === 0 ? (
                  <Stack alignItems="center" justifyContent="center" marginY="20%" alignContent="center">
                    <Iconify icon="eva:alert-triangle-outline" color="red" width={60} height={60} />
                    <Typography variant="h4" noWrap color="black">
                      No Records Found!!
                    </Typography>
                  </Stack>
                ) : (
                  // <ReactApexChart
                  //   options={chartOptions.options}
                  //   series={chartOptions.series}
                  //   // series={series}
                  //   type="bar"
                  //   height={520}
                  //   colors={colors}
                  // />

                  <ReactApexChart
                  sx={{
                    border: '1px solid lightgrey',
                    borderRadius: '8px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    horizontalAlign: true
                  }}
                    type="donut"
                    height={350}
                    series={partnerCount}
                    options={chartOptions}
                  />
                )}
              </StyledChartWrapper>
            )}
          </Card>
        </Stack>
      </Container>
    </>
  );
}
