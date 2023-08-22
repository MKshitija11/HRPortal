import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// import { useTheme } from "@mui/material/styles";
import { Box, Link, Typography } from '@mui/material';

// ----------------------------------------------------------------------

const Logo = forwardRef(({ disabledLink = false, sx, ...other }, ref) => {
  // const theme = useTheme();

  // const PRIMARY_LIGHT = theme.palette.primary.light;

  // const PRIMARY_MAIN = theme.palette.primary.main;

  // const PRIMARY_DARK = theme.palette.primary.dark;

  // OR using local (public folder)
  // -------------------------------------------------------
  // const logo = (
  //   <Box
  //     component="img"
  //     src="/logo/logo_single.svg" => your path
  //     sx={{ width: 40, height: 40, cursor: 'pointer', ...sx }}
  //   />
  // );

  const logo = (
    <Box
      ref={ref}
      component="div"
      sx={{
        width: 250,
        height: 80,
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,

        ...sx,
      }}
      {...other}
    >
      <img
        src={'/assets/images/covers/BajajAllianzLogo.png'}
        alt="BajajLogo"
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}
      />
    </Box>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return (
    <>
      {logo}
      {/* <Link to="/" component={RouterLink} sx={{ display: 'contents', color: '#0072bc' }}>
       {logo}
    </Link> */}
    </>
  );
});

Logo.propTypes = {
  sx: PropTypes.object,
  disabledLink: PropTypes.bool,
};

export default Logo;
