import { alpha } from "@mui/material/styles";

// ----------------------------------------------------------------------

// SETUP COLORS
const GREY = {
  0: "#FFFFFF",
  100: "#F9FAFB",
  200: "#F4F6F8",
  300: "#DFE3E8",
  400: "#C4CDD5",
  500: "#919EAB",
  600: "#637381",
  700: "#454F5B",
  800: "#212B36",
  900: "#161C24",
};

const PRIMARY = {
  lighter: "#D1E9FC",
  light: "#76B0F1",
  main: "#2065D1",
  dark: "#103996",
  darker: "#061B64",
  contrastText: "#fff",
};

const SECONDARY = {
  lighter: "#D6E4FF",
  light: "#84A9FF",
  main: "#3366FF",
  dark: "#1939B7",
  darker: "#091A7A",
  contrastText: "#fff",
};

const INFO = {
  lighter: "#D0F2FF",
  light: "#74CAFF",
  main: "#1890FF",
  dark: "#0C53B7",
  darker: "#04297A",
  contrastText: "#fff",
};

const SUCCESS = {
  lighter: "#E9FCD4",
  light: "#AAF27F",
  main: "#54D62C",
  dark: "#229A16",
  darker: "#08660D",
  contrastText: GREY[800],
};

const GREEN = {
  lightest: "#f5ffed",
  lighter: "#e6fcd4",
  light: "#c1f794",
  main: "#b8fc7e",
  dark: "#58ba04",
  darker: "#08660D",
  darkest: "#08660D",
};
const STATUS_COLORS = {
  LIGHTER_YELLOW: "#fdfd96",
  LIGHT_YELLOW: "#fff44f",
  NORMAL_YELLOW: "#fefe33",
  DARK_YELLOW: "#ffd800",
  DARKER_YELLOW: "#f5c71a",
  // GREENS
  LIGHTER_GREEN: "#d0f0c0",
  LIGHT_GREEN: "#98fb98",
  NORMAL_GREEN: "#66ff00",
  DARK_GREEN: "#32CD32",
  DARKER_GREEN: "#138808",
  // RED
  LIGHTER_RED: "#ffa07a",
  LIGHT_RED: "#ff6347",
  NORMAL_RED: "#F70202",
  DARK_RED: "#c90016",
  DARKER_RED: "#750B0B",
  // BLUE
  LIGHTER_BLUE: "#dfeaff",
  LIGHT_BLUE: "#87cefa",
  NORMAL_BLUE: "#1e90ff",
  DARK_BLUE: "#0f52ba",
  DARKER_BLUE: "#002366",
};

const WARNING = {
  r: "#FFF7CD",
  light: "#FFE16A",
  main: "#FFC107",
  dark: "#B78103",
  darker: "#7A4F01",
  contrastText: GREY[800],
};

const ERROR = {
  lighter: "#FFE7D9",
  light: "#FFA48D",
  main: "#FF4842",
  dark: "#B72136",
  darker: "#7A0C2E",
  contrastText: "#fff",
};

const palette = {
  common: { black: "#000", white: "#fff" },
  primary: PRIMARY,
  secondary: SECONDARY,
  info: INFO,
  success: SUCCESS,
  green: GREEN,
  warning: WARNING,
  error: ERROR,
  grey: GREY,
  divider: alpha(GREY[500], 0.24),
  text: {
    primary: GREY[800],
    secondary: GREY[600],
    disabled: GREY[500],
  },
  background: {
    paper: "#fff",
    default: GREY[100],
    neutral: GREY[200],
  },
  action: {
    active: GREY[600],
    hover: alpha(GREY[500], 0.08),
    selected: alpha(GREY[500], 0.16),
    disabled: alpha(GREY[500], 0.8),
    disabledBackground: alpha(GREY[500], 0.24),
    focus: alpha(GREY[500], 0.24),
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  },
  status: STATUS_COLORS,
};

export default palette;
