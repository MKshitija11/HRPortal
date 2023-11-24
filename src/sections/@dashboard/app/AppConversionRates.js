import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import ReactApexChart from 'react-apexcharts';
// @mui
import { Card, CardHeader } from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
import Configuration from '../../../utils/Configuration';

import { fNumber } from '../../../utils/formatNumber';
// Configuration
// components
import { useChart } from '../../../components/chart';

// ----------------------------------------------------------------------

const CHART_HEIGHT = 672;
const LEGEND_HEIGHT = 77;

const StyledChartWrapper = styled('div')(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(1),
  '& .apexcharts-canvas svg': { height: CHART_HEIGHT },
  '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
    overflow: 'visible',
  },
  '& .apexcharts-legend': {
    height: LEGEND_HEIGHT,
    display: 'none',
    alignContent: 'center',
    position: 'relative !important',
    borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
  },
}));

AppConversionRates.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  chartData: PropTypes.array.isRequired,
};

export default function AppConversionRates({ title, subheader, chartData, ...other }) {
  const navigate = useNavigate();
  console.log('OTHER', other);

  const handleClickChart = (prtnerName) => {
    console.log('CLICKEDDDDD', prtnerName);

    // navigate('/EmployeesITS', {
    //   state: {
    //     partnerNameChart: prtnerName,
    //     filterByPartner: true,
    //   },
    // });
  };

  const handleClickedData = (OBstatus, chartName, chartData) => {
    if (OBstatus === 'Active') {
      navigate('/EmployeesITS', {
        state: {
          partnerName: chartData,
          empOBStatus: OBstatus,
          filterByPartner: true,
        },
      });
    } else if (OBstatus === 'Resigned') {
      navigate('/ResignedEmployeesITS', {
        state: {
          partnerName: chartData,
          empOBStatus: OBstatus,
          filterByPartner: true,
        },
      });
    }
  };

  // console.log('APP CONVERSION RATES.... ', chartData)
  // const chartLabels = chartData.map((i) => i.chartLabel);
  const chartLabels = chartData.map((i) => i.partnerName);
  console.log('CHART LABLES', chartLabels);

  // const chartSeries = chartData.map((i) => i.chartValue);
  const chartSeries = chartData.map((i) => i.total);
  console.log('CHART SERIES', chartSeries);

  const chartColors = chartData.map((i) => i.chartColor);
  console.log('CHART COLOS', chartColors);

  const activeCount = chartData.map((i) => i.activeCount);
  const resignedCount = chartData.map((i) => i.resignedCount);
  // const activeCount = chartData.map((i) => i.activeCount);
  // const partnerName = chartData.map((i) => i.partnerName);
  // const totalCount = chartData.map((i) => i.total);

  const chartOptions = {
    series: [
      {
        name: 'Active',
        data: activeCount,
        color: '#008000',
      },
      {
        name: 'Resigned',
        data: resignedCount,
        color: '#ff0000',
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
        events: {
          click: (event, chartContext, config) => {
            handleClickChart(chartLabels[config.dataPointIndex]);
          },
          dataPointSelection: (event, chartContext, config) => {
            handleClickedData(
              config.w.config.series[config.seriesIndex].name,
              chartLabels,
              chartLabels[config.dataPointIndex]
            );
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
          dataLabels: {
            total: {
              enabled: true,
              offsetX: 0,
              style: {
                fontSize: '13px',
                fontWeight: 900,
              },
            },
          },
        },
      },
      dataLabels: {
        enabled: true,
        markers: {
          colors: ['#F44336', '#E91E63', '#9C27B0'],
        },
      },
      // color
      xaxis: {
        categories: chartLabels,
        // categories1: chartLabels
      },
    },
  };

  // const chartOptions = useChart({
  //   chart: {
  //     animations: {
  //       speed: 200,
  //       easing: "easeinout",
  //       dynamicAnimation: {
  //         speed: 400,
  //       },
  //     },
  //     events: {
  //       click: (event, chartContext, config) => {
  //         handleClickChart(chartLabels[config.dataPointIndex]);
  //       },
  //     },
  //   },

  //   xaxis: {
  //     categories: chartLabels,
  //     floating: false,
  //     labels: {
  //       rotate: 0,
  //       show: true,
  //       rotateAlways: false,
  //       formatter: (val) => typeof (val) === "number" ? val.toFixed(0) : val,
  //       style: {
  //         fontSize: "14px",
  //         fontWeight: 700,
  //         colors: ["#555"],
  //       },
  //     },
  //   },
  //   yaxis: {
  //     labels: {
  //       show: false,
  //     },
  //   },

  //   tooltip: {
  //     theme: "dark",
  //     marker: { show: false },
  //     y: {
  //       formatter: (seriesName) => fNumber(seriesName),
  //       title: {
  //         formatter: () => "Active Employees : ",
  //       },
  //     },
  //   },
  //   plotOptions: {
  //     bar: {
  //       horizontal: true,
  //       barHeight: "70%",
  //       borderRadius: 0,
  //       distributed: true,
  //       dataLabels: {
  //         position: "bottom",
  //       },
  //     },
  //   },

  //   colors: chartColors.colors,
  //   legend: {
  //     show: true,
  //     position: "bottom",
  //     floating: true,
  //     verticalAlign: "bottom",
  //     horizontalAlign: "center",
  //     // textAlign: 'center',
  //     align: "center",
  //   },
  //   offsetX: 0,
  //   dataLabels: {
  //     enabled: true,
  //     textAnchor: "start",
  //     formatter: (seriesName, opt) =>
  //       `${opt.w.globals.labels[opt.dataPointIndex]} - ${seriesName}`,
  //     dropShadow: {
  //       enabled: false,
  //     },
  //     style: {
  //       colors: ["#fff"],
  //       fontSize: "15px",
  //       fontWeight: 400,
  //     },
  //   },
  // });

  return (
    <Card {...other}>
      {/* {/* <CardHeader title={title} subheader={subheader} /> */}
      {/* {console.log("chartSeries===>", chartOptions)} */}
      {/* <StyledChartWrapper>
        <ReactApexChart
          series={[{ data: chartSeries }]}
          options={chartOptions}
          height={372}
          type="bar"
        />
      </StyledChartWrapper> */}
      <CardHeader title={title} subheader={subheader} />
      <StyledChartWrapper dir="ltr">
        <ReactApexChart
          options={chartOptions.options}
          series={chartOptions.series}
          // series={series}
          type="bar"
          height={450}
          colors={chartColors}
        />
      </StyledChartWrapper>
    </Card>
  );
}
