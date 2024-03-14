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
  const [pendingCountTL, setPendingCountTL] = useState();
  const [pendingCountSM, setPendingCountSM] = useState();
  const [pendingCountBP, setPendingCountBP] = useState();
  const [pendingCountITS, setPendingCountITS] = useState();
  const [showPendingEmp, setShowPendingEmp] = useState(false);
  const [showPendingEmpSM, setShowPendingEmpSM] = useState(false);
  const [showPendingEmpBP, setShowPendingEmpBP] = useState(false);
  const [showPendingEmpITS, setShowPendingEmpITS] = useState(false);

  const location = useLocation();
  // console.log('pending count', pendingCountSM);
  const ROLE = sessionStorage.getItem('ROLE');
  const USERDETAILS = JSON.parse(sessionStorage.getItem('USERDETAILS'));
  console.log('ROLE< USERDETAILS', ROLE, USERDETAILS);
  useEffect(() => {
    const loginRequest = {
      username: USERDETAILS?.[0]?.spocUsername,
    };

    Configuration.login(loginRequest).then((LoginResponse) => {
      console.log('LOGIN RESONSE>>> nav section >>>>', LoginResponse?.data?.length);
      console.log('type', typeof LoginResponse?.data);
    });
  });

  // TL
  useEffect(() => {
    // TL employees
    const getEmpListTLReq = {
      teamLeadId: USERDETAILS?.[0]?.spocEmailId,
    };
    console.log('cehck details ', ROLE, USERDETAILS?.[0]?.userProfile);
    if (ROLE === 'BAGIC_TL' || USERDETAILS?.[0]?.userProfile === 'BAGIC_TL') {
      Configuration.getEmpListTeamLead(getEmpListTLReq)
        .then((empListTLRes) => {
          const pendingList = empListTLRes.data.filter((emp) => emp.employeeStatus === 'Pending For TL Review').length;
          setPendingCountTL(pendingList);
          if ((ROLE === 'BAGIC_TL' || USERDETAILS?.[0]?.userProfile === 'BAGIC_TL') && pendingList >= 1) {
            console.log('PENDING DETAILS inside conditions');
            setShowPendingEmp(true);
          }
        })
        .catch((error) => {
          alert('Something went wrong');
        });
    }
  }, [pendingCountTL, showPendingEmp, location]);

  // SM
  useEffect(() => {
    // SM employees
    const empListManagerReq = {
      managerId: USERDETAILS?.[0]?.spocEmailId,
    };
    console.log('cehck details ', ROLE, USERDETAILS?.[0]?.userProfile);
    if (ROLE === 'BAGIC_SM' || USERDETAILS?.[0]?.userProfile === 'BAGIC_SM') {
      Configuration.getEmpListManager(empListManagerReq)
        .then((empListManagerRes) => {
          const pendingList = empListManagerRes.data.filter(
            (emp) => emp.employeeStatus === 'Pending For SM Review'
          ).length;
          setPendingCountSM(pendingList);
          if ((ROLE === 'BAGIC_SM' || USERDETAILS?.[0]?.userProfile === 'BAGIC_SM') && pendingList >= 1) {
            console.log('PENDING DETAILS inside conditions');
            setShowPendingEmpSM(true);
          }
        })
        .catch((error) => {
          alert('Something went wrong');
        });
    }
  }, [pendingCountSM, showPendingEmpSM, location]);

  // BP
  useEffect(() => {
    // BP employees
    const empListVendorReq = {
      partnerName: USERDETAILS?.[0]?.partnerName,
      itSpocId: 'NA',
    };

    console.log('cehck details ', ROLE, USERDETAILS?.[0]?.userProfile);
    if (ROLE === 'BAGIC_PARTNER' || USERDETAILS?.[0]?.userProfile === 'BAGIC_PARTNER') {
      Configuration.getEmpListVendor(empListVendorReq)
        .then((empListVendorRes) => {
          const pendingList = empListVendorRes.data.filter(
            (emp) =>
              emp.employeeStatus === 'Pending For SM Review' ||
              emp.employeeStatus === 'Pending For TL Review' ||
              emp.employeeStatus === 'Pending For IT Spoc Review'
          ).length;
          setPendingCountBP(pendingList);
          if ((ROLE === 'BAGIC_PARTNER' || USERDETAILS?.[0]?.userProfile === 'BAGIC_PARTNER') && pendingList >= 1) {
            console.log('PENDING DETAILS inside conditions');
            setShowPendingEmpBP(true);
          }
        })
        .catch((error) => {
          alert('Something went wrong');
        });
    }
  }, [pendingCountBP, showPendingEmpBP, location]);

  // ITS
  useEffect(() => {
    // ITS employees
    const empListItSpocReq = {
      itSpocId:
        ROLE === 'BAGIC_PRESIDENT'
          ? 'pooja.rebba@bajajallianz.co.in'
          : ROLE === 'BAGIC_ITS'
          ? USERDETAILS?.[0]?.spocEmailId
          : null,
    };
    console.log('cehck details ', ROLE, USERDETAILS?.[0]?.userProfile);
    if (
      ROLE === 'BAGIC_ITS' ||
      ROLE === 'BAGIC_PRESIDENT' ||
      USERDETAILS?.[0]?.userProfile === 'BAGIC_ITS' ||
      USERDETAILS?.[0]?.userProfile === 'BAGIC_PRESIDENT'
    ) {
      Configuration.getEmpListItSpoc(empListItSpocReq)
        .then((empListVendorRes) => {
          const pendingList = empListVendorRes.data.filter(
            (emp) => emp.employeeStatus === 'Pending For IT Spoc Review'
          ).length;
          setPendingCountITS(pendingList);
          if (
            (ROLE === 'BAGIC_ITS' ||
              ROLE === 'BAGIC_PRESIDENT' ||
              USERDETAILS?.[0]?.userProfile === 'BAGIC_ITS' ||
              USERDETAILS?.[0]?.userProfile === 'BAGIC_PRESIDENT') &&
            pendingList >= 1
          ) {
            console.log('PENDING DETAILS inside conditions');
            setShowPendingEmpITS(true);
          }
        })
        .catch((error) => {
          alert('Something went wrong');
        });
    }
  }, [pendingCountITS, showPendingEmpITS, location]);

  useEffect(() => {
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
        pendingIcon: pendingCountBP >= 1 ? icon('ic_bell') : '',
      },
      {
        title: 'Rejected',
        path: '/RejectedEmployeesBP',
        icon: icon('ic_rejectedUser'),
      },
      {
        title: 'Resignation Initiated',
        path: '/ResignationInitiatedListBP',
        icon: icon('ic_resignedUser'),
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
        pendingIcon: pendingCountTL >= 1 ? icon('ic_bell') : '',
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
        title: 'Resignation Initiated',
        path:
          ROLE === 'BAGIC_TL'
            ? '/ResignationInitiatedListTL'
            : ROLE === 'BAGIC_SM'
            ? '/ResignationInitiatedListSM'
            : '/ResignationInitiatedListTL',
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
        pendingIcon: pendingCountSM >= 1 ? icon('ic_bell') : '',
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
        title: 'Resignation Initiated',
        path:
          ROLE === 'BAGIC_SM'
            ? '/ResignationInitiatedListSM'
            : ROLE === 'BAGIC_TL'
            ? '/ResignationInitiatedListTL'
            : '/ResignationInitiatedListSM',
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
        pendingIcon: pendingCountITS >= 1 ? icon('ic_bell') : '',
      },

      {
        title: 'Resigned',
        path: '/ResignedEmployeesITS',
        icon: icon('ic_resignedUser'),
      },
      {
        title: 'Resignation Initiated',
        path: '/ResignationInitiatedListITS',
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
        pendingIcon: pendingCountITS >= 1 ? icon('ic_bell') : '',
      },

      {
        title: 'Resigned',
        path: '/ResignedEmployeesITS',
        icon: icon('ic_resignedUser'),
      },
      {
        title: 'Resignation Initiated',
        path: '/ResignationInitiatedListITS',
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

    if (USERDETAILS?.[0]?.userProfile === 'BAGIC_ADMIN') {
      setMenuList(dataAdmin);
    } else if (USERDETAILS?.[0]?.userProfile === 'BAGIC_ITS') {
      setMenuList(dataSpoc);
    } else if (USERDETAILS?.[0]?.userProfile === 'BAGIC_TL') {
      setMenuList(dataTeamLead);
    } else if (USERDETAILS?.[0]?.userProfile === 'BAGIC_SM') {
      setMenuList(dataSeniorManager);
    } else if (USERDETAILS?.[0]?.userProfile === 'BAGIC_PARTNER') {
      setMenuList(dataUser);
    } else if (USERDETAILS?.[0]?.userProfile === 'BAGIC_PRESIDENT') {
      setMenuList(dataPresident);
    } else {
      setMenuList(userLogin);
    }
  }, [
    location,
    ROLE,
    pendingCountTL,
    showPendingEmp,
    pendingCountSM,
    showPendingEmpSM,
    pendingCountBP,
    showPendingEmpBP,
    pendingCountITS,
    showPendingEmpITS,
  ]);

  return (
    <Box>
      <List sx={{ p: 2 }} spacing={2}>
        {menuList.map((item, index) => (
          <Stack flexDirection="row" mt={1} key={index}>
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
              {pendingCountTL >= 1 ? (
                <StyledNavItemIcon sx={{ color: 'red', height: 20, width: 20 }}>
                  {item.pendingIcon && item.pendingIcon}
                </StyledNavItemIcon>
              ) : null}
              {pendingCountSM >= 1 ? (
                <StyledNavItemIcon sx={{ color: 'red', height: 20, width: 20 }}>
                  {item.pendingIcon && item.pendingIcon}
                </StyledNavItemIcon>
              ) : null}
              {pendingCountBP >= 1 ? (
                <StyledNavItemIcon sx={{ color: 'red', height: 20, width: 20 }}>
                  {item.pendingIcon && item.pendingIcon}
                </StyledNavItemIcon>
              ) : null}
              {pendingCountITS >= 1 ? (
                <StyledNavItemIcon sx={{ color: 'red', height: 20, width: 20 }}>
                  {item.pendingIcon && item.pendingIcon}
                </StyledNavItemIcon>
              ) : null}
            </StyledNavItem>
          </Stack>
        ))}
      </List>
    </Box>
  );
}
