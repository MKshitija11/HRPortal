import { useState } from 'react';
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

const CHART_HEIGHT = 572;
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
  const chartLabels = chartData.map((i) => i.smEmail);
  const totalCount = chartData.map((i) => i.total);
  const activeCount = chartData.map((i) => i.activeCount);
  const pendingCount = chartData.map((i) => i.pendingCount);
  const resignedCount = chartData.map((i) => i.resignedCount);
  const chartName = chartData.map((i) => i.smName);
  const chartSeries = chartData.map((i) => Number(i.chartValue));
  const chartColors = ['#32CD02', '#FFA500', '#FF7400', '#FFC100', '#ed1708'];
  const [empStatus, setEmpStatus] = useState();

  console.log('CHART DATA', chartData, activeCount);
  const navigate = useNavigate();

  const handleClickChart = (OBstatus, chartName) => {
    // alert(OBstatus, chartName);
    // alert('inside handle click chart');
    setEmpStatus(OBstatus);

    // navigate('/EmployeesITS', {
    //   state: {
    //     // reportingManager:
    //     empStatus: OBstatus,
    //     filterBySM: true,
    //   },
    // });
  };
  console.log('emp obstatus', empStatus);
  const handleClickedData = (OBstatus, chartName, chartData) => {
    // alert('inside handle click data');
    console.log('OBSTATUS>>>>> 1', OBstatus);
    console.log('OBSTATUS>>>>> 2', chartName);
    console.log('OBSTATUS>>>>> 3', chartData);

    if (OBstatus === 'Active') {
      navigate('/EmployeesITS', {
        state: {
          reportingManager: chartData,
          empOBStatus: OBstatus,
          filterBySM: true,
        },
      });
    } else if (OBstatus === 'Pending') {
      navigate('/PendingEmployeesITS', {
        state: {
          reportingManager: chartData,
          empOBStatus: OBstatus,
          filterBySM: true,
        },
      });
    } else if (OBstatus === 'Resigned') {
      navigate('/ResignedEmployeesITS', {
        state: {
          reportingManager: chartData,
          empOBStatus: OBstatus,
          filterBySM: true,
        },
      });
    }
  };

  const handleData = (OBstatus) => {
    console.log('obSTATUS', OBstatus);
  };

  const chartOptions = {
    series: [
      // {
      //   name: 'total',
      //   data: totalCount,
      // },
      { name: 'Active', data: activeCount, color: '#008000' },
      { name: 'Pending', data: pendingCount, color: '#FFA500' },
      { name: 'Resigned', data: resignedCount, color: '#ff0000' },
    ],

    options: {
      colors: ['#880808', '#4576b5'],
      chart: {
        type: 'bar',
        height: 350,
        stacked: true,
        animations: {
          enabled: true,
          easing: "easeinout",
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
            console.log('handle click config ', chartLabels[config.dataPointIndex], chartName);
            console.log('handle click event ', event);
            console.log('handle click chartcontext ', chartContext);
            console.log('handle click chartcontext', chartLabels);
          },
          dataPointSelection: (event, chartContext, config) => {
            handleClickedData(
              config.w.config.series[config.seriesIndex].name,
              chartName,
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
        categories: chartName,
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
          height={520}
          colors={chartColors}
        />
      </StyledChartWrapper>
    </Card>
  );
}
