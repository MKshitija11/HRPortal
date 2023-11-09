import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import ReactApexChart from 'react-apexcharts';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Card, CardHeader } from '@mui/material';

// utils
import { fNumber } from '../../../utils/formatNumber';
// components
import { useChart } from '../../../components/chart';

// ----------------------------------------------------------------------

const CHART_HEIGHT = 372;
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
    alignContent: 'center',
    position: 'relative !important',

    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
  },
}));

// ----------------------------------------------------------------------

AppSMResourceList.propTypes = {
  chartType: PropTypes.string,
  title: PropTypes.string,
  subheader: PropTypes.string,
  chartColors: PropTypes.arrayOf(PropTypes.string),
  chartData: PropTypes.array,
};

export default function AppSMResourceList({ chartType, title, subheader, chartData, ...other }) {
  const theme = useTheme();
  console.log('chart data', chartData, chartType);
  const chartLabels = chartData.map((i) => i.chartLabel);
  console.log('chart Labels', chartLabels);

  const chartName = chartData.map((i) => i.chartName);
  console.log('chart name', chartName);

  const chartSeries = chartData.map((i) => Number(i.chartValue));
  console.log('chart series', chartSeries);

  // const chartColors = ["#32CD02", "#f5c71a", "#F70202", "#1e90ff"];
  const chartColors = ['#32CD02', '#FFA500', '#FF7400', '#FFC100', '#ed1708'];

  const navigate = useNavigate();

  const handleClickChart = (OBstatus) => {
    alert(OBstatus);
    navigate('/EmployeesITS', {
      state: {
        // reportingManager:
        empStatus: OBstatus,
        filterBySM: true
      },
    });
  };

  console.log('chartSeries', chartSeries);

  const chartOptions = {
    series: [
      {
        name: 'count',
        data: chartSeries,
      },
    ],

    options: {
      chart: {
        type: 'bar',
        height: 380,
        width: 100,
        events: {
          click: (event, chartContext, config) => {
            handleClickChart(chartLabels[config.dataPointIndex]);
            console.log('handle click ', chartLabels[config.dataPointIndex]);
          },
        },
      },
      // events: {
      //   click: console.log('CLICKED !!'),
      // },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: false,
          columnWidth: '50%',
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
        categories: chartName,
        // categories1: chartLabels
      },
    },
  };

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <StyledChartWrapper dir="ltr">
        <ReactApexChart
          options={chartOptions.options}
          series={chartOptions.series}
          type="bar"
          height={470}
          colors={chartColors}
        />
      </StyledChartWrapper>
    </Card>
  );
}
