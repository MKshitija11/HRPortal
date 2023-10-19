import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import ReactApexChart from "react-apexcharts";
// @mui
import { useTheme, styled } from "@mui/material/styles";
import { Card, CardHeader } from "@mui/material";

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
    alignContent: "center",
    position: "relative !important",

    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
  },
}));

// ----------------------------------------------------------------------

AppCurrentVisits.propTypes = {
  chartType: PropTypes.string,
  title: PropTypes.string,
  subheader: PropTypes.string,
  chartColors: PropTypes.arrayOf(PropTypes.string),
  chartData: PropTypes.array,
};

export default function AppCurrentVisits({
  chartType,
  title,
  subheader,
  chartData,
  ...other
}) {
  const theme = useTheme();

  const chartLabels = chartData.map((i) => i.chartLabel);
  console.log("chart Labels", chartLabels)

  const chartSeries = chartData.map((i) => Number(i.chartValue));
  console.log("chart series", chartSeries)

  // const chartColors = ["#32CD02", "#f5c71a", "#F70202", "#1e90ff"];
  const chartColors = ["#32CD02", "#FFA500", "#FF7400", "#FFC100", "#ed1708"];

  const navigate = useNavigate();

  // const handleClickChart = (OBstatus) => {
  //   // alert(OBstatus);
  //   navigate("/Reports", {
  //     state: {
  //       empStatus: OBstatus,
  //     },
  //   });
  // };

  console.log("chartSeries", chartSeries);
  const chartOptions = useChart({
    colors: chartColors,
    labels: chartLabels,
    stroke: { colors: [theme.palette.background.paper] },
    legend: { floating: true, horizontalAlign: "center" },
    dataLabels: {
      enabled: true,
      dropShadow: { enabled: true },
    },
    tooltip: {
      fillSeriesColor: false,
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter: (seriesName) => `${seriesName}`,
        },
      },
    },
    plotOptions: {
      pie: {
        donut: { labels: { show: true } },
      },
    },
    fill: {
      type: "solid",
    },
    chart: {
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
      },

      // events: {
      //   dataPointSelection: (event, chartContext, config) => {
      //     handleClickChart(config.w.config.labels[config.dataPointIndex]);
      //   },
      // },
    },
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <StyledChartWrapper dir="ltr">
        <ReactApexChart
          type={chartType}
          series={chartSeries}
          options={chartOptions}
          height={280}
        />
      </StyledChartWrapper>
    </Card>
  );
}
