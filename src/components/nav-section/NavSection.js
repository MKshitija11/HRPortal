import { useEffect, useState } from 'react';
import { NavLink as RouterLink, useLocation } from 'react-router-dom';
// @mui
import { Box, List, ListItemText, Stack } from '@mui/material';
//
import { StyledNavItem, StyledNavItemIcon } from './styles';
import SvgColor from '../svg-color';
import Configuration from '../../utils/Configuration';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;
let redirectUrl = '';
export default function NavSection() {
  const [menuList = [], setMenuList] = useState();
  const location = useLocation();

  const ROLE = sessionStorage.getItem('ROLE');
  const USERDETAILS = JSON.parse(sessionStorage.getItem('USERDETAILS'));
  console.log('ROLE< USERDETAILS', ROLE, USERDETAILS);
  useEffect(() => {
    const loginRequest = {
      username: USERDETAILS?.[0]?.spocUsername,
      // username: 'kshitija.madhekar@pinnacle.com'
    };

    Configuration.login(loginRequest).then((LoginResponse) => {
      console.log('LOGIN RESONSE>>> nav section >>>>', LoginResponse?.data?.length);
      console.log('type', typeof LoginResponse?.data);
    });
  });

  useEffect(() => {
    const USERDETAILS = JSON.parse(sessionStorage.getItem('USERDETAILS'));

    if (!USERDETAILS) {
      console.log('inside first if');
      redirectUrl = '/login';
    } else if (USERDETAILS?.[0]?.userProfile === 'BAGIC_ADMIN') {
      redirectUrl = '/Dashboard';
    } else if (USERDETAILS?.[0]?.userProfile === 'BAGIC_PARTNER') {
      redirectUrl = '/EmployeesBP';
    } else if (USERDETAILS?.[0]?.userProfile === 'BAGIC_TL') {
      redirectUrl = '/EmpManagmentTL';
    } else if (USERDETAILS?.[0]?.userProfile === 'BAGIC_SM') {
      redirectUrl = '/EmpManagmentSM';
    } else if (USERDETAILS?.[0]?.userProfile === 'BAGIC_ITS') {
      redirectUrl = '/Dashboard';
    } else if (USERDETAILS?.[0]?.userProfile === 'BAGIC_PRESIDENT') {
      redirectUrl = '/Dashboard';
    }

    const userLogin = [
      {
        title: 'Active',
        path: `${redirectUrl}`,
        icon: icon('ic_activeUser'),
        employeeCount: '',
      },
    ];

    const dataUser = [
      {
        title: 'Active',
        path: `${redirectUrl}`,
        icon: icon('ic_activeUser'),
        employeeCount: '',
      },
      {
        title: 'Pending',
        path: '/PendingEmployeesBP',
        icon: icon('ic_pending'),
      },
      {
        title: 'Rejected',
        path: '/RejectedEmployeesBP',
        icon: icon('ic_rejectedUser'),
      },
      {
        title: 'Resigned',
        path: '/ResignedEmployeesBP',
        icon: icon('ic_resignedUser'),
      },
      {
        title: 'TimeSheet',
        path: '/TimeSheet',
        icon: icon('ic_timesheet'),
      },
    ];

    const dataTeamLead = [
      {
        title: 'Dashboard',
        path: ROLE === 'BAGIC_TL' ? '/EmpManagmentTL' : ROLE === 'BAGIC_SM' ? '/EmpManagmentSM' : '/EmpManagmentTL',
        icon: icon('ic_analytics'),
      },
      {
        title: 'Active',
        path: ROLE === 'BAGIC_TL' ? '/EmployeesTL' : ROLE === 'BAGIC_SM' ? '/EmployeesSM' : '/EmployeesTL',
        icon: icon('ic_activeUser'),
      },
      {
        title: 'Pending',
        path: ROLE === 'BAGIC_TL' ? '/EmployeesListTL' : ROLE === 'BAGIC_SM' ? '/EmployeesListSM' : '/EmployeesListTL',
        icon: icon('ic_pending'),
      },
      {
        title: 'Resigned',
        path:
          ROLE === 'BAGIC_TL'
            ? '/ResignedEmployeesListTL'
            : ROLE === 'BAGIC_SM'
            ? '/ResignedEmployeesListSM'
            : '/ResignedEmployeesListTL',
        icon: icon('ic_resignedUser'),
      },
      {
        title: 'TimeSheet',
        path: '/TimeSheet',
        icon: icon('ic_timesheet'),
      },
    ];
    if (USERDETAILS?.length > 1) {
      if (ROLE && !dataTeamLead.find((role) => role.path === '/SwitchRole')) {
        dataTeamLead.push({
          title: 'Switch role',
          path: '/SwitchRole',
          icon: icon('ic_user'),
        });
      }
    }

    const dataSeniorManager = [
      {
        title: 'Dashboard',
        path: ROLE === 'BAGIC_SM' ? '/EmpManagmentSM' : ROLE === 'BAGIC_TL' ? '/EmpManagmentTL' : '/EmpManagmentSM',
        icon: icon('ic_emp_mgmt'),
      },
      {
        title: 'Active',

        path: ROLE === 'BAGIC_SM' ? '/EmployeesSM' : ROLE === 'BAGIC_TL' ? '/EmployeesTL' : '/EmployeesSM',
        icon: icon('ic_activeUser'),
      },
      {
        title: 'Pending',

        path: ROLE === 'BAGIC_SM' ? '/EmployeesListSM' : ROLE === 'BAGIC_TL' ? '/EmployeesListTL' : '/EmployeesListSM',
        icon: icon('ic_pending'),
      },
      {
        title: 'Resigned',

        path:
          ROLE === 'BAGIC_SM'
            ? '/ResignedEmployeesListSM'
            : ROLE === 'BAGIC_TL'
            ? '/ResignedEmployeesListTL'
            : '/ResignedEmployeesListSM',
        icon: icon('ic_resignedUser'),
      },
      {
        title: 'TimeSheet',
        path: '/TimeSheet',

        icon: icon('ic_timesheet'),
      },
    ];
    if (USERDETAILS?.length > 1) {
      if (ROLE && !dataSeniorManager.find((role) => role.path === '/SwitchRole')) {
        dataSeniorManager.push({
          title: 'Switch role',
          path: '/SwitchRole',
          icon: icon('ic_activeUser'),
        });
      }
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
        path: '/EmployeesITS',
        icon: icon('ic_activeUser'),
      },
      {
        title: 'Pending',
        path: '/PendingEmployeesITS',
        icon: icon('ic_pending'),
      },

      {
        title: 'Resigned',
        path: '/ResignedEmployeesITS',
        icon: icon('ic_resignedUser'),
      },
      {
        title: 'Reports',
        path: '/Reports',
        icon: icon('ic_cart'),
      },
      {
        title: 'TimeSheet',
        path: '/TimeSheet',
        icon: icon('ic_timesheet'),
      },
    ];
    if (USERDETAILS?.length > 1) {
      if (ROLE && !dataSpoc.find((role) => role.path === '/SwitchRole')) {
        dataSpoc.push({
          title: 'Switch role',
          path: '/SwitchRole',
          icon: icon('ic_activeUser'),
        });
      }
    }

    const dataPresident = [
      {
        title: 'Dashboard',
        path: '/Dashboard',
        icon: icon('ic_analytics'),
      },
      {
        title: 'Active',
        path: '/EmployeesITS',
        icon: icon('ic_activeUser'),
      },
      {
        title: 'Pending',
        path: '/PendingEmployeesITS',
        icon: icon('ic_pending'),
      },

      {
        title: 'Resigned',
        path: '/ResignedEmployeesITS',
        icon: icon('ic_resignedUser'),
      },
      {
        title: 'Reports',
        path: '/Reports',
        icon: icon('ic_cart'),
      },
      {
        title: 'TimeSheet',
        path: '/TimeSheet',
        icon: icon('ic_timesheet'),
      },
    ];
    if (USERDETAILS?.length > 1) {
      if (ROLE && !dataPresident.find((role) => role.path === '/SwitchRole')) {
        dataPresident.push({
          title: 'Switch role',
          path: '/SwitchRole',
          icon: icon('ic_activeUser'),
        });
      }
    }
    // if (USERDETAILS?.[0]?.userProfile === 'BAGIC_ADMIN') {
    //   setMenuList(dataAdmin);
    // } else if (USERDETAILS?.[0]?.userProfile === 'BAGIC_ITS') {
    //   setMenuList(dataSpoc);
    // } else if (USERDETAILS?.[0]?.userProfile === 'BAGIC_TL') {
    //   setMenuList(dataTeamLead);
    // } else if (USERDETAILS?.[0]?.userProfile === 'BAGIC_SM') {
    //   setMenuList(dataSeniorManager);
    // } else if (USERDETAILS?.[0]?.userProfile === 'BAGIC_PARTNER') {
    //   setMenuList(dataUser);
    // } else if (USERDETAILS?.[0]?.userProfile === 'BAGIC_PRESIDENT') {
    //   setMenuList(dataPresident);
    // } else {
    //   setMenuList(userLogin);
    // }

    if (ROLE === 'BAGIC_ADMIN') {
      setMenuList(dataAdmin);
    } else if (ROLE === 'BAGIC_ITS') {
      setMenuList(dataSpoc);
    } else if (ROLE === 'BAGIC_TL') {
      setMenuList(dataTeamLead);
    } else if (ROLE === 'BAGIC_SM') {
      setMenuList(dataSeniorManager);
    } else if (ROLE === 'BAGIC_PARTNER') {
      setMenuList(dataUser);
    } else if (ROLE === 'BAGIC_PRESIDENT') {
      setMenuList(dataPresident);
    } else {
      setMenuList(userLogin);
    }
  }, [location, ROLE]);

  return (
    <Box>
      <List sx={{ p: 2 }} spacing={2}>
        {menuList.map((item) => (
          <Stack flexDirection="row" mt={1}>
            <StyledNavItem
              key={item.title}
              component={RouterLink}
              to={item.path}
              sx={{
                '&.active': {
                  // color: '#004A98',
                  bgcolor: '#ddd',
                  fontWeight: 'fontWeightBold',
                  // backgroundColor: 'white',
                  color: 'white',
                  background:
                    'linear-gradient(90deg, rgba(70,190,236,1) 0%, rgba(35,33,167,1) 100%, rgba(2,0,36,1) 100%)',
                },
                '&': {
                  // color: 'text.secondary',
                  color: '#004A98',
                  bgcolor: '#f4f4f4',
                  fontWeight: 'fontWeightBold',
                  // backgroundColor: '#ddd',
                  backgroundColor: 'white',
                },
              }}
            >
              <StyledNavItemIcon>{item.icon && item.icon}</StyledNavItemIcon>
              <ListItemText disableTypography primary={item.title} />
            </StyledNavItem>
          </Stack>
        ))}
      </List>
    </Box>
  );
}
