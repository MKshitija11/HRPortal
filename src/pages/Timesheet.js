import React, { useState, useEffect } from 'react';
import { filter } from 'lodash';
import {
  Card,
  Table,
  Stack,
  Paper,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  Modal,
  TableContainer,
  TextField,
  TablePagination,
  Box,
  Grid,
  MenuItem,
  Select,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import * as XLSX from 'xlsx';
import Marquee from 'react-fast-marquee';
import moment from 'moment';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { subMonths, addMonths } from 'date-fns';
import format from 'date-fns/format';
import Loader from '../components/Loader/Loader';
import Iconify from '../components/iconify/Iconify';
import Scrollbar from '../components/scrollbar';
import Label from '../components/label';
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
import Configuration from '../utils/Configuration';
import Constants from '../Constants/Constants';
import '../css/App.css';

// import axios from 'axios';

const TABLE_HEAD = [
  { id: 'empId', label: 'Employee Code' },
  { id: 'name', label: 'Name' },
  { id: 'totalWorkingDays', label: 'Total Working Days ' },
  { id: 'atsFilledDays', label: 'ATS filled Days' },
  { id: 'pendingDays', label: 'Pending Days' },
  { id: 'leaves', label: 'Leaves' },
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.employeeFullName.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function TimeSheet() {
  const navigate = useNavigate();
  const location = useLocation();
  const [empArray, setEmpArray] = useState([]);
  const [page, setPage] = useState(0);
  const [activeEmployees, setActiveEmployees] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState();
  const ROLE = sessionStorage.getItem('ROLE');
  const USERDETAILS = sessionStorage.getItem('USERDETAILS');
  console.log('ROLE>>', ROLE, USERDETAILS);

  // useEffect(() => {
  //  Configuration.visitorDetailsBymobNo().then((response) => {console.log("get token response", response)})
  // },[])

  // useEffect(() => {
  //   Configuration.getDashBoardForPartner()
  //   .then((response) => {console.log("get token response", response)
  // }
  // },[])

  // useEffect(() => {
  //   Configuration.getToken().then((response) => {
  //     console.log('REsposnse for token', response);
  //   });

  //   const req = {
  //     rmInfoObj: {
  //       userID: 'yogesh.kaushik@bajajallianz.co.in',
  //       month: 'NOV',
  //       year: '2023',
  //     },
  //   };

  //   Configuration.getRmDashBoard({req}).then((response) => {
  //     console.log('REsposnse for getRmDashBoard', response);
  //   });

  //   Configuration.bagicEmpfreqentMeet().then((response) => {
  //     console.log('REsposnse for bagicEmpfreqentMeet', response);
  //   })
  // }, []);

  useEffect(() => {
    const USERDETAILS = JSON.parse(sessionStorage.getItem('USERDETAILS'));
    console.log('userdetails.............', USERDETAILS);
    if (USERDETAILS != null) {
      const getEmpListTLReq = {
        teamLeadId: USERDETAILS?.[0]?.spocEmailId,
      };

      // if (ROLE === 'BAGIC_TL') {
      //   Configuration.getEmpListTeamLead(getEmpListTLReq)
      //     .then((empListTLRes) => {
      //       console.log('empListVendorRes=====>', empListTLRes);
      //       if (empListTLRes.data.error) {
      //         // setErrorMessage(true);
      //         setTimeout(() => {
      //           setIsLoading(false);
      //         }, 500);
      //       } else {
      //         console.log('empListVendorRes=====>', empListTLRes);
      //         const activeEmpList = empListTLRes.data.filter((emp) => emp.employeeStatus === 'Active');
      //         setEmpArray(activeEmpList);
      //         setPagination({
      //           data: activeEmpList.map((value, index) => ({
      //             id: index,
      //           })),
      //           offset: 0,
      //           numberPerPage: 10,
      //           pageCount: 0,
      //           currentData: [],
      //         });
      //         const filteredUsers = applySortFilter(empListTLRes.data, getComparator(order, orderBy), filterName);
      //         setApiRes(filteredUsers.filter((employees) => employees.employeeStatus === 'Active'));
      //         // setEmployeeList(empListTLRes.data);
      //         setCsvData(filteredUsers.filter((employees) => employees.employeeStatus === 'Active'));
      //         // setIsLoading(false);
      //       }
      //     })
      //     .catch((error) => {
      //       setIsLoading(false);
      //       alert('Something went wrong');
      //     });
      // } else if (ROLE === 'BAGIC_SM') {
      //   const empListManagerReq = {
      //     managerId: USERDETAILS?.[0]?.spocEmailId,
      //   };
      //   setIsLoading(true);
      //   Configuration.getEmpListManager(empListManagerReq)
      //     .then((empListManagerRes) => {
      //       if (empListManagerRes.data.error) {
      //         setTimeout(() => {
      //           setIsLoading(false);
      //         }, 500);
      //       } else {
      //         console.log('empListVendorRes', empListManagerReq);
      //         const activeEmpListSM = empListManagerRes.data.filter((emp) => emp.employeeStatus === 'Active');
      //         setEmpArray(activeEmpListSM);
      //         setPagination({
      //           data: activeEmpListSM.map((value, index) => ({
      //             id: index,
      //           })),
      //           offset: 0,
      //           numberPerPage: 10,
      //           pageCount: 0,
      //           currentData: [],
      //         });
      //         const filteredUsers = applySortFilter(empListManagerRes.data, getComparator(order, orderBy), filterName);
      //         // setActiveEmployees(filteredUsers.filter((employees) => employees.employeeStatus === 'Active'));

      //         setApiRes(filteredUsers.filter((employees) => employees.employeeStatus === 'Active'));
      //         setCsvData(filteredUsers.filter((employees) => employees.employeeStatus === 'Active'));
      //         // setIsLoading(false);
      //       }
      //     })
      //     .catch((error) => {
      //       setIsLoading(false);
      //       alert('Something went wrong');
      //     });
      // }
      if (ROLE === 'BAGIC_TL') {
        setIsLoading(true);
        Configuration.getEmpListTeamLead(getEmpListTLReq)
          .then((empListTLRes) => {
            console.log('empListVendorRes=====>', empListTLRes);
            if (empListTLRes.data.error) {
              // setErrorMessage(true);
              setTimeout(() => {
                setIsLoading(false);
              }, 500);
            } else {
              console.log('empListVendorRes=====>', empListTLRes);
              const activeEmpList = empListTLRes.data.filter((emp) => emp.employeeStatus === 'Active');
              setEmpArray(activeEmpList);
              setPagination({
                data: activeEmpList.map((value, index) => ({
                  id: index,
                })),
                offset: 0,
                numberPerPage: pageRender,
                pageCount: 0,
                currentData: [],
              });
              const filteredUsers = applySortFilter(empListTLRes.data, getComparator(order, orderBy), filterName);
              setApiRes(filteredUsers.filter((employees) => employees.employeeStatus === 'Active'));
              setActiveEmployees(filteredUsers.filter((employees) => employees.employeeStatus === 'Active')); // setEmployeeList(empListTLRes.data);
              setCsvData(filteredUsers.filter((employees) => employees.employeeStatus === 'Active'));
              // setIsLoading(false);
            }
          })
          .catch((error) => {
            setTimeout(() => {
              setIsLoading(false);
            }, 500);
            // alert('Something went wrong');
          });
      } else if (ROLE === 'BAGIC_SM') {
        const empListManagerReq = {
          managerId: USERDETAILS?.[0]?.spocEmailId,
        };
        setIsLoading(true);
        Configuration.getEmpListManager(empListManagerReq)
          .then((empListManagerRes) => {
            if (empListManagerRes.data.error) {
              setTimeout(() => {
                setIsLoading(false);
              }, 500);
            } else {
              console.log('empListVendorRes', empListManagerReq);
              const activeEmpListSM = empListManagerRes.data.filter((emp) => emp.employeeStatus === 'Active');
              setEmpArray(activeEmpListSM);
              setPagination({
                data: activeEmpListSM.map((value, index) => ({
                  id: index,
                })),
                offset: 0,
                numberPerPage: pageRender,
                pageCount: 0,
                currentData: [],
              });
              const filteredUsers = applySortFilter(empListManagerRes.data, getComparator(order, orderBy), filterName);
              // setActiveEmployees(filteredUsers.filter((employees) => employees.employeeStatus === 'Active'));
              setActiveEmployees(filteredUsers.filter((employees) => employees.employeeStatus === 'Active'));
              setApiRes(filteredUsers.filter((employees) => employees.employeeStatus === 'Active'));
              setCsvData(filteredUsers.filter((employees) => employees.employeeStatus === 'Active'));
              // setIsLoading(false);
            }
          })
          .catch((error) => {
            setIsLoading(false);
            alert('Something went wrong');
          });
      } else if (ROLE === 'BAGIC_PARTNER') {
        const empListVendorReq = {
          partnerName: USERDETAILS?.[0]?.partnerName,
          itSpocId: 'NA',
        };
        setIsLoading(true);
        Configuration.getEmpListVendor(empListVendorReq)
          .then((empListVendorRes) => {
            if (empListVendorRes.data.error) {
              setTimeout(() => {
                setIsLoading(false);
              }, 500);
            } else {
              const activeEmpListPartner = empListVendorRes.data.filter((emp) => emp.employeeStatus === 'Active');

              setEmpArray(activeEmpListPartner);
              setPagination({
                data: activeEmpListPartner.map((value, index) => ({
                  id: index,
                })),
                offset: 0,
                numberPerPage: pageRender,
                pageCount: 0,
                currentData: [],
              });
              const filteredUsers = applySortFilter(empListVendorRes.data, getComparator(order, orderBy), filterName);
              setActiveEmployees(filteredUsers.filter((employees) => employees.employeeStatus === 'Active'));
              setApiRes(filteredUsers.filter((employees) => employees.employeeStatus === 'Active'));

              // setTimeout(() => {
              //   setIsLoading(false);
              // }, 500);
            }
          })
          .catch((error) => {
            setIsLoading(false);
            alert('Something went wrong');
          });
      } else if (ROLE === 'BAGIC_ITS') {
        const empListVendorReq = {
          itSpocId: USERDETAILS?.[0]?.spocEmailId,
        };
        setIsLoading(true);
        Configuration.getEmpListItSpoc(empListVendorReq)
          .then((empListVendorRes) => {
            if (empListVendorRes.data.error) {
              setTimeout(() => {
                setIsLoading(false);
              }, 500);
            } else {
              const activeEmpListPartner = empListVendorRes.data.filter((emp) => emp.employeeStatus === 'Active');

              setEmpArray(activeEmpListPartner);
              setPagination({
                data: activeEmpListPartner.map((value, index) => ({
                  id: index,
                })),
                offset: 0,
                numberPerPage: pageRender,
                pageCount: 0,
                currentData: [],
              });
              const filteredUsers = applySortFilter(empListVendorRes.data, getComparator(order, orderBy), filterName);
              setActiveEmployees(filteredUsers.filter((employees) => employees.employeeStatus === 'Active'));
              setApiRes(filteredUsers.filter((employees) => employees.employeeStatus === 'Active'));

              // setTimeout(() => {
              //   setIsLoading(false);
              // }, 500);
            }
          })
          .catch((error) => {
            setIsLoading(false);
            alert('Something went wrong');
          });
      } else if (ROLE === 'BAGIC_PRESIDENT') {
        const empListVendorReq = {
          // itSpocId: USERDETAILS?.[0]?.spocEmailId,
          itSpocId: 'pooja.rebba@bajajallianz.co.in'
        };
        setIsLoading(true);
        Configuration.getEmpListItSpoc(empListVendorReq)
          .then((empListVendorRes) => {
            if (empListVendorRes.data.error) {
              setTimeout(() => {
                setIsLoading(false);
              }, 500);
            } else {
              const activeEmpListPartner = empListVendorRes.data.filter((emp) => emp.employeeStatus === 'Active');

              setEmpArray(activeEmpListPartner);
              setPagination({
                data: activeEmpListPartner.map((value, index) => ({
                  id: index,
                })),
                offset: 0,
                numberPerPage: pageRender,
                pageCount: 0,
                currentData: [],
              });
              const filteredUsers = applySortFilter(empListVendorRes.data, getComparator(order, orderBy), filterName);
              setActiveEmployees(filteredUsers.filter((employees) => employees.employeeStatus === 'Active'));
              setApiRes(filteredUsers.filter((employees) => employees.employeeStatus === 'Active'));

              // setTimeout(() => {
              //   setIsLoading(false);
              // }, 500);
            }
          })
          .catch((error) => {
            setIsLoading(false);
            alert('Something went wrong');
          });
      }
    } else {
      navigate('/login');
    }
    // eslint-disable-next-line
  }, []);
  console.log('EMP array ', empArray);
  // const empArray = Constants.timesheetEmpList;

  const [atsApiRes, setApiRes] = useState(empArray);
  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('empId');
  const [selected, setSelected] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [filterName, setFilterName] = useState('');
  const [csvData = [], setCsvData] = useState();
  const [updateWebIdModal, setUpdateWebIdModal] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedDate, setSelectedDate] = useState();
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [pageRender, setPageRender] = useState(50)
  // const [openCalendar, setOpenCalendar] = useState(false);
  const [pagination, setPagination] = useState({
    data: empArray.map((value, index) => ({
      id: index,
    })),
    offset: 0,
    numberPerPage: pageRender,
    pageCount: 0,
    currentData: [],
  });

  useEffect(() => {
    console.log('custom useeffect 1<><>');
    // setIsLoading(false);
    const arr = empArray.slice(pagination.offset, pagination.offset + pagination.numberPerPage);
    // setIsLoading(true);
    for (let index = 0; index < arr.length; index += 1) {
      const element = arr[index];
      element.hideLoader = !element.webUserId;
      const atsReq = {
        userName: element.webUserId ? element.webUserId : '',
        // fromDate: startDate || '',
        // toDate: endDate || '',
        fromDate: '',
        toDate: '',
      };
      // console.log('Req>>>', atsReq);

      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');

      // const atsReq = {
      //   method: 'POST',
      //   headers: myHeaders,
      //   body: data,
      //   redirect: 'follow',
      // };

      fetchData(atsReq, index, arr.length, (resp) => {
        const response = resp;
        element.timeSheetDtls = response !== null ? response : '';
        element.hideLoader = true;
        console.log('', arr);
        setApiRes([...arr]);
      }).catch((er) => {
        console.log('caught error==>', er);
      });
    }

    console.log('slice/original', atsApiRes, pagination);
    setApiRes([...arr]);
    setPagination((prevState) => ({
      ...prevState,
      pageCount: prevState.data.length / prevState.numberPerPage,
      currentData: prevState.data.slice(pagination.offset, pagination.offset + pagination.numberPerPage),
    }));
  }, [pagination.numberPerPage, pagination.offset, empArray, selectedMonth]);

  useEffect(() => {
    console.log('custom useeffect', atsApiRes);
  }, [atsApiRes, pagination, selectedMonth]);

  // useEffect(() => {
  //   const req = {
  //     userName: 'kshitija.madhekar@its.bajajallianz.co.in',
  //     fromDate: '',
  //     toDate: '',
  //   };
  //   return fetch('https://webservices.bajajallianz.com/BagicVisitorAppWs/userTimeSheet', {
  //     method: 'post',
  //     headers: { 'Content-Type': 'application/json' },
  //     // body: atsReq,
  //     body: JSON.stringify(req),
  //   }).then((response) => {
  //     return response
  //       .json()
  //       .then((data) => {
  //         console.log('timesheet response using fetch', data);
  //         return data;
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   });
  // }, []);

  const fetchData = async (atsReq, idx, arrLength, callback) => {
    return fetch('https://webservices.bajajallianz.com/BagicVisitorAppWs/userTimeSheet', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      // body: atsReq,
      body: JSON.stringify(atsReq),
      // body: {
      //   userName: 'kshitija.madhekar@its.bajajallianz.co.in',
      //   fromDate: '',
      //   toDate: '',
      // },
    }).then((response) =>
      response
        .json()
        .then((data) => {
          const atsRes = data;
          console.log('data$$$$', atsRes);
          if (atsRes?.errorCode === '1') {
            setTimeout(() => {
              setIsLoading(false);
            }, 60000);
            // setOpenErrorModal(true)
          } else if (atsRes?.errorCode === '0') {
            // setIsLoading(true);
            console.log('custom useeffect>>>.', atsRes.stringObject10);
            // if(arrLength === idx){
            setIsLoading(false);
            // }
            callback(atsRes.stringObject10);
          }
          return atsRes;
        })
        .catch((err) => {
          setTimeout(() => {
            setIsLoading(false);
            setOpenErrorModal(true);
          }, 60000);
          console.log('error>>>>>', err);
        })
    );
  };

  // const fetchData = async (atsReq, idx, arrLength, callback) => {
  //   await Configuration.getTimeSheetDetails(atsReq)
  //     .then((atsRes) => {
  //       console.log("timesheet rspnse", atsRes.json)

  //       if (atsRes?.data?.errorCode === '1') {
  //         setTimeout(() => {
  //           // setIsLoading(false);
  //           // setOpenModal(true);
  //         }, 1000);
  //       } else if (atsRes?.data?.errorCode === '0') {
  //         // setIsLoading(true);
  //         console.log('custom useeffect>>>.', atsRes.data.stringObject10);
  //         // if(arrLength === idx){
  //         setIsLoading(false);
  //         // }
  //         callback(atsRes.data.stringObject10);
  //       }
  //       // setIsLoading(false);
  //     })
  //     .catch((error) => {
  //       setTimeout(() => {
  //         setIsLoading(false);
  //       }, 60000);
  //       console.log('error>>>>>', error);
  //     });

  //   // setIsLoading(false);
  // };

  const handlePageClick = (event, newPage) => {
    console.log('handle Page click ', event, newPage);
    setPage(newPage);
    setIsLoading(false);
    const selected = event.selected;
    // alert(selected);
    const offset = selected * pagination.numberPerPage;
    setPagination({ ...pagination, offset });
  };

  const handleChangeRowsPerPage = (event) => {
    console.log('handle Page click for rows per page ', event);
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
    // handlePageClick()
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
    console.log('filter by name target', event.target.value);
    setPage(0);
    const filteredUsers = applySortFilter(empArray, getComparator(order, orderBy), event.target.value);

    setApiRes(filteredUsers.filter((employees) => employees.employeeStatus === 'Active'));
    setCsvData(filteredUsers.filter((employees) => employees.employeeStatus === 'Active'));
  };

  const downloadEmployeeData = () => {
    console.log('Inside download emp');
    const USERDETAILS = JSON.parse(sessionStorage.getItem('USERDETAILS'));
    const empListItSpocReq = {
      itSpocId: USERDETAILS?.[0]?.spocEmailId,
      download: 'Excel',
    };
    // Configuration.getEmpListItSpoc(empListItSpocReq).then((empListItSpocRes) => {
    // console.log('Download response ', empListItSpocRes.data);
    // setCsvData(atsApiRes);
    exportToCSV();
    // });
  };

  const Heading = [
    [
      'Employee ID',
      'Employee Name',
      'MobileNumber',
      'Partner Name',
      'Web Id',
      'Total Working days',
      'ATS filled Days',
      'ATS Not filled Days',
      'Leaves',
    ],
  ];
  const exportToCSV = () => {
    const selectedCols = csvData.map((n) => [
      n.employeeId,
      n.employeeFullName,
      n.mobileNumber,
      n.partnerName,
      n.webUserId,
      n.timeSheetDtls?.totalWorkingDays,
      n.timeSheetDtls?.atsfilledDays,
      n.timeSheetDtls?.atsnotFilledDays,
      n.timeSheetDtls?.leave,
    ]);
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet([]);

    XLSX.utils.sheet_add_aoa(ws, Heading);

    XLSX.utils.sheet_add_json(ws, selectedCols, {
      origin: 'A2',
      skipHeader: true,
    });

    XLSX.utils.book_append_sheet(wb, ws, 'DATA');

    XLSX.writeFile(wb, 'EmployeeData.xlsx');
  };

  const monthList = moment.months();
  console.log(' MONTH LIST', selectedDate);

  // const handleChangeEvent = (evt) => {
  //   const date = new Date();
  //   const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  //   const day = date.getDate();
  //   const monthIndex = date.getMonth();
  //   const year = date.getFullYear();
  //   const formattedDate = `${day}-${monthNames[monthIndex].toLowerCase()}-${year}`;

  //   console.log('FS>>>>', formattedDate);

  //   console.log('handle change event', evt.target.value);
  //   const startOfMonth = moment().month(evt.target.value).startOf('month').format('DD-MMM-');
  //   const endOfMonth = moment().month(evt.target.value).endOf('month').format('DD-MMM-YYYY');
  //   // console.log('start month', startOfMonth.toLowerCase().concat('2023'), formattedDate);
  //   console.log('start month current date', startOfMonth);
  //   setStartDate(startOfMonth.toLowerCase());
  //   setEndDate('');
  //   setSelectedMonth(evt.target.value);
  // };

  const handleChange = (date) => {
    console.log('date>>>>>>>>>', date);
    const month = moment(date).format('MMM-YYYY').toLowerCase();
    const currentMonth = moment().format('MMM-YYYY').toLowerCase();
    console.log('selected date>>>.', month);
    const startDateOfMonth = moment(date).startOf('month').format('DD-MMM-YYYY').toLowerCase();
    const endDateOfMonth = moment(date).endOf('month').format('DD-MMM-YYYY').toLowerCase();
    const currentDate = moment().format('DD-MMM-YYYY').toLowerCase();
    console.log('current month', startDateOfMonth);
    if (month === currentMonth) {
      setStartDate(startDateOfMonth);
      setEndDate(currentDate);
      setSelectedMonth(month);
    } else {
      setStartDate(startDateOfMonth);
      setEndDate(endDateOfMonth);
      setSelectedMonth(month);
    }
  };

  console.log('selected date out of fun>>>>>>>', startDate, endDate);

  const handleChangePage = (event, newPage) => {
    console.log('handle page click change page', event, newPage);
    setPage(newPage);
  };

  return (
    <>
      {console.log('IS LOADING', isLoading)}
      <Container>
        <Stack alignItems="center" justifyContent="center" spacing={5} sx={{ my: 2 }}>
          <Modal
            open={openModal || updateWebIdModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                border: '2px solid transparent',
                boxShadow: 24,
                p: 4,
                borderRadius: '8px',
              }}
              component="form"
            >
              {openModal ? (
                <Typography id="modal-modal-description" sx={{ mt: 1, textAlign: 'center' }}>
                  Something went wrong!! Please try after sometime
                </Typography>
              ) : updateWebIdModal ? (
                <Typography id="modal-modal-description" sx={{ mt: 1, textAlign: 'center' }}>
                  Please Update Employees Web Id
                </Typography>
              ) : null}

              <Grid
                container
                item
                xs={12}
                justifyContent={'center'}
                style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}
              >
                <Stack direction="row" justifyContent="center">
                  <Button
                    size="medium"
                    variant="contained"
                    type="button"
                    color="primary"
                    // onClick={() => setApprovalModal(false)}
                    onClick={
                      () =>
                        openModal
                          ? // (
                            setOpenModal(false)
                          : // navigate('/EmpManagmentTL')
                          // )
                          updateWebIdModal
                          ? setUpdateWebIdModal(false)
                          : null
                      // setOpenModal(false);
                      // navigate('/EmployeesTL');
                    }
                    sx={{ mt: 2 }}
                  >
                    OK
                  </Button>
                </Stack>
              </Grid>
            </Box>
          </Modal>

          {/* <Modal open={openCalendar} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                border: '2px solid transparent',
                boxShadow: 24,
                p: 4,
                borderRadius: '8px',
              }}
              component="form"
            >
              <Calendar
                view="year"
                value={selectedDate}
                onClickMonth={handleChange}
                sx={{ height: 200, width: 200 }}
                minDate={subMonths(new Date(), 3)}
                maxDate={new Date()}
              />

              <Grid
                container
                item
                xs={12}
                justifyContent={'center'}
                style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}
              >
                <Stack direction="row" justifyContent="center">
                  <Button
                    size="medium"
                    variant="contained"
                    type="button"
                    color="primary"
                    onClick={() => {
                      setOpenCalendar(false);
                      fetchData()
                      // handleChange();
                    }}
                    sx={{ mt: 2 }}
                  >
                    OK
                  </Button>
                </Stack>
              </Grid>
            </Box>
          </Modal> */}
        </Stack>

        <Marquee style={{ padding: 10 }}>
          <Stack sx={{ backgroundColor: 'white', paddingRight: 5, paddingLeft: 5 }}>
            <Typography sx={{ color: '#0072BC', fontWeight: '500' }}>
              Note: To View Timesheet Data of employee, please ensure to update Web user Id of respective employee
              through Active bucket
            </Typography>
          </Stack>
        </Marquee>
        <Card
          sx={{
            border: '1px solid lightgray',
            borderRadius: '8px',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {openErrorModal ? (
            <Stack alignItems="center" justifyContent="center" spacing={5} sx={{ my: 2 }}>
              <Modal
                open={openErrorModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 410,
                    bgcolor: 'background.paper',
                    border: '2px solid transparent',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: '8px',
                  }}
                  component="form"
                >
                  <Typography id="modal-modal-description" sx={{ mt: 1, textAlign: 'center' }}>
                    Unable to fetch data, Please try after sometime
                  </Typography>

                  <Grid
                    container
                    item
                    xs={12}
                    justifyContent={'center'}
                    style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}
                  >
                    <Stack
                      direction="row"
                      justifyContent="center"
                      mt={1}
                      // style={{ backgroundColor: 'blue', borderRadius: '8px' }}
                    >
                      <Button
                        size="medium"
                        variant="contained"
                        type="button"
                        color="primary"
                        // onClick={() => setApprovalModal(false)}
                        onClick={() => {
                          setOpenErrorModal(false);
                        }}
                        sx={{ mt: 2 }}
                      >
                        OK
                      </Button>
                      {/* <Iconify icon="material-symbols:refresh" color="white" width={40} height={40}  onClick={window.location.reload()}/> */}
                    </Stack>
                  </Grid>
                </Box>
              </Modal>
            </Stack>
          ) : null}

          <Stack>
            <Stack>
              <UserListToolbar
                numSelected={selected.length}
                filterName={filterName}
                onFilterName={handleFilterByName}
                // employeeList={empArray.slice(pagination.offset, pagination.offset + pagination.numberPerPage)}
                employeeList={empArray}
              />
            </Stack>
            {/* <Stack flexDirection="row" justifyContent="space-between" sx={{ paddingRight: 3, paddingLeft: 3 }}>
              <Stack
                sx={{
                  height: 60,
                  // width: '25%',
                }}
                // mb={3}
              >
                <Button
                  size="medium"
                  variant="contained"
                  type="button"
                  startIcon={<Iconify icon="ri:calendar-line" />}
                  color="primary"
                  onClick={() => setOpenCalendar(true)}
                  // sx={{ mt: 2 }}
                >
                  Select Month
                </Button>
              </Stack>
              <Stack mt={2}>
                <Typography variant="h4" sx={{ color: '#0072BC' }}>
                  {selectedMonth ? moment(selectedMonth).format('MMMM') : moment().format('MMMM')}
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="flex-end" justifyContent="flex-end" mb={5}>
                <Button
                  variant="contained"
                  startIcon={<Iconify icon="ri:file-excel-2-line" />}
                  onClick={() => downloadEmployeeData()}
                  color="primary"
                  size="medium"
                >
                  Download Excel
                </Button>
              </Stack>
            </Stack> */}

            {/* </Stack> */}
          </Stack>
          {/* </Stack> */}
          <Stack direction="row" alignItems="flex-end" justifyContent="flex-end" sx={{ paddingRight: 2 }}>
            <Button
              variant="contained"
              startIcon={<Iconify icon="ri:file-excel-2-line" />}
              onClick={() => downloadEmployeeData()}
              color="primary"
              size="medium"
            >
              Download Excel
            </Button>
          </Stack>

          <>
            {/* <Scrollbar> */}
            {isLoading ? (
              <Stack justifyContent="center" alignItems="center" mb={10}>
                <Loader />
              </Stack>
            ) : (
              <>
                {/* <Stack
                  justifyContent="center"
                  alignItems="center"
                  direction="row"
                  sx={{
                    height: 40,
                    flexDirection: 'row',
                  }}
                  mb={3}
                >
              
                  <Button
                    size="medium"
                    variant="contained"
                    type="button"
                    color="primary"
                    onClick={() => setOpenCalendar(true)}
                    sx={{ mt: 2 }}
                  >
                    Select Month
                  </Button>
                </Stack> */}
                <Stack alignItems="center" justifyContent="center" flexDirection="row">
                  <Typography variant="h6" sx={{ color: '#0072BC' }}>
                    {atsApiRes?.[0]?.timeSheetDtls?.month}
                  </Typography>
                  <Typography variant="h6" sx={{ color: '#0072BC' }} ml={1}>
                    {atsApiRes?.[0]?.timeSheetDtls?.year}
                  </Typography>
                </Stack>

                <Scrollbar>
                  <TableContainer sx={{ minWidth: 800, height: '60vh' }}>
                    {console.log('not found', atsApiRes)}

                    <Table>
                      <UserListHead
                        order={order}
                        orderBy={orderBy}
                        headLabel={TABLE_HEAD}
                        // rowCount={employeeDetails.length}
                        numSelected={selected.length}
                        onRequestSort={handleRequestSort}
                        // onSelectAllClick={handleSelectAllClick}
                        customStyle={{ backgroundColor: 'red' }}
                        isTimeSheet
                      />

                      <TableBody>
                        {atsApiRes.map((response, index) => {
                          const selectedUser = selected.indexOf(response?.employeeFullName) !== -1;
                          console.log('emp array web user id', response);
                          return (
                            <TableRow
                              hover
                              key={index}
                              tabIndex={-1}
                              role="checkbox"
                              selected={selectedUser}
                              onClick={() =>
                                response?.timeSheetDtls
                                  ? response?.webUserId
                                    ? navigate('/EmployeeTimesheetDetails', {
                                        state: {
                                          user: response?.timeSheetDtls,
                                          selectedStartDate: startDate,
                                          selectedEndDate: endDate,
                                          month: selectedMonth,
                                        },
                                      })
                                    : setUpdateWebIdModal(true)
                                  : // setOpenModal(true);
                                    null
                              }
                              sx={{ cursor: 'pointer' }}
                              ml={2}
                            >
                              <>
                                <TableCell align="center">
                                  {response?.employeeId === null ? '' : response?.employeeId}
                                </TableCell>

                                <TableCell component="th" scope="row" align="center">
                                  <Typography style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}>
                                    {response?.employeeFullName === null ? '' : response?.employeeFullName}
                                  </Typography>
                                </TableCell>

                                <TableCell align="center">
                                  <Label>
                                    <Typography style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}>
                                      {!response.hideLoader ? (
                                        <Loader height={15} width={15} marginTop={0} />
                                      ) : response?.timeSheetDtls?.totalWorkingDays === null ? (
                                        '-'
                                      ) : (
                                        response?.timeSheetDtls?.totalWorkingDays || '-'
                                      )}
                                    </Typography>
                                  </Label>
                                </TableCell>

                                <TableCell align="center">
                                  <Label color="error">
                                    <Typography style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}>
                                      {!response.hideLoader ? (
                                        <Loader height={15} width={15} marginTop={0} />
                                      ) : response?.timeSheetDtls?.atsfilledDays === null ? (
                                        '-'
                                      ) : (
                                        response?.timeSheetDtls?.atsfilledDays || '-'
                                      )}
                                    </Typography>
                                  </Label>
                                </TableCell>
                                <TableCell align="center">
                                  <Label color="success">
                                    <Typography style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}>
                                      {!response.hideLoader ? (
                                        <Loader height={15} width={15} marginTop={0} />
                                      ) : response?.timeSheetDtls?.atsnotFilledDays === null ? (
                                        '-'
                                      ) : (
                                        response?.timeSheetDtls?.atsnotFilledDays || '-'
                                      )}
                                    </Typography>
                                  </Label>
                                </TableCell>

                                <TableCell align="center">
                                  <Label>
                                    <Typography style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}>
                                      {!response.hideLoader ? (
                                        <Loader height={15} width={15} marginTop={0} />
                                      ) : response?.timeSheetDtls?.leave === null ? (
                                        '-'
                                      ) : (
                                        response?.timeSheetDtls?.leave || '-'
                                      )}
                                    </Typography>
                                  </Label>
                                </TableCell>
                              </>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Scrollbar>
              </>
            )}
            {/* </Scrollbar> */}

            <Stack sx={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#F7F7F8' }}>
              <ReactPaginate
                previousLabel={'Previous'}
                nextLabel={'Next'}
                breakLabel={'...'}
                pageCount={pagination.pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={'pagination'}
                activeClassName={'pagination-active'}
                previousClassName={'previous'}
                nextClassName={'next'}
                pageClassName={'page'}
              />
              {/* <TablePagination
                rowsPerPageOptions={[25, 50, 75]}
                component="div"
                count={activeEmployees.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handlePageClick}
                onRowsPerPageChange={handleChangeRowsPerPage}
              /> */}
            </Stack>
          </>
        </Card>
      </Container>
    </>
  );
}
