import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, IconButton, Typography } from '@mui/material';
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

  background: 'linear-gradient(90deg, rgba(70,190,236,1) 0%, rgba(35,33,167,1) 100%, rgba(2,0,36,1) 100%)',

  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${NAV_WIDTH + 1}px)`,
    // top: 5,
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
    <>
      <StyledRoot sx={{ mr: 0, justifyContent: 'space-between' }}>
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

          <Stack sx={{ flexGrow: 1 }} justifyContent="space-between" display="flex" flexDirection="row">
            <Stack alignItems="center" justifyContent="center">
              <img
                src={'/assets/images/covers/BajajLogo.png'}
                alt="BajajLogo"
                style={{
                  height: 60,
                  width: '100%',
                }}
              />
            </Stack>
            <Stack>
              <AccountPopover />
            </Stack>
          </Stack>
        </StyledToolbar>
      </StyledRoot>
    </>
  );
}
