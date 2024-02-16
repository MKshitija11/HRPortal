import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// @mui
// import { styled, alpha } from "@mui/material/styles";
import { Box, Drawer, Stack, Typography, Button } from '@mui/material';
// hooks
import useResponsive from '../../../hooks/useResponsive';
// components
import Logo from '../../../components/logo';
import Scrollbar from '../../../components/scrollbar';
import NavSection from '../../../components/nav-section';
// import BajajLogo from '../../../Images/BajajLogo.png'
//

// ----------------------------------------------------------------------

const NAV_WIDTH = 230;

// const StyledAccount = styled("div")(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   padding: theme.spacing(2, 2.5),
//   borderRadius: Number(theme.shape.borderRadius) * 1.5,
//   backgroundColor: alpha(theme.palette.grey[500], 0.12),
// }));

// ----------------------------------------------------------------------

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

export default function Nav({ openNav, onCloseNav }) {
  const { pathname } = useLocation();

  const isDesktop = useResponsive('up', 'lg');

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      {/* <Box sx={{ px: 2.5, py: 1, display: 'inline-flex' }}> */}
        {/* <Stack></Stack> */}
        {/* <img
          src={'/assets/images/covers/BajajLogoInBlue.png'}
          alt="BajajLogo"
          style={{
            alignItems: 'center',
            justifyContent: 'center',
           
          }}
        /> */}
        <Stack alignItems="center" justifyContent="center" mt={3} mb={4}>
          <Typography
            variant="h6"
            style={{
              textAlign: 'center',
          
              background: 'linear-gradient(90deg, rgba(70,190,236,1) 0%, rgba(35,33,167,1) 100%, rgba(2,0,36,1) 100%)',

              WebkitTextFillColor: 'transparent',
              WebkitBackgroundClip: 'text',

              fontSize: '30px',
         
            }}
          >
            HR - PORTAL
          </Typography>
        </Stack>
      {/* </Box> */}

      {/* <Box sx={{ mb: 5, mx: 2.5, boxShadow: "10px 10px 10px #000" }}>
        <Link underline="none">
          <StyledAccount>
            <Avatar src={account.photoURL} alt="photoURL" />

            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                {account.displayName}
              </Typography>

              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {account.role}
              </Typography>
            </Box>
          </StyledAccount>
        </Link> 
  
      </Box> */}

      <NavSection />
      {/* GroupImageNavSection */}
      <Box sx={{ px: 2.5, py: 1, display: 'inline-flex', top: 7, }}>
        <Stack mt={7}>
          <img
            src={'/assets/images/covers/NavSectionImage.png'}
            alt="BajajLogo"
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              // height: 40,
              // width: 40
            }}
          />
        </Stack>
      </Box>
    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
      }}
    >
      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              bgcolor: '#f4f4f4',
              borderRightStyle: 'solid',
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: { width: NAV_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
