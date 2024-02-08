import React, { useEffect, useState } from 'react';
import { Typography, Container, Card, Stack, Grid, TextField, Button, Box, Modal } from '@mui/material';
import { grey } from '@mui/material/colors';
// import Calendar from 'react-calendar';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar as CalendarView } from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
import 'react-calendar/dist/Calendar.css';
import addMonths from 'date-fns/addMonths';
import { subMonths } from 'date-fns';
import format from 'date-fns/format';
import moment from 'moment';
import { useLocation } from 'react-router-dom';
import Loader from '../components/Loader/Loader';
import Scrollbar from '../components/scrollbar/Scrollbar';
import Configuration from '../utils/Configuration';

const CustomEvent = (event) => {
  const location = useLocation();
  return <Stack />;
};

export default function EmployeeTimesheetDetails() {
  const location = useLocation();

  const [value, onChange] = useState(new Date());
  const [fromDate, setFromDate] = useState('04-jan-2024');
  const [toDate, setToDate] = useState('04-jan-2024');
  const [selectedMonth, setSelectedMonth] = useState();
  const [userListData, setUserListData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState('');
  const [selectedEndDate, setSelectedEndDate] = useState('');
  const [selectedUserListData, setSelectedUserListData] = useState('');
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [preSelectedDate, setPreSelectedDate] = useState(moment(location?.state?.month).format('YYYY-MM-DD'));
  const [openCalendar, setOpenCalendar] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const month = location?.state?.month;
  const startDateOfMonth = moment(month).startOf('month').format('DD-MMM-YYYY').toLowerCase();
  const endDateOfMonth = moment(month).endOf('month').format('DD-MMM-YYYY').toLowerCase();
  const formattedStartDate = moment(startDateOfMonth).format('YYYY-MM-DD');
  const formattedEndDate = moment(endDateOfMonth).format('YYYY-MM-DD');
  const taskDescription =
    'Application closed as per the channel approval,report generating for prosphet reject and imd expiry ~Imd storing error and\nPayment related link issue.Application closed as per the channel approval,report generating for prosphet reject and imd expiry ~Imd storing error and\nPayment related link issue.Application closed as per the channel approval,report generating for prosphet reject and imd expiry ~Imd storing error and\nPayment related link issue.';
  console.log('selectedUserListData', selectedUserListData);

  const lines = taskDescription.split('~').map((line, index) => (
    <div key={index}>
      {line}
      <br />
    </div>
  ));

  const divStyle = {
    backgroundColor: '#FFF5EE',
    width: '100%',
    height: '100%',
    margin: '5px',
    fonstSize: '30px',
    borderRadius: '8px',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const userContentStyle = {
    boxShadow: '0 0 2px 2px lightgrey',
    height: '40px',
    width: 290,
    backgroundColor: '#f1f1f1',

    borderRadius: '8px',

    margin: '5px',
    top: 5,
    flexDirection: 'row',
  };
  const eventsList = [{ id: 1, startData: startDateOfMonth, endData: endDateOfMonth }];
  const filteredSelectedDate = [startDateOfMonth, endDateOfMonth];
  const filteredevents = eventsList.filter((data) =>
    filteredSelectedDate.some(
      (date) => moment(eventsList.start).isSame(date, 'day') || moment(eventsList.end).isSame(data, 'day')
    )
  );
  console.log('filteredevents', filteredevents);
  useEffect(() => {
    handleApi();
  }, [location.state.user.username, selectedEndDate]);

  const handleApi = (param) => {
    console.log('PARAM', param);
    // setIsLoading(true);
    // setIsLoading(false);
    const atsReq = {
      userName: location?.state?.user?.username,
      // fromDate: location?.state?.month
      //   ? startDateOfMonth
      //   : selectedStartDate === ''
      //   ? ''
      //   : moment(selectedStartDate).format('DD-MMM-YYYY').toLowerCase(),
      // fromDate: location?.state?.month
      //   ? startDateOfMonth
      //   : moment(selectedStartDate).format('DD-MMM-YYYY').toLowerCase(),
      // toDate: location?.state?.month
      //   ? endDateOfMonth
      //   : selectedEndDate === ''
      //   ? ''
      //   : moment(selectedEndDate).format('DD-MMM-YYYY').toLowerCase(),
      // toDate: location?.state?.month ? endDateOfMonth : moment(selectedEndDate).format('DD-MMM-YYYY').toLowerCase(),
      // fromDate:
      //   selectedStartDate === '' ? startDateOfMonth : moment(selectedStartDate).format('DD-MMM-YYYY').toLowerCase(),

      // toDate: selectedEndDate === '' ? endDateOfMonth : moment(selectedEndDate).format('DD-MMM-YYYY').toLowerCase(),

      fromDate: param ? startDate : startDateOfMonth,
      toDate: param ? endDate : endDateOfMonth,
    };

    console.log('REQUEST>>>', atsReq);
    setIsLoading(true);
    Configuration.getTimeSheetDetails(atsReq)
      .then((atsRes) => {
        if (atsRes?.data?.errorCode === '0') {
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
          console.log('mapped list', atsRes.data?.stringObject10);
          setSelectedMonth(atsRes.data?.stringObject10);
          // setUserListData([...list1, ...list2, ...list3, ...list4]);
          setUserListData([...list1]);

          setIsLoading(false);
        }
      })
      .catch((error) => console.log('error', error));
  };

  const localizer = momentLocalizer(moment);
  const threeMonthsAgo = moment().subtract(3, 'months').toDate();

  const events = userListData.map((data, index) => ({
    title: (
      <span style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
        <span
          style={{
            height: data.status ? 10 : 20,
            width: 10,
            borderRadius: '50%',
            // margin: 20,
            // height: '100%', width:'100%',
            display: 'flex',
            backgroundColor:
              data.status === 'PH'
                ? 'black'
                : data.status === 'P'
                ? 'green'
                : data.status === 'FD'
                ? 'red'
                : data.status === 'HD'
                ? 'orange'
                : data.atsfilledTime
                ? 'blue'
                : data.checkIn || data.checkOut
                ? 'blue'
                : null,
            background:
              data.status === 'PH'
                ? 'black'
                : data.status === 'P'
                ? 'green'
                : data.status === 'FD'
                ? 'red'
                : data.status === 'HD'
                ? 'orange'
                : data.atsfilledTime
                ? 'blue'
                : data.checkIn || data.checkOut
                ? 'blue'
                : null,
          }}
        >
          {/* <input
            style={{ borderWidth: 0, width: 'auto' }}
            type={data.status ? 'hidden' : null}
            value={
              data.status
                ? ''
                : data.atsfilledTime
                ? `ATS : ${data.atsfilledTime} hrs`
                : data.checkIn
                ? `CheckIn: ${data.checkIn}`
                : data.checkOut
                ? `Checkout: ${data.checkOut}`
                : null
            }
          /> */}
        </span>
      </span>
    ),
    start: data.date,
    end: data.date,
    backgroundColor: 'yellow',
  }));

  // const selectedEvents = [{selectedStart:  selectedStartDate, selectedEnd: selectedEndDate }];

  // const filteredEvents = selectedEvents.filter((events) => console.log(events));
  // console.log('filtered events ', filteredEvents);

  // const [selectedEvents, setSelectedEvents] = useState([])
  // setSelectedEvents(current => [...current, selectedStartDate, selectedEndDate] )

  const eventPropGetter = (event, start, end, title, isSelected) => {
    // console.log('EVENT', event);
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
    console.log('Date handleChangedStartDate', evt.target.value);
    const startDate = moment(evt.target.value).format('DD-MMM-YYYY').toLowerCase();
    console.log('start Date >>.', startDate);
    // setSelectedStartDate(moment(evt.target.value).format('DD-MMM-YYYY').toLowerCase());
    setSelectedStartDate(evt.target.value);
  };

  const handleChangedEndDate = (evt) => {
    console.log('Date handleChangedEndDate', evt.target.value);
    setSelectedEndDate(evt.target.value);
    // setSelectedEvents(current => [...current, selectedStartDate, selectedEndDate] )
    setTimeout(() => {
      handleApi();
    }, 500);
  };

  const handleClickEvent = (evt) => {
    console.log('handled clikced event', evt);
    const filteredData = userListData.filter((data) => data.date === evt.start);
    console.log('handled clikced event filteredData', filteredData?.[0]);
    setSelectedUserListData(filteredData?.[0]);
    console.log('handled clikced event>>>>', userListData);
  };

  const handleMonthChange = (date) => {
    console.log('DATE>>..', date);
    const month = moment(date).format('MMM-YYYY').toLowerCase();
    const currentMonth = moment().format('MMM-YYYY').toLowerCase();
    console.log('selected date>>>.', month);
    const selectedStartDateOfMonth = moment(date).startOf('month').format('DD-MMM-YYYY').toLowerCase();
    const selectedEndDateOfMonth = moment(date).endOf('month').format('DD-MMM-YYYY').toLowerCase();
    const currentDate = moment().format('DD-MMM-YYYY').toLowerCase();
    console.log('current month', selectedStartDateOfMonth);
    if (month === currentMonth) {
      setStartDate(selectedStartDateOfMonth);
      setEndDate(currentDate);
      setSelectedMonth(month);
    } else {
      setStartDate(selectedStartDateOfMonth);
      setEndDate(selectedEndDateOfMonth);
      setSelectedMonth(month);
    }
  };

  console.log('START DATE', new Date(startDate));

  return (
    <>
      <Container>
        <Card
          container
          sx={{
            border: '1px solid lightgray',
            borderRadius: '8px',
            height: 'auto',
          }}
        >
          {isLoading ? (
            <Stack justifyContent="center" alignItems="center" mb={20}>
              <Loader />
            </Stack>
          ) : (
            <>
              {/* <Stack
                sx={{
                  flexDirection: 'row',
                  padding: 2,
                }}
              >
                <Stack sx={{ flexDirection: 'row' }} ml={3}>
                  <Typography variant="h6" sx={{ color: '#0072BC' }}>
                    Employee Name:
                  </Typography>
                  <Typography variant="h6" ml={1}>
                    {location.state.user.employeeName}
                  </Typography>
                </Stack>
                <Stack
                  sx={{
                    height: 60,
                    // width: '25%',
                  }}
                  display="flex"
                  justifyContent="flex-end"
                  alignItems="flex-end"

                  // mb={3}
                >
                  <Button
                    size="medium"
                    variant="contained"
                    type="button"
                    // startIcon={<Iconify icon="ri:calendar-line" />}
                    color="primary"
                    // onClick={() => setOpenCalendar(true)}
                    // sx={{ mt: 2 }}
                    style={{alignItems: 'flex-end', justifyContent: 'flex-end'}}
                  >
                    Select Month
                  </Button>
                </Stack>
              </Stack> */}
              <Stack
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingTop: 3,
                  paddingLeft: 5,
                  paddingRight: 5,
                }}
              >
                <Stack sx={{ flexDirection: 'row' }}>
                  <Typography variant="h6" sx={{ color: '#0072BC' }}>
                    Employee Name:
                  </Typography>
                  <Typography variant="h6" ml={1}>
                    {location.state.user.employeeName}
                  </Typography>
                </Stack>
                <Stack>
                  <Button
                    size="medium"
                    variant="contained"
                    type="button"
                    // startIcon={<Iconify icon="ri:calendar-line" />}
                    color="primary"
                    onClick={() => setOpenCalendar(true)}
                    // sx={{ mt: 2 }}
                    style={{ alignItems: 'flex-end', justifyContent: 'flex-end' }}
                  >
                    Select Month
                  </Button>
                </Stack>
              </Stack>
              <Modal open={openCalendar} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
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
                  <CalendarView
                    view="year"
                    // value={selectedDate}
                    onClickMonth={handleMonthChange}
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
                          handleApi(true);
                          // handleChange();
                        }}
                        sx={{ mt: 2 }}
                      >
                        OK
                      </Button>
                    </Stack>
                  </Grid>
                </Box>
              </Modal>
              <Stack sx={{ paddingRight: 4 }} display="none">
                <Stack
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'flex-end',
                    justifyContent: 'flex-end',
                  }}
                >
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
                      value={selectedStartDate || formattedStartDate}
                      onChange={(evt) => {
                        handleChangedStartDate(evt);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4} sx={{ paddingLeft: 3 }}>
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
                        min: threeMonthsAgo,
                        max: new Date(),
                      }}
                      min={threeMonthsAgo}
                      max={new Date()}
                      value={selectedEndDate || formattedEndDate}
                      onChange={(evt) => {
                        handleChangedEndDate(evt);
                      }}
                    />
                  </Grid>
                </Stack>
              </Stack>

              <Stack sx={{ paddingRight: 5, paddingLeft: 5 }}>
                <Stack style={{ flexDirection: 'row' }}>
                  <Stack>
                    <Typography variant="h6" mt={1} mb={1} style={{ textAlign: 'center', color: '#0072BC' }}>
                      {selectedMonth?.month} {selectedMonth?.year}
                    </Typography>
                    <Calendar
                      localizer={localizer}
                      events={events}
                      doShowMoreDrillDown
                      drilldownView="day"
                      popup
                      date={startDate ? new Date(startDate) : new Date(startDateOfMonth)}
                      // date={new Date(startDate) || new Date(startDateOfMonth)}
                      //  date={new Date()}
                      startAccessor="start"
                      endAccessor="end"
                      style={{ height: '63vh', width: 620 }}
                      views={['month']}
                      defaultView="month"
                      eventPropGetter={eventPropGetter}
                      onSelectEvent={handleClickEvent}
                      // components={{
                      //   toolbar:  CustomEvent,
                      //     month: location?.state?.month,
                      // }}
                      components={{
                        toolbar: CustomEvent,
                      }}
                    />
                  </Stack>

                  <Stack ml={4}>
                    <Stack
                      style={{
                        height: '40',
                        width: 340,
                        backgroundColor: 'white',
                        boxShadow: '0px 0px 2px 2px lightgrey',
                        justifyContent: 'center',
                        padding: 5,
                      }}
                      mt={6}
                    >
                      <Typography variant="h6" style={{ fontSize: 15 }}>
                        {moment(selectedUserListData?.date).format('dddd, MMM, DD, YYYY')}
                      </Typography>
                    </Stack>
                    <Stack
                      style={{
                        height: 'auto',
                        width: 340,
                        backgroundColor: 'white',
                        boxShadow: '0px 0px 2px 2px lightgrey',
                        justifyContent: 'center',
                        paddingLeft: 5,
                      }}
                    >
                      <Stack>
                        <Typography style={{ fontSize: 17, color: 'grey' }}>ATS Filled Time:</Typography>
                        <Typography variant="h6" style={{ fontSize: 15 }}>
                          {selectedUserListData?.atsfilledTime ? `${selectedUserListData?.atsfilledTime} Hrs` : '--'}
                        </Typography>
                      </Stack>
                      <Stack mt={2}>
                        <Typography style={{ fontSize: 17, color: 'grey' }}>Status:</Typography>
                        <Typography variant="h6" style={{ fontSize: 15 }}>
                          {/* {selectedUserListData?.status || '--'} */}

                          {selectedUserListData?.status === 'P'
                            ? 'Present'
                            : selectedUserListData?.status === 'PH'
                            ? 'Public Holiday'
                            : selectedUserListData?.status === 'H'
                            ? 'Holiday/Weekend'
                            : selectedUserListData?.status === 'FD'
                            ? 'Full Day Leave'
                            : selectedUserListData?.status === 'HD'
                            ? 'Half Day Leave'
                            : '--'}
                        </Typography>
                      </Stack>
                      <Stack mt={2}>
                        <Typography style={{ fontSize: 17, color: 'grey' }}>Visitor Entry:</Typography>
                        <Typography variant="h6" style={{ fontSize: 15 }}>
                          {selectedUserListData?.visitorEntry ? `${selectedUserListData?.visitorEntry} Hrs` : '--'}
                          {/* {`${selectedUserListData?.visitorEntry} Hrs` || `0:00 Hrs`}  */}
                        </Typography>
                      </Stack>
                    </Stack>
                    <Stack
                      style={{
                        height: 'auto',
                        width: 340,
                        backgroundColor: 'white',
                        boxShadow: '0px 0px 2px 2px lightgrey',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingLeft: 5,
                        paddingRight: 35,
                      }}
                    >
                      <Stack mt={2}>
                        <Typography style={{ fontSize: 17, color: 'grey' }}>Check In:</Typography>
                        <Typography variant="h6" style={{ fontSize: 15, }}>
                          {selectedUserListData?.checkIn || 'No Check In'}
                        </Typography>
                      </Stack>
                      <Stack mt={2}>
                        <Typography style={{ fontSize: 17, color: 'grey' }}>Check Out:</Typography>
                        <Typography variant="h6" style={{ fontSize: 15 }}>
                          {selectedUserListData?.checkOut || 'No Check Out'}
                        </Typography>
                      </Stack>
                    </Stack>
                    <Stack
                      style={{
                        height: 100,
                        width: 340,
                        backgroundColor: 'white',
                        boxShadow: '0px 0px 2px 2px lightgrey',
                        // flexDirection: 'row',
                        // justifyContent: 'space-between',
                        paddingLeft: 5,
                        paddingRight: 5,
                      }}
                    >
                      <Typography variant="h6" style={{ fontSize: 17 }}>
                        Task Description:{' '}
                      </Typography>
                      <Scrollbar>
                        <Typography style={{ textAlign: 'justify', paddingRight: 15 }}>{lines}</Typography>
                      </Scrollbar>
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>

              <Stack sx={{ paddingLeft: 3 }}>
                <Stack
                  ml={2}
                  justifyContent="space-evenly"
                  // justifyContent="space-evenly"
                  // alignItems="center"
                  // justifyContent="space-evenly"
                  // alignItems="center"
                  mt={2}
                  mb={2}
                  sx={{
                    height: 32,
                    backgroundColor: 'lightGrey',
                    borderRadius: '8px',
                    borderWidth: 1,
                    flexDirection: 'row',
                    display: 'flex',
                    //  paddingLeft: 10,
                    width: 620,
                  }}
                >
                  <Stack sx={{ flexDirection: 'row', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Stack sx={{ height: 10, width: 10, borderRadius: 5, backgroundColor: 'black' }} />
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
                    <Stack sx={{ height: 10, width: 10, borderRadius: 5, backgroundColor: 'orange' }} />
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
              </Stack>
            </>
          )}
        </Card>
      </Container>
    </>
  );
}
