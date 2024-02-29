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
  FormControl,
  TextField,
  TablePagination,
  InputLabel,
  InputAdornment,
  IconButton,
  Box,
  Grid,
  MenuItem,
  Select,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import * as XLSX from 'xlsx';
import Marquee from 'react-fast-marquee';
import 'react-calendar/dist/Calendar.css';
import Loader from '../components/Loader/Loader';
import Iconify from '../components/iconify/Iconify';
import Scrollbar from '../components/scrollbar';
import Label from '../components/label';
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
import Configuration from '../utils/Configuration';
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
  const [selectedName, setSelectedName] = useState('');
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showSelectedList, setShowSelectedList] = useState(false);
  const [updatedArray, setUpdatedArray] = useState([]);
  const [clonedFilteredArray, setClonedFilteredArray] = useState();

  const ROLE = sessionStorage.getItem('ROLE');
  const USERDETAILS = sessionStorage.getItem('USERDETAILS');
  console.log('ROLE>>', ROLE, USERDETAILS);
  const clonedActiveList = [...activeEmployees];
  const activeEmpFullNameList = clonedActiveList
    .filter((emp) => emp.employeeFullName)
    .map((emp) => emp.employeeFullName);

  useEffect(() => {
    console.log('location===>', location.pathname);
    const USERDETAILS = JSON.parse(sessionStorage.getItem('USERDETAILS'));
    if (USERDETAILS != null) {
      const getEmpListTLReq = {
        teamLeadId: USERDETAILS?.[0]?.spocEmailId,
      };

      if (ROLE === 'BAGIC_TL') {
        setIsLoading(true);
        Configuration.getEmpListTeamLead(getEmpListTLReq)
          .then((empListTLRes) => {
            console.log('empListVendorRes=====>', empListTLRes);
            if (empListTLRes.data.error) {
              // setErrorMessage(true);
              setTimeout(() => {
                // console.log('inside 1st false')
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
      } else if (USERDETAILS?.[0]?.userProfile === 'BAGIC_PARTNER') {
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
          itSpocId: 'pooja.rebba@bajajallianz.co.in',
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
  }, [location]);

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
  const [pageRender, setPageRender] = useState(50);
  const [open, setOpen] = useState(false);
  const [searchApiRes, setSearchApiRes] = useState([]);
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
    if (location.pathname === '/TimeSheet') {
      setSelectedName('');
    }
  }, []);

  useEffect(() => {
    // console.log('custom useeffect 1<><>');
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
        // console.log('', arr);
        setApiRes([...arr]);

        // if(breakCondition){
        //   console.log("breakCondition", index)
        //   throw new Error()
        // }
      }).catch((er) => {
        console.log('caught error==>', er);
      });
    }

    // console.log('slice/original', atsApiRes, pagination);
    setApiRes([...arr]);
    setPagination((prevState) => ({
      ...prevState,
      pageCount: prevState.data.length / prevState.numberPerPage,
      currentData: prevState.data.slice(pagination.offset, pagination.offset + pagination.numberPerPage),
    }));
  }, [pagination.numberPerPage, pagination.offset, empArray, selectedMonth]);

  useEffect(() => {
    console.log('custom useeffect', atsApiRes);
    // if(atsApiRes.filter(data => !data.hideLoader).length === 0){
    //   setShowSearchBar(true)
    // } else {
    //   setShowSearchBar(false)
    // }
  }, [atsApiRes, pagination, selectedMonth]);

  const fetchData = async (atsReq, idx, arrLength, callback) =>
    fetch('https://webservices.bajajallianz.com/BagicVisitorAppWs/userTimeSheet', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(atsReq),
    }).then((response) =>
      response
        .json()
        .then((data) => {
          const atsRes = data;
          // console.log('data$$$$', atsRes);
          if (atsRes?.errorCode === '1') {
            setTimeout(() => {
              setIsLoading(false);
            }, 60000);
            // setOpenErrorModal(true)
          } else if (atsRes?.errorCode === '0') {
            // setIsLoading(true);
            console.log('custom useeffect>>>.', atsRes.stringObject10);
            // if(arrLength === idx){
            // console.log('inside 1st false >>>>');
            setIsLoading(false);
            setShowSearchBar(true);

            // }
            // if(atsApiRes.filter(data=>data.timeSheetDtls).length === atsApiRes.length){
            //   alert('')
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

  const handlePageClick = (event, newPage) => {
    console.log('handle Page click ', event, newPage);
    setPage(newPage);
    setIsLoading(false);
    const selected = event.selected;
    // alert(selected);
    const offset = selected * pagination.numberPerPage;
    setPagination({ ...pagination, offset });
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleFilterByName = (event) => {
    console.log('filter by name target', event);
    // setFilterName(event);
    setPage(0);
    const filteredUsers = applySortFilter(clonedActiveList, getComparator(order, orderBy), event);
    console.log('activeEmp List ', filteredUsers?.[0]?.webUserId);
    // setSearchApiRes();

    // setApiRes(filteredUsers.filter((employees) => employees.employeeStatus === 'Active'));
    setEmpArray(filteredUsers);
    setIsLoading(true);
    setClonedFilteredArray(filteredUsers);
    handleSelectedTimeSheetApi(filteredUsers);
    setActiveEmployees(filteredUsers.filter((employees) => employees.employeeStatus === 'Active'));
    // setCsvData(filteredUsers.filter((employees) => employees.employeeStatus === 'Active'));
    // handleFilterByNameTimesheet(filteredUsers?.[0]?.webUserId);
  };

  const handleSelectedTimeSheetApi = (filteredUsers) => {
    console.log('filtered users====>', filteredUsers)
 
    const atsReq = {
      userName: filteredUsers?.[0]?.webUserId,
      fromDate: '',
      toDate: '',
    };
    console.log('get timesheet details req >>>>', atsReq);

    return fetch('https://webservices.bajajallianz.com/BagicVisitorAppWs/userTimeSheet', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      // body: atsReq,
      body: JSON.stringify(atsReq),
    }).then((resp) =>
      resp.json().then((data) => {
        const atsRes = data;
        console.log('ats Res===>', atsRes)
        const result = atsApiRes.filter(emp => emp.employeeId === atsRes?.stringObject10?.employeeCode)
        setSearchApiRes(result)
        setIsLoading(false);
      })
    );
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

  const handleChangeForSearchByUsername = (event) => {
    updatedArray.pop();
    // setFilterName(event.target.value)

    setSelectedName(event.target.value);
    handleFilterByName(event.target.value);
    setShowSelectedList(true);
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

          <Stack mt={2} style={{ flexDirection: 'row', justifyContent: showSearchBar ? 'space-between' : '' }}>
            {/* <Stack mt={10}>
              <UserListToolbar
                numSelected={selected.length}
                filterName={selectedName}
                onFilterName={handleChangeForSearchByUsername}
                // employeeList={empArray.slice(pagination.offset, pagination.offset + pagination.numberPerPage)}
                employeeList={empArray}
              />
            </Stack> */}
            {showSearchBar ? (
              <Stack style={{ width: '25%', display: 'flex' }} mt={1} ml={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    open
                    InputLabelProps={{ shrink: true }}
                    autoComplete="off"
                    select
                    size="small"
                    fullWidth
                    placeholder="Search by Username"
                    label="Search by Username"
                    value={selectedName}
                     filter
                    onChange={(evt) => {
                      handleChangeForSearchByUsername(evt);
                    }}
                    InputProps={{
                      startAdornment: (
                        <>
                          <InputAdornment position="start">
                            <IconButton edge="start">
                              <Iconify icon="material-symbols:search" />
                            </IconButton>
                          </InputAdornment>
                        </>
                      ),
                    }}
                  >
                    {activeEmpFullNameList.map((name) => (
                      <MenuItem key={name} value={name}>
                        {name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Stack>
            ) : null}
            <Stack mt={1} mr={2} ml={2} style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
              <Typography variant="h4" sx={{ color: '#0072BC' }}>
                Employees ({activeEmployees.length})
              </Typography>
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
                      {console.log('searchApiRes', searchApiRes)}
                      {showSelectedList ? (
                        <>
                          <TableBody>
                            {searchApiRes.map((response, index) => {
                              const selectedUser = selected.indexOf(response?.employeeFullName) !== -1;
                              console.log('emp array response', response, response.hideLoader);
                              return (
                                <TableRow
                                  hover
                                  key={index}
                                  tabIndex={-1}
                                  role="checkbox"
                                  selected={selectedUser}
                                  onClick={() =>
                                    response?.timeSheetDtls
                                      ? response?.username
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
                                  // onClick={() =>
                                  //   response?.username
                                  //     ? navigate('/EmployeeTimesheetDetails', {
                                  //         state: {
                                  //           user: response?.timeSheetDtls,
                                  //           selectedStartDate: startDate,
                                  //           selectedEndDate: endDate,
                                  //           month: selectedMonth,
                                  //         },
                                  //       })
                                  //     : setUpdateWebIdModal(true)
                                  // }
                                  sx={{ cursor: 'pointer' }}
                                  ml={2}
                                >
                                  <>
                                    <TableCell align="center">
                                      {response?.employeeCode === null ? '' : response?.employeeCode}
                                    </TableCell>

                                    <TableCell component="th" scope="row" align="center">
                                      <Typography style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}>
                                        {response?.employeeName === null ? '' : response?.employeeName}
                                      </Typography>
                                    </TableCell>

                                    <TableCell align="center">
                                      <Label>
                                        <Typography
                                          style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}
                                        >
                                          {/* {!response.hideLoader ? (
                                            <Loader height={15} width={15} marginTop={0} />
                                          ) : response?.totalWorkingDays === null ? (
                                            '-'
                                          ) : (
                                            response?.totalWorkingDays || '-'
                                          )} */}
                                          {response?.totalWorkingDays ? response?.totalWorkingDays : '-'}
                                        </Typography>
                                      </Label>
                                    </TableCell>

                                    <TableCell align="center">
                                      <Label color="success">
                                        <Typography
                                          style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}
                                        >
                                          {/* {!response.hideLoader ? (
                                            <Loader height={15} width={15} marginTop={0} />
                                          ) : response?.atsfilledDays === null ? (
                                            '-'
                                          ) : (
                                            response?.atsfilledDays || '-'
                                          )} */}
                                          {response?.atsfilledDays ? response?.atsfilledDays : '-'}
                                        </Typography>
                                      </Label>
                                    </TableCell>
                                    <TableCell align="center">
                                      <Label color="error">
                                        <Typography
                                          style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}
                                        >
                                          {/* {!response.hideLoader ? (
                                            <Loader height={15} width={15} marginTop={0} />
                                          ) : response?.atsnotFilledDays === null ? (
                                            '-'
                                          ) : (
                                            response?.atsnotFilledDays || '-'
                                          )} */}
                                          {response?.atsnotFilledDays ? response?.atsnotFilledDays : '-'}
                                        </Typography>
                                      </Label>
                                    </TableCell>

                                    <TableCell align="center">
                                      <Label>
                                        <Typography
                                          style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}
                                        >
                                          {/* {!response.hideLoader ? (
                                            <Loader height={15} width={15} marginTop={0} />
                                          ) : response?.leave === null ? (
                                            '-'
                                          ) : (
                                            response?.leave || '-'
                                          )} */}
                                          {response?.leave ? response?.leave : '-'}
                                        </Typography>
                                      </Label>
                                    </TableCell>
                                  </>
                                </TableRow>
                              );
                            })}
                          </TableBody>
                        </>
                      ) : (
                        <>
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
                                        <Typography
                                          style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}
                                        >
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
                                      <Label color="success">
                                        <Typography
                                          style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}
                                        >
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
                                      <Label color="error">
                                        <Typography
                                          style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}
                                        >
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
                                        <Typography
                                          style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}
                                        >
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
                        </>
                      )}
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
              {console.log('EMployee list length', activeEmployees.length)}
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
