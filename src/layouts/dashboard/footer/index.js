import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, IconButton, Typography } from '@mui/material';
// utils
import { bgBlur } from '../../../utils/cssStyles';
// components
import Iconify from '../../../components/iconify';

const NAV_WIDTH = 231;

const HEADER_MOBILE = 44;

const HEADER_DESKTOP = 30;

const StyledRoot = styled(AppBar)(({ theme }) => ({
  ...bgBlur({ color: '#0072BC' }),

  // backgroundImage: "url('/assets/images/covers/BannerBackground.png')",
  // background: linear-gradient(90deg, rgba(70,190,236,1) 0%, rgba(17,16,87,1) 100%, rgba(2,0,36,1) 100%);
  // background: 'rgb(70,190,236)',
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

export default function Footer() {
  return (
    // <StyledToolbar>
    <Stack style={{width: '100%', height: 30, background: 'linear-gradient(90deg, rgba(70,190,236,1) 0%, rgba(35,33,167,1) 100%, rgba(2,0,36,1) 100%)', position: 'fixed', bottom: 0}}>
      <Typography
        style={{
          color: 'white',
          fontFamily: 'poppins !important',
          fontSize: 12,
          width: '98vw',
          display: 'flex',
          justifyContent: 'flex-end',
          height: 30,
          alignItems: 'center',
          textAlign: 'center',
          position: 'fixed',
          bottom: 0,
        }}
      >
        &copy; Copyrights Bajaj Allianz General Insurance Company Limited. All Rights Reserved
      </Typography>
    </Stack>
  );
}
