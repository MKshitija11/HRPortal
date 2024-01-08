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
  TablePagination,
  Box,
  Grid,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import Loader from '../components/Loader/Loader';
import Scrollbar from '../components/scrollbar';
import Label from '../components/label';
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
import Configuration from '../utils/Configuration';
import Constants from '../Constants/Constants';
import '../css/App.css';
// import axios from 'axios';

const TABLE_HEAD = [
  { id: 'empId', label: 'Employee Code', alignRight: true },
  { id: 'name', label: 'Name', alignRight: true },
  { id: 'totalWorkingDays', label: 'Total Working Days ', alignRight: true },
  { id: 'atsFilledDays', label: 'ATS filled Days', alignRight: true },
  { id: 'pendingDays', label: 'Pending Days', alignRight: true },
  { id: 'leaves', label: 'Leaves', alignRight: true },
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

  const empArray = Constants.timesheetEmpList;

  const [atsApiRes, setApiRes] = useState(empArray);
  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('empId');
  const [selected, setSelected] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [pagination, setPagination] = useState({
    data: empArray.map((value, index) => ({
      id: index,
      // title: value.employeeFullName,
      // body: value.employeeStatus,
      // name: atsApiRes?.employeeName
    })),
    offset: 0,
    numberPerPage: 2,
    pageCount: 0,
    currentData: [],
  });

  useEffect(() => {
    console.log('custom useeffect 1');
    setIsLoading(true);
    const arr = empArray.slice(pagination.offset, pagination.offset + pagination.numberPerPage);

    for (let index = 0; index < arr.length; index += 1) {
      const element = arr[index];

      const atsReq = {
        userName: element.webId,
        fromDate: '',
        toDate: '',
      };
      fetchData(atsReq, (resp) => {
        const response = resp;
        element.timeSheetDtls = response;
        console.log('', arr);
        setApiRes([...arr]);
      });
    }

    // setIsLoading(false);

    console.log('slice/original', empArray, arr);
    setApiRes([...arr]);
    setPagination((prevState) => ({
      ...prevState,
      pageCount: prevState.data.length / prevState.numberPerPage,
      currentData: prevState.data.slice(pagination.offset, pagination.offset + pagination.numberPerPage),
    }));
  }, [pagination.numberPerPage, pagination.offset, empArray]);

  useEffect(() => {
    console.log('custom useeffect', atsApiRes);
  }, [atsApiRes, pagination]);

  const fetchData = async (atsReq, callback) => {
    await Configuration.getTimeSheetDetails(atsReq)
      .then((atsRes) => {
        if (atsRes.data.stringObject10) {
          callback(atsRes.data.stringObject10);
        } else {
          setOpenModal(true);
          // alert('Something went wrong');
        }
        setIsLoading(false);
      })
      .catch((error) => console.log('error', error));
    // setIsLoading(false);
  };

  const handlePageClick = (event) => {
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

  return (
    <>
      <Container>
        <Stack alignItems="center" justifyContent="center" spacing={5} sx={{ my: 2 }}>
          <Modal open={openModal} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
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
              <Typography id="modal-modal-description" sx={{ mt: 1, textAlign: 'center' }}>
                Something went wrong!! Please try after sometime
              </Typography>

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
                    onClick={() => {
                      setOpenModal(false);
                      navigate('/EmployeesTL');
                    }}
                    sx={{ mt: 2 }}
                  >
                    OK
                  </Button>
                </Stack>
              </Grid>
            </Box>
          </Modal>
        </Stack>

        <Card
          sx={{
            border: '1px solid lightgray',
            borderRadius: '8px',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          // mb={5}
        >
          <UserListToolbar
            numSelected={selected.length}
            // filterName={filterName}
            // onFilterName={handleFilterByName}
            employeeList={empArray.slice(pagination.offset, pagination.offset + pagination.numberPerPage)}
          />
          <>
            <Scrollbar>
              {isLoading ? (
                <Stack justifyContent="center" alignItems="center" mb={10}>
                  <Loader />
                </Stack>
              ) : (
                <>
                  <Stack
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                      height: 40,
                    }}
                  >
                    <Typography variant="h5" sx={{ textAlign: 'center', color: '#0072BC' }}>
                      JANUARY 2024
                    </Typography>
                  </Stack>
                  <TableContainer sx={{ minWidth: 800, height: '60vh' }}>
                    <Table>
                      <UserListHead
                        order={order}
                        orderBy={orderBy}
                        headLabel={TABLE_HEAD}
                        // rowCount={employeeDetails.length}
                        numSelected={selected.length}
                        onRequestSort={handleRequestSort}
                        // onSelectAllClick={handleSelectAllClick}
                        sx={{ alignItems: 'center', justifyContent: 'center' }}
                      />

                      <TableBody>
                        {atsApiRes.map((response, index) => (
                          <TableRow
                            hover
                            key={index}
                            tabIndex={-1}
                            role="checkbox"
                            //  selected={selectedUser}
                            // onClick={() => navigate('/EmployeeTimesheetDetails')}
                            sx={{ cursor: 'pointer' }}
                            ml={2}
                          >
                            <TableCell align="center">{response.timeSheetDtls?.employeeCode}</TableCell>

                            <TableCell component="th" scope="row" align="center">
                              <Typography noWrap>{response.timeSheetDtls?.employeeName}</Typography>
                            </TableCell>

                            <TableCell align="center">
                              <Typography>{response.timeSheetDtls?.totalWorkingDays}</Typography>
                            </TableCell>

                            <TableCell align="center">
                              <Label color="success">{response.timeSheetDtls?.atsnotFilledDays}</Label>
                            </TableCell>
                            <TableCell align="center">
                              <Label color="error">{response.timeSheetDtls?.atsfilledDays}</Label>
                            </TableCell>

                            <TableCell align="center">{response.timeSheetDtls?.leave}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </>
              )}
            </Scrollbar>

            <Stack sx={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#F7F7F8' }}>
              <ReactPaginate
                previousLabel={'previous'}
                nextLabel={'next'}
                breakLabel={'...'}
                pageCount={pagination.pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={'pagination'}
                activeClassName={'pagination-active'}
                previousClassName={'previous11'}
              />
            </Stack>
          </>
        </Card>
      </Container>
    </>
  );
}
