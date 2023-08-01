// @mui
import PropTypes from "prop-types";
import {
  Box,
  Card,
  Paper,
  Typography,
  CardHeader,
  CardContent,
} from "@mui/material";
// utils
import { fShortenNumber } from "../../../utils/formatNumber";

// ----------------------------------------------------------------------

AppTrafficBySite.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  list: PropTypes.array.isRequired,
};

export default function AppTrafficBySite({ title, subheader, list, ...other }) {
  return (
    <Card {...other}>
      <CardHeader
        title={title}
        subheader={subheader}
        subheaderTypographyProps={{ color: "#777", fontSize: "13px" }}
      />

      <CardContent>
        <Box
          sx={{
            display: "grid",
            gap: 2,
            gridTemplateColumns: "repeat(3, 1fr)",
          }}
        >
          {list.map((site) => (
            <Paper
              key={site.name}
              variant="outlined"
              sx={{
                py: 2,
                textAlign: "center",
                borderColor: (theme) => theme.palette[site.color].light,
                backgroundColor: (theme) => theme.palette[site.color].lightest,
              }}
            >
              <Box sx={{ mb: 0 }}>{site.icon}</Box>
              <Typography
                variant="subtitle2"
                sx={{
                  color: "#666",
                }}
              >
                {site.name}
              </Typography>
              <Typography variant="subtitle2" sx={{ color: "#888" }}>
                {fShortenNumber(site.value)}
              </Typography>
            </Paper>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}
