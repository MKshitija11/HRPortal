import { useEffect, useState } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
// @mui
import { Box, List, ListItemText } from '@mui/material';
//
import { StyledNavItem, StyledNavItemIcon } from './styles';
import SvgColor from '../svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;
let redirectUrl = '';
export default function NavSection() {
  const [menuList = [], setMenuList] = useState();
  const [employeeList = [], setEmployeeList] = useState();

  useEffect(() => {
    const USERDETAILS = JSON.parse(sessionStorage.getItem('USERDETAILS'));
    console.log('USERDETAILS.NAV.userProfile', USERDETAILS);

    if (!USERDETAILS) {
      console.log('inside first if');
      redirectUrl = '/login';
    } else if (USERDETAILS?.userProfile === 'BAGIC_ADMIN') {
      redirectUrl = '/Dashboard';
    } else if (USERDETAILS?.userProfile === 'BAGIC_PARTNER') {
      redirectUrl = '/EmployeesBP';
    } else if (USERDETAILS?.userProfile === 'BAGIC_TL') {
      redirectUrl = '/EmployeesTL';
    } else if (USERDETAILS?.userProfile === 'BAGIC_SM') {
      redirectUrl = '/EmployeesSM';
    } else if (USERDETAILS?.userProfile === 'BAGIC_ITS') {
      redirectUrl = '/EmployeesITS';
    }
    console.log('USERDETAILS.NAV.userProfile.redirectUrl', redirectUrl);

    const dataUser = [
      {
        title: 'Active',
        path: `${redirectUrl}`,
        icon: icon('ic_user'),
        employeeCount: '',
      },
      {
        title: 'Pending',
        path: '/PendingEmployeesBP',
        icon: icon('ic_user'),
      },
      {
        title: 'Rejected',
        path: '/RejectedEmployeesBP',
        icon: icon('ic_user'),
      },
      {
        title: 'Resigned',
        path: '/ResignedEmployeesBP',
        icon: icon('ic_user'),
      },
    ];

    const dataTeamLead = [
      {
        title: 'Active',
        path: '/EmployeesTL',
        icon: icon('ic_user'),
      },
      {
        title: 'Pending',
        path: `/EmployeesListTL`,
        icon: icon('ic_user'),
      },
      {
        title: 'Resigned',
        path: '/ResignedEmployeesListTL',
        icon: icon('ic_user'),
      },
    ];
    const dataSeniorManager = [
      {
        title: 'Active',
        path: '/EmployeesSM',
        icon: icon('ic_user'),
      },
      {
        title: 'Pending',
        path: `/EmployeesListSM`,
        icon: icon('ic_user'),
      },
      {
        title: 'Resigned',
        path: `/ResignedEmployeesListSM`,
        icon: icon('ic_user'),
      },
    ];

    const dataAdmin = [
      {
        title: 'Dashboard',
        path: '/Dashboard',
        icon: icon('ic_analytics'),
      },
    ];
    const dataSpoc = [
      {
        title: 'Dashboard',
        path: '/Dashboard',
        icon: icon('ic_analytics'),
      },
      {
        title: 'Active',
        path: `${redirectUrl}`,
        icon: icon('ic_user'),
      },
      {
        title: 'Pending',
        path: '/PendingEmployeesITS',
        icon: icon('ic_user'),
      },
      // {
      //   title: 'Pending',
      //   path: '/PendingEmployeesITS',
      //   icon: icon('ic_user'),
      // },
      {
        title: 'Resigned',
        path: '/ResignedEmployeesITS',
        icon: icon('ic_user'),
      },
      {
        title: 'Reports',
        path: '/Reports',
        icon: icon('ic_cart'),
      },
    ];
    if (USERDETAILS?.userProfile === 'BAGIC_ADMIN') {
      setMenuList(dataAdmin);
    } else if (USERDETAILS?.userProfile === 'BAGIC_ITS') {
      setMenuList(dataSpoc);
    } else if (USERDETAILS?.userProfile === 'BAGIC_TL') {
      setMenuList(dataTeamLead);
    } else if (USERDETAILS?.userProfile === 'BAGIC_SM') {
      setMenuList(dataSeniorManager);
    } else {
      setMenuList(dataUser);
    }
  }, []);

  return (
    <Box>
      <List disablePadding sx={{ p: 2 }}>
        {menuList.map((item) => (
          <StyledNavItem
            key={item.title}
            component={RouterLink}
            to={item.path}
            sx={{
              '&.active': {
                color: '#004A98',
                bgcolor: '#ddd',
                fontWeight: 'fontWeightBold',
              },
              '&': {
                color: 'text.secondary',
                bgcolor: '#f4f4f4',
                fontWeight: 'fontWeightBold',
              },
            }}
          >
            <StyledNavItemIcon>{item.icon && item.icon}</StyledNavItemIcon>
            <ListItemText disableTypography primary={item.title} />
          </StyledNavItem>
        ))}
      </List>
    </Box>
  );
}

// ----------------------------------------------------------------------
