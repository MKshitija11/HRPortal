import PropTypes from 'prop-types';
// @mui
import { Box, TableRow, TableCell, TableHead, TableSortLabel } from '@mui/material';

// ----------------------------------------------------------------------

const visuallyHidden = {
  border: 0,
  margin: -1,
  padding: 0,
  width: '1px',
  height: '1px',
  overflow: 'hidden',
  position: 'absolute',
  whiteSpace: 'nowrap',
  clip: 'rect(0 0 0 0)',
};

UserListHead.propTypes = {
  order: PropTypes.oneOf(['asc', 'desc']),
  orderBy: PropTypes.string,
  headLabel: PropTypes.array,
  onRequestSort: PropTypes.func,
};

const newLocal = '100%';

const timeSheetStyling = {
  alignItems: 'center',
  textAlign: 'center',
  margin: 'auto',
  display: 'table',
  // border: '1px solid red',
  width: newLocal,
};



export default function UserListHead({ order, orderBy, headLabel, onRequestSort, isTimeSheet }) {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  // console.log('TIMESHEET>>>>>>>>>>', isTimeSheet);
  // const newLocal = '100%';
  return (
    <TableHead style={{ position: 'sticky', top: 0, background: 'grey' }}>
      <TableRow>
        {/* {headLabel.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.alignRight ? "right" : "left"}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ backgroundColor: "#ddd", color: "#6C63FF" }}
          >
            <TableSortLabel
              hideSortIcon
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box sx={{ ...visuallyHidden }}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))} */}
        {headLabel.map((headCell) => (
          <TableCell
            key={headCell.id}
            sx={{ backgroundColor: '#F7F7F8', color: '#0072BC' }}
          >
            <TableSortLabel hideSortIcon style={isTimeSheet ? timeSheetStyling : null}>
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
