import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { alpha } from '@mui/material/styles';

import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton, Popover } from '@mui/material';
import Iconify from '../../../components/iconify';
// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Home',
    icon: 'eva:home-fill',
  },
  // {
  //   label: "Profile",
  //   icon: "eva:person-fill",
  // },
  // {
  //   label: "Settings",
  //   icon: "eva:settings-2-fill",
  // },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const [displayName, setDisplayName] = useState();
  const [mobile, setMobile] = useState();
  const [email, setEmail] = useState();
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    let USERDETAILS = '';
    USERDETAILS = JSON.parse(sessionStorage.getItem('USERDETAILS'));
    if (USERDETAILS != null) {
      console.log('USERDETAILS from account popover', USERDETAILS);

      setDisplayName(USERDETAILS?.[0]?.spocName);
      setEmail(USERDETAILS?.[0]?.spocEmailId);
      setMobile(USERDETAILS?.[0]?.spocMobileNo);
      let url = '../../assets/images/avatars/avatar_dynaNum.jpg';
      url = url.replace('dynaNum', Math.floor(Math.random() * (24 - 1 + 1)) + 1);
      setPhotoUrl(url);
    }
  }, []);

  const [open, setOpen] = useState(null);
  const navigate = useNavigate();
  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleRedirect = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate('/login');
  };

  return (
    <>
      <IconButton
        onClick={open ? handleClose : handleOpen}
        sx={{
          p: 0,
          // ...(open && {
          //   '&:before': {
          //     zIndex: 1,
          //     content: "''",
          //     width: '100%',
          //     height: '100%',
          //     borderRadius: '50%',
          //     position: 'absolute',
          //     bgcolor: (theme) => alpha(theme.palette.grey[600], 0.4),
          //     flexDirection: 'column',
          //   },
          // }),
        }}
      >
        {open ? (
          <Iconify icon="material-symbols:person" color="white" width={20} height={20} />
        ) : (
          <Iconify icon="material-symbols:person" color="white" width={40} height={40} />
        )}
      </IconButton>
      {console.log('username', displayName)}
      <Typography
        variant="h6"
        sx={{
          // color: (theme) => alpha(theme.palette.grey[800], 0.8),
          color: 'white',
        }}
      >
        {displayName}
      </Typography>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        onClick={handleClose}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 300,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {displayName}
          </Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {mobile}
          </Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem key={option.label} onClick={handleClose} sx={{ m: 0, color: '#777' }}>
              <b>{option.label}</b>
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={handleRedirect} sx={{ m: 1, color: '#888' }}>
          <b>Logout</b>
        </MenuItem>
      </Popover>
    </>
  );
}
