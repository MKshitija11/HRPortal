import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, IconButton } from '@mui/material';
// utils
import { bgBlur } from '../../../utils/cssStyles';
// components
import Iconify from '../../../components/iconify';
//
// import Searchbar from "./Searchbar";
import AccountPopover from './AccountPopover';
// import LanguagePopover from "./LanguagePopover";
// import NotificationsPopover from "./NotificationsPopover";

// ----------------------------------------------------------------------

const NAV_WIDTH = 231;

const HEADER_MOBILE = 64;

const HEADER_DESKTOP = 90;

const StyledRoot = styled(AppBar)(({ theme }) => ({
  ...bgBlur({ color: '#0072BC' }),

  backgroundImage: "url('/assets/images/covers/BannerBackground.png')",

  [theme.breakpoints.up('xs')]: {
    width: `calc(100% - ${NAV_WIDTH + 1}px)`,
    top:5,
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  // backgroundColor: 'pink',
  [theme.breakpoints.up('lg')]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------

Header.propTypes = {
  onOpenNav: PropTypes.func,
};

export default function Header({ onOpenNav }) {
  return (
    <StyledRoot>
      <StyledToolbar>
        <IconButton
          onClick={onOpenNav}
          sx={{
            mr: 1,
            color: 'white',
            display: { lg: 'none' },
          }}
        >
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>

        {/* <Searchbar /> */}
        <Box sx={{ flexGrow: 1 }} />

        <Stack
          style={{}}
          direction="column"
          justifyContent="space-between"
          spacing={{
            xs: 0.5,
            sm: 1,
          }}
        >
          {/* <LanguagePopover />
          <NotificationsPopover /> */}
          {/* <img
            src={'/assets/images/covers/BajajLogo.png'}
            alt="text"
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: 70,
              width: 70,
            }}
          /> */}
          <AccountPopover />
        </Stack>
      </StyledToolbar>
    </StyledRoot>
  );
}
