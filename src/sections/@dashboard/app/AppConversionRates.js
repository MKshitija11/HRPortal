import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import ReactApexChart from "react-apexcharts";
// @mui
import { Card, CardHeader } from "@mui/material";
import { styled } from "@mui/material/styles";
// utils
import { fNumber } from "../../../utils/formatNumber";
// components
import { useChart } from "../../../components/chart";

// ----------------------------------------------------------------------

const CHART_HEIGHT = 372;
const LEGEND_HEIGHT = 72;

const StyledChartWrapper = styled("div")(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(1),
  "& .apexcharts-canvas svg": { height: CHART_HEIGHT },
  "& .apexcharts-canvas svg,.apexcharts-canvas foreignObject": {
    overflow: "visible",
  },
  "& .apexcharts-legend": {
    height: LEGEND_HEIGHT,
    display: "none",
    alignContent: "center",
    position: "relative !important",
    borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
  },
}));

AppConversionRates.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  chartData: PropTypes.array.isRequired,
};

export default function AppConversionRates({
  title,
  subheader,
  chartData,
  ...other
}) {
  const navigate = useNavigate();

  const handleClickChart = (prtnerName) => {
    navigate("/Reports", {
      state: {
        partnerNameChart: prtnerName,
      },
    });
    // alert(prtnerName);
  };

  const chartLabels = chartData.map((i) => i.chartLabel);

  const chartSeries = chartData.map((i) => i.chartValue);

  const chartColors = chartData.map((i) => i.chartColor);

  const chartOptions = useChart({
    chart: {
      animations: {
        speed: 200,
        easing: "easeinout",
        dynamicAnimation: {
          speed: 400,
        },
      },
      events: {
        click: (event, chartContext, config) => {
          handleClickChart(chartLabels[config.dataPointIndex]);
        },
      },
    },
    xaxis: {
      categories: chartLabels,
      floating: false,
      labels: {
        rotate: 0,
        show: true,
        rotateAlways: false,
        formatter: (val) => val.toFixed(0),
        style: {
          fontSize: "14px",
          fontWeight: 700,
          colors: ["#555"],
        },
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
    },

    tooltip: {
      theme: "dark",
      marker: { show: false },
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter: () => "Active Employees : ",
        },
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: "40%",
        borderRadius: 0,
        distributed: true,
        dataLabels: {
          position: "bottom",
        },
      },
    },

    colors: chartColors,
    legend: {
      show: true,
      position: "bottom",
      floating: true,
      verticalAlign: "bottom",
      horizontalAlign: "center",
      align: "center",
    },
    offsetX: 0,
    dataLabels: {
      enabled: true,
      textAnchor: "start",
      formatter: (seriesName, opt) =>
        `${opt.w.globals.labels[opt.dataPointIndex]} - ${seriesName}`,
      dropShadow: {
        enabled: false,
      },
      style: {
        colors: ["#fff"],
        fontSize: "15px",
        fontWeight: 400,
      },
    },
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <StyledChartWrapper>
        <ReactApexChart
          series={[{ data: chartSeries }]}
          options={chartOptions}
          height={372}
          type="bar"
        />
      </StyledChartWrapper>
    </Card>
  );
}
