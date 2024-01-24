import React, { useEffect, useState } from 'react';
import { Typography, Container, Card, Stack, Grid, TextField } from '@mui/material';
// import Calendar from 'react-calendar';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-calendar/dist/Calendar.css';
import addMonths from 'date-fns/addMonths';
import { subMonths } from 'date-fns';
import format from 'date-fns/format';
import moment from 'moment';
import { useLocation } from 'react-router-dom';
import Loader from '../components/Loader/Loader';
import Configuration from '../utils/Configuration';

export default function EmployeeTimesheetDetails() {
  const location = useLocation();

  const [value, onChange] = useState(new Date());
  const [fromDate, setFromDate] = useState('04-jan-2024');
  const [toDate, setToDate] = useState('04-jan-2024');
  const [userName, setUserName] = useState('');
  const [userListData, setUserListData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState();
  const [selectedEndDate, setSelectedEndDate] = useState();

  useEffect(() => {
    handleApi();
  }, [location.state.user.username]);

  const handleApi = () => {
    setIsLoading(true);
    const atsReq = {
      userName: location?.state?.user?.username,
      fromDate: moment(selectedStartDate).format('DD-MMM-YYYY').toLowerCase() || '',
      toDate: moment(selectedEndDate).format('DD-MMM-YYYY').toLowerCase() || '',
    };
    Configuration.getTimeSheetDetails(atsReq)
      .then((atsRes) => {
        console.log('custom useeffect>>>.', atsRes.data.userList);
        const list1 = JSON.parse(JSON.stringify(atsRes.data.userList));
        const list2 = JSON.parse(JSON.stringify(atsRes.data.userList));
        const list3 = JSON.parse(JSON.stringify(atsRes.data.userList));
        const list4 = JSON.parse(JSON.stringify(atsRes.data.userList));
        const list5 = JSON.parse(JSON.stringify(atsRes.data.userList));
        list2.map((item) => {
          delete item.status;
          return item;
        });
        list3.map((item) => {
          delete item.status;
          delete item.atsfilledTime;
          return item;
        });
        list4.map((item) => {
          delete item.status;
          delete item.atsfilledTime;
          delete item.checkIn;
          return item;
        });
        list5.map((item) => {
          delete item.status;
          delete item.atsfilledTime;
          delete item.checkOut;
          return item;
        });
        console.log('mapped list', list4, atsRes.data.userList);
        setUserListData([...list1, ...list2, ...list3, ...list4]);
        setIsLoading(false);
      })
      .catch((error) => console.log('error', error));
  };

  const localizer = momentLocalizer(moment);
  console.log('LOCALIZER', localizer);

  const events = userListData.map((data, index) => {
    console.log('data===>', data);
    return {
      // title: data.status
      //   ? `Status: ${data.status}`
      //   : data.atsfilledTime
      //   ? `ATS Entry: ${data.atsfilledTime}`
      //   : `Vistor Entry: ${data.visitorEntry}`,

      title: (
        <span style={{ borderRadius: 8 }}>
          <span
            style={{
              height: data.status ? 10 : 20,
              width: 10,
              borderRadius: '50%',
              display: 'flex',
              backgroundColor: 'pink',
              background:
                data.status === 'PH'
                  ? 'orange'
                  : data.status === 'P'
                  ? 'green'
                  : data.status === 'FD'
                  ? 'red'
                  : data.status === 'HD'
                  ? '#d32f2f'
                  : data.atsfilledTime
                  ? 'blue'
                  : data.checkIn || data.checkOut
                  ? 'blue'
                  : null,
            }}
          >
            <input
              style={{ borderWidth: 0, width: 'auto' }}
              type={data.status ? 'hidden' : null}
              value={
                data.status
                  ? ''
                  : data.atsfilledTime
                  ? `ATS : ${data.atsfilledTime}`
                  : data.checkIn
                  ? `CheckIn: ${data.checkIn}`
                  : data.checkOut
                  ? `Checkout: ${data.checkOut}`
                  : null
              }
            />
          </span>
        </span>
      ),
      start: data.date,
      end: data.date,
      backgroundColor: 'yellow',
    };
  });

  const eventPropGetter = (event, start, end, title, isSelected) => {
    console.log('EVENT', event);
    const style = {
      color: 'white',
      backgroundColor: 'transparent',
      top: 5,
    };
    return {
      style,
    };
  };

  const handleChangedStartDate = (evt) => {
    console.log('handleChangedStartDate', evt.target.value);
    const startDate = moment(evt.target.value).format('DD-MMM-YYYY').toLowerCase();
    console.log('start Date >>.', startDate);
    // setSelectedStartDate(moment(evt.target.value).format('DD-MMM-YYYY').toLowerCase());
    setSelectedStartDate(evt.target.value);
  };

  const handleChangedEndDate = (evt) => {
    console.log('handleChangedEndDate', evt.target.value);
    setSelectedEndDate(evt.target.value);
    handleApi();
  };

  return (
    <>
      <Container>
        <Card
          container
          sx={{
            border: '1px solid lightgray',
            borderRadius: '8px',
          }}
        >
          {isLoading ? (
            <Stack justifyContent="center" alignItems="center" mb={20}>
              <Loader />
            </Stack>
          ) : (
            <>
              <Stack
                sx={{
                  flexDirection: 'row',
                  padding: 2,
                  alignItems: 'center',
                  textDecoration: 'underline',
                  justifyContent: 'center',
                }}
              >
                <Stack sx={{ flexDirection: 'row' }}>
                  <Typography variant="h6" sx={{ color: '#0072BC' }}>
                    Employee Code:
                  </Typography>
                  <Typography variant="h6" sx={{ color: '#676767', fontSize: 18 }}>
                    {location.state.user.employeeCode}
                  </Typography>
                </Stack>

                <Stack sx={{ padding: 1 }}>
                  <Typography variant="h6" sx={{ color: '#676767' }}>
                    |
                  </Typography>
                </Stack>

                <Stack sx={{ flexDirection: 'row' }}>
                  <Typography variant="h6" sx={{ color: '#0072BC' }}>
                    Employee Name:
                  </Typography>
                  <Typography variant="h6" sx={{ color: '#676767' }}>
                    {location.state.user.employeeName}
                  </Typography>
                </Stack>
              </Stack>

              <Stack sx={{ padding: 5 }}>
                <Stack
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    alignItems: 'flex-start',
                    // margin: '10px ',
                    padding: '10px',
                  }}
                >
                  <Stack style={{ flexDirection: 'row' }}>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        InputLabelProps={{ shrink: true }}
                        autoComplete="off"
                        name="selectedStartDate"
                        variant="outlined"
                        required
                        fullWidth
                        type="date"
                        id="selectedStartDate"
                        label="From"
                        value={selectedStartDate}
                        onChange={(evt) => {
                          handleChangedStartDate(evt);
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <TextField
                        InputLabelProps={{ shrink: true }}
                        autoComplete="off"
                        name="selectedEndDate"
                        variant="outlined"
                        required
                        fullWidth
                        type="date"
                        id="selectedEndDate"
                        label="To"
                        inputProps={{
                          // min: new Date().toISOString().split('T')[0],
                          // const c = subMonths(date, 3);
                          min: format(subMonths(new Date(), 2), 'yyyy-MM-dd'),
                          max: format(new Date(), 'yyyy-MM-dd'),
                        }}
                        value={selectedEndDate}
                        onChange={(evt) => {
                          handleChangedEndDate(evt);
                        }}
                      />
                    </Grid>
                  </Stack>
                </Stack>
                <Calendar
                  localizer={localizer}
                  events={events}
                  doShowMoreDrillDown
                  drilldownView="day"
                  popup
                  startAccessor="start"
                  endAccessor="end"
                  style={{ height: '90vh', width: 900 }}
                  views={['month']}
                  defaultView="month"
                  eventPropGetter={eventPropGetter}
                />
              </Stack>

              <Stack
                justifyContent="space-evenly"
                // alignItems="center"
                mb={2}
                sx={{
                  height: 40,
                  backgroundColor: 'lightGrey',
                  borderRadius: '8px',
                  borderWidth: 1,
                  flexDirection: 'row',
                  display: 'flex',
                }}
              >
                <Stack sx={{ flexDirection: 'row', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Stack sx={{ height: 10, width: 10, borderRadius: 5, backgroundColor: 'orange' }} />
                  <Typography ml={1} sx={{ fontWeight: '500' }}>
                    Public Holiday
                  </Typography>
                </Stack>
                <Stack sx={{ flexDirection: 'row', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Stack sx={{ height: 10, width: 10, borderRadius: 5, backgroundColor: 'red' }} />
                  <Typography ml={1} sx={{ fontWeight: '500' }}>
                    Full Day Leave
                  </Typography>
                </Stack>
                <Stack sx={{ flexDirection: 'row', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Stack sx={{ height: 10, width: 10, borderRadius: 5, backgroundColor: 'red' }} />
                  <Typography ml={1} sx={{ fontWeight: '500' }}>
                    Half Day Leave
                  </Typography>
                </Stack>
                <Stack sx={{ flexDirection: 'row', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Stack sx={{ height: 10, width: 10, borderRadius: 5, backgroundColor: '#228B22' }} />
                  <Typography ml={1} sx={{ fontWeight: '500' }}>
                    Present
                  </Typography>
                </Stack>
              </Stack>
            </>
          )}
        </Card>
      </Container>
    </>
  );
}
