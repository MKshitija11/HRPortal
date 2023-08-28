import { useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { filter } from "lodash";
import { useState, useEffect } from "react";
import * as XLSX from "xlsx";

// @mui
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
  TableContainer,
  TablePagination,
} from "@mui/material";
// components
import Label from "../components/label";
import Iconify from "../components/iconify";
import Scrollbar from "../components/scrollbar";
// sections
import { UserListHead, UserListToolbar } from "../sections/@dashboard/user";
// mock
import Configuration from "../utils/Configuration";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "empId", label: "Employee Code", alignRight: false },
  { id: "name", label: "Name", alignRight: false },
  { id: "company", label: "Company", alignRight: false },
  { id: "role", label: "Role", alignRight: false },
  { id: "status", label: "Status", alignRight: false },
];

// ----------------------------------------------------------------------

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
  return order === "desc"
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
    return filter(
      array,
      (_user) =>
        _user.employeeFullName.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function EmployeeListBP() {
  const navigate = useNavigate();
  const location = useLocation();

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("empId");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [employeeList = [], setEmployeeList] = useState();

  const [csvData = [], setCsvData] = useState();

  useEffect(() => {
    const USERDETAILS = JSON.parse(sessionStorage.getItem("USERDETAILS"));
    if (USERDETAILS != null) {
      console.log("USERDETAILS", USERDETAILS);
      console.log("USERDETAILS.partnerName", USERDETAILS.partnerName);

      let dynaPartnerName = "";
      let dynaStatusName = "";
      try {
        dynaPartnerName = location.state.partnerNameChart;
      } catch (error) {
        dynaPartnerName = "";
      }
      try {
        dynaStatusName = location.state.empStatus;
      } catch (error) {
        dynaStatusName = "";
      }

      let empListVendorReq = {};

      if (dynaPartnerName === undefined) {
        empListVendorReq = {
          itSpocId: dynaStatusName,
          partnerName: "NA",
        };
      } else if (dynaStatusName === undefined) {
        empListVendorReq = {
          partnerName: dynaPartnerName,
          itSpocId: "NA",
        };
      } else {
        empListVendorReq = {
          partnerName: "NA",
          itSpocId: "NA",
        };
      }
      console.log(empListVendorReq);

      Configuration.getEmpListVendor(empListVendorReq).then(
        (empListVendorRes) => {
          console.log("empListVendorRes", empListVendorRes);
          setEmployeeList(empListVendorRes.data);
          console.log("employeeList", employeeList);
          setCsvData(empListVendorRes.data);
        }
      );
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  const ViewEmployee = (rowId) => {
    console.log("rowId", rowId);
    navigate("/ViewEmployeeITS", {
      state: {
        id: rowId,
      },
    });
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = employeeList.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  // const handleClick = (event, name) => {
  //   const selectedIndex = selected.indexOf(name);
  //   let newSelected = [];
  //   if (selectedIndex === -1) {
  //     newSelected = newSelected.concat(selected, name);
  //   } else if (selectedIndex === 0) {
  //     newSelected = newSelected.concat(selected.slice(1));
  //   } else if (selectedIndex === selected.length - 1) {
  //     newSelected = newSelected.concat(selected.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelected = newSelected.concat(
  //       selected.slice(0, selectedIndex),
  //       selected.slice(selectedIndex + 1)
  //     );
  //   }
  //   setSelected(newSelected);
  // };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - employeeList.length) : 0;

  const filteredUsers = applySortFilter(
    employeeList,
    getComparator(order, orderBy),
    filterName
  );

  const isNotFound = !filteredUsers.length && !!filterName;

  console.log("csvData", csvData);
  const Heading = [
    [
      "Partner Name",
      "Employee ID",
      "First Name",
      "Last Name",
      "Full Name",
      "Status",
      "Official Email",
      "Personal Email",
      "Mobile Number",
      "Whatsapp Number",
      "Joining Date",
      "ReportingTeamLead",
      "ReportingManager",
      "ReportingItSpoc",
      "BillingSlab",
      "EvaluationPeriod",
      "NewReplacement",
      "ReplacementEcode",
      "SupportDevelopment",
      "Function",
      "Department",
      "Vertical(Main)",
      "Vertical(Sub)",
      "Project Type",
      "Maximus/Opus",
      "Invoice Type",
    ],
  ];
  const selectedCols = csvData.map((n) => [
    n.partnerName,
    n.employeeId,
    n.employeeFirstName,
    n.employeeLastName,
    n.employeeFullName,
    n.employeeStatus,
    n.officialEmail,
    n.personalEmail,
    n.mobileNumber,
    n.whatsappNumber,
    n.joiningDate,
    n.reportingTeamLead,
    n.reportingManager,
    n.reportingItSpoc,
    n.billingSlab,
    n.evaluationPeriod,
    n.newReplacement,
    n.replacementEcode,
    n.supportDevelopment,
    n.functionDesc,
    n.departmentDesc,
    n.verticalMain,
    n.verticalSub,
    n.projectType,
    n.maximusOpus,
    n.invoiceType,
  ]);

  console.log("selectedCols", selectedCols);

  const exportToCSV = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet([]);
    XLSX.utils.sheet_add_aoa(ws, Heading);

    XLSX.utils.sheet_add_json(ws, selectedCols, {
      origin: "A2",
      skipHeader: true,
    });

    XLSX.utils.book_append_sheet(wb, ws, "DATA");

    XLSX.writeFile(wb, "EmployeeData.xlsx");
  };

  return (
    <>
      <Helmet>
        <title>HR Portal | Reports</title>
      </Helmet>

      {/* <Container disableGutters> */}
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={3}
        >
          <Typography variant="h4">
            Employees ({employeeList.length})
          </Typography>
          <Button
            variant="contained"
            startIcon={<Iconify icon="ri:file-excel-2-line" />}
            onClick={() => exportToCSV()}
            color="primary"
            size="medium"
          >
            Download Excel
          </Button>
        </Stack>

        <Card
          container
          sx={{
            border: "1px solid lightgray",
            borderRadius: "8px",
          }}
        >
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            employeeList={employeeList}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={employeeList.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const {
                        id,
                        employeeId,
                        employeeFullName,
                        employeeStatus,
                        partnerName,
                        departmentDesc,
                      } = row;
                      const selectedUser =
                        selected.indexOf(employeeFullName) !== -1;

                      return (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={selectedUser}
                          onClick={() => ViewEmployee(row.id)}
                          sx={{ cursor: "pointer" }}
                        >
                          <TableCell align="left">{employeeId}</TableCell>

                          <TableCell component="th" scope="row">
                            <Typography noWrap>{employeeFullName}</Typography>
                          </TableCell>

                          <TableCell align="left">{partnerName}</TableCell>

                          <TableCell align="left">{departmentDesc}</TableCell>
                          <TableCell align="left">
                            <Label
                              color={
                                (employeeStatus === "Active" && "success") ||
                                "warning"
                              }
                            >
                              {employeeStatus}
                            </Label>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: "center",
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete
                            words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={employeeList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </>
  );
}
