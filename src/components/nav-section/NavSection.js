import { useEffect, useState } from 'react';
import { NavLink as RouterLink, useLocation } from 'react-router-dom';
// @mui
import { Box, List, ListItemText } from '@mui/material';
//
import { StyledNavItem, StyledNavItemIcon } from './styles';
import SvgColor from '../svg-color';
import Configuration from '../../utils/Configuration';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;
let redirectUrl = '';
export default function NavSection() {
  const [menuList = [], setMenuList] = useState();
  const [employeeList = [], setEmployeeList] = useState();
  const location = useLocation();
  const [switchRole, setSwitchRole] = useState(false);
  const ROLE = sessionStorage.getItem('ROLE');
  // const ROLE = 'BAGIC_SM';

  useEffect(() => {
    const loginRequest = {
      // username: 'mandar.pathak@bajajallianz.co.in',
      // username: 'ravi.kumar044@bajajallianz.co.in',
      username: 'pooja.rebba@bajajallianz.co.in',

      password: 'password',
    };

    Configuration.login(loginRequest).then((LoginResponse) => {
      console.log('LoginForm.login.LoginResponse nav section >>>>', LoginResponse.data);
      console.log('type', typeof LoginResponse.data);
      // if (LoginResponse.data.length === 2) {
      //   setSwitchRole(true);
      //   // sessionStorage.setItem('ROLE', value);
      //   // if (LoginResponse.data?.[0]?.userProfile === 'BAGIC_SM') {
      //   //   redirectUrl = '/EmployeesSM';
      //   // }
      // }
    });
  });

  useEffect(() => {
    const USERDETAILS = JSON.parse(sessionStorage.getItem('USERDETAILS'));

    console.log('ROLE', ROLE);

    if (!USERDETAILS) {
      console.log('inside first if');
      redirectUrl = '/login';
    } else if (USERDETAILS?.[0]?.userProfile === 'BAGIC_ADMIN') {
      redirectUrl = '/Dashboard';
    } else if (USERDETAILS?.[0]?.userProfile === 'BAGIC_PARTNER') {
      redirectUrl = '/EmployeesBP';
    } else if (USERDETAILS?.[0]?.userProfile === 'BAGIC_TL') {
      redirectUrl = '/EmployeesTL';
    } else if (USERDETAILS?.[0]?.userProfile === 'BAGIC_SM') {
      redirectUrl = '/EmployeesSM';
    } else if (USERDETAILS?.[0]?.userProfile === 'BAGIC_ITS') {
      redirectUrl = '/EmployeesITS';
    }

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
        // path: '/EmployeesTL',
        path: ROLE === 'BAGIC_TL' ? '/EmployeesTL' : '/EmployeesSM',
        icon: icon('ic_user'),
      },
      {
        title: 'Pending',
        path: ROLE === 'BAGIC_TL' ? `/EmployeesListTL` : '/EmployeesListSM',
        icon: icon('ic_user'),
      },
      {
        title: 'Resigned',
        path: ROLE === 'BAGIC_TL' ? '/ResignedEmployeesListTL' : '/ResignedEmployeesListSM',
        icon: icon('ic_user'),
      },
    ];
    if (ROLE && !dataTeamLead.find((role) => role.path === '/SwitchRole')) {
      dataTeamLead.push({
        title: 'Switch role',
        path: '/SwitchRole',
        icon: icon('ic_user'),
      });
    }
    const dataSeniorManager = [
      {
        title: 'Active',
        // path: '/EmployeesSM',
        path: ROLE === 'BAGIC_TL' ? '/EmployeesTL' : '/EmployeesSM',
        icon: icon('ic_user'),
      },
      {
        title: 'Pending',
        path: ROLE === 'BAGIC_TL' ? '/EmployeesListTL' : '/EmployeesListSM',
        // path: `/EmployeesListSM`,
        icon: icon('ic_user'),
      },
      {
        title: 'Resigned',
        path: ROLE === 'BAGIC_TL' ? '/ResignedEmployeesListTL' : '/ResignedEmployeesListSM',
        // path: `/ResignedEmployeesListSM`,
        icon: icon('ic_user'),
      },
    ];
    if (ROLE && !dataSeniorManager.find((role) => role.path === '/SwitchRole')) {
      dataSeniorManager.push({
        title: 'Switch role',
        path: '/SwitchRole',
        icon: icon('ic_user'),
      });
    }

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
    if (USERDETAILS?.[0]?.userProfile === 'BAGIC_ADMIN') {
      setMenuList(dataAdmin);
    } else if (USERDETAILS?.[0]?.userProfile === 'BAGIC_ITS') {
      setMenuList(dataSpoc);
    } else if (USERDETAILS?.[0]?.userProfile === 'BAGIC_TL') {
      setMenuList(dataTeamLead);
    } else if (USERDETAILS?.[0]?.userProfile === 'BAGIC_SM') {
      setMenuList(dataSeniorManager);
    } else {
      setMenuList(dataUser);
    }
  }, [location, ROLE]);

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
