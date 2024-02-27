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
import { bounce } from 'react-animations';
import 'animate.css';
// import Radium, {StyleRoot} from 'radium';
import { useLocation } from 'react-router-dom';
import Iconify from '../components/iconify';
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
  const [showATSDetails, setShowATSDetails] = useState(false);
  const month = location?.state?.month;
  const startDateOfMonth = moment(month).startOf('month').format('DD-MMM-YYYY').toLowerCase();
  const endDateOfMonth = moment(month).endOf('month').format('DD-MMM-YYYY').toLowerCase();
  const formattedStartDate = moment(startDateOfMonth).format('YYYY-MM-DD');
  const formattedEndDate = moment(endDateOfMonth).format('YYYY-MM-DD');
  const [showTask, setShowTask] = useState(false);
  const [linesData, setLinesData] = useState('');
  const currentDate = moment(new Date()).format('DD-MMM-YYYY').toLowerCase();
  // const [currentUserData, setCurrentUserData] = useState(userListData[userListData.length -1])

  // const taskDescription =
  //   'Application closed as per the channel approval,report generating for prosphet reject and imd expiry ~Imd storing error and\nPayment related link issue.Application closed as per the channel approval,report generating for prosphet reject and imd expiry ~Imd storing error and\nPayment related link issue.Application closed as per the channel approval,report generating for prosphet reject and imd expiry ~Imd storing error and\nPayment related link issue.';

  // const taskDescription = selectedUserListData ? selectedUserListData?.taskDescription : userListData[userListData.length - 1]?.taskDescription

  const currentUserData = userListData[userListData.length - 1];
  const atsPendingDays = userListData.filter((emp) => emp.status === 'NA').map((emp) => emp.date);
  // const atsPendingDays1 = [
  //   '16-JAN-24',
  //   '17-JAN-24',
  //   '18-JAN-24',
  //   '16-JAN-24',
  //   '17-JAN-24',
  //   '18-JAN-24',
  //   '16-JAN-24',
  //   '17-JAN-24',
  //   '18-JAN-24',
  // ];
  // console.log('selectedUserListData', atsPendingDays, moment(atsPendingDays).format('Do '));
  // getShortMessages = (messages) => messages.filter(obj => obj.message.length <= 50).map(obj => obj.message);

  // const lines = taskDescription.split('~').map((line, index) => (
  //   <div key={index} style={{ flexDirection: 'row' }}>
  //     <div>
  //       <Iconify icon="material-symbols:circle" height={10} width={10} />
  //       {line}
  //     </div>

  //     <br />
  //   </div>
  // ));

  const handleTaskDescription = (filteredData) => {
    const checkData = { ...filteredData?.[0] };
    console.log('Check data', checkData);
    setShowTask(true);
    const taskDescription1 =
      'Application closed as per the channel approval,report generating for prosphet reject and imd expiry ~Imd storing error and\nPayment related link issue.Application closed as per the channel approval,report generating for prosphet reject and imd expiry ~Imd storing error and\nPayment related link issue.Application closed as per the channel approval,report generating for prosphet reject and imd expiry ~Imd storing error and\nPayment related link issue.';
    const taskDescription = checkData?.taskDescription ? checkData?.taskDescription : '--';
    const lines = taskDescription.split('~').map((line, index) => (
      // <div key={index}>
      //   {/* <div > */}
      //   {/* <Iconify icon="material-symbols:circle" height={10} width={10} /> */}
      //   <div>{line}</div>
      //   {/* </div> */}
      //   {/* <br /> */}
      // </div>
      // <div key={index}>
      //   <div style={{ flexDirection: 'row' }}>
      //     <Iconify icon="material-symbols:circle" height={10} width={10} />
      //     <Stack style={{ paddingLeft: 5 }} ml={2}>
      //       {' '}
      //       {line}
      //     </Stack>
      //   </div>
      //   {/* <br /> */}
      // </div>
      <div key={index}>
        <span style={{ padding: 2 }}>
          <Iconify icon="material-symbols:circle" height={10} width={10} />
          <span style={{ paddingLeft: 2 }}> {line}</span>
        </span>
      </div>
    ));
    setLinesData(lines);
  };

  const styles = {
    bounce: {
      animationName: bounce,
      animationDuration: '1s',
    },
  };

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
      toDate: param ? endDate : currentDate,
    };

    console.log('REQUEST>>>', selectedUserListData);
    setIsLoading(true);

    return fetch('https://webservices.bajajallianz.com/BagicVisitorAppWs/userTimeSheet', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      // body: atsReq,
      body: JSON.stringify(atsReq),
    }).then((response) =>
      response
        .json()
        .then((data) => {
          const atsRes = data;
          console.log('data$$$$', atsRes);
          if (atsRes?.errorCode === '0') {
            console.log('custom useeffect>>>.', atsRes.userList);
            const list1 = JSON.parse(JSON.stringify(atsRes?.userList));
            const list2 = JSON.parse(JSON.stringify(atsRes?.userList));
            const list3 = JSON.parse(JSON.stringify(atsRes?.userList));
            const list4 = JSON.parse(JSON.stringify(atsRes?.userList));
            const list5 = JSON.parse(JSON.stringify(atsRes?.userList));
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
            console.log('mapped list', atsRes?.stringObject10);
            setSelectedMonth(atsRes?.stringObject10);
            // setUserListData([...list1, ...list2, ...list3, ...list4]);
            setUserListData([...list1]);

            setIsLoading(false);
          }
          return atsRes;
        })
        .catch((err) => {
          console.log(err);
        })
    );
    // Configuration.getTimeSheetDetails(atsReq)
    //   .then((atsRes) => {
    //     if (atsRes?.data?.errorCode === '0') {
    //       console.log('custom useeffect>>>.', atsRes.data.userList);
    //       const list1 = JSON.parse(JSON.stringify(atsRes.data.userList));
    //       const list2 = JSON.parse(JSON.stringify(atsRes.data.userList));
    //       const list3 = JSON.parse(JSON.stringify(atsRes.data.userList));
    //       const list4 = JSON.parse(JSON.stringify(atsRes.data.userList));
    //       const list5 = JSON.parse(JSON.stringify(atsRes.data.userList));
    //       list2.map((item) => {
    //         delete item.status;
    //         return item;
    //       });
    //       list3.map((item) => {
    //         delete item.status;
    //         delete item.atsfilledTime;
    //         return item;
    //       });
    //       list4.map((item) => {
    //         delete item.status;
    //         delete item.atsfilledTime;
    //         delete item.checkIn;
    //         return item;
    //       });
    //       list5.map((item) => {
    //         delete item.status;
    //         delete item.atsfilledTime;
    //         delete item.checkOut;
    //         return item;
    //       });
    //       console.log('mapped list', atsRes.data?.stringObject10);
    //       setSelectedMonth(atsRes.data?.stringObject10);
    //       // setUserListData([...list1, ...list2, ...list3, ...list4]);
    //       setUserListData([...list1]);

    //       setIsLoading(false);
    //     }
    //   })
    //   .catch((error) => console.log('error', error));
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
                ? 'blue'
                : data.status === 'P'
                ? '#228B22'
                : data.status === 'FD'
                ? '#FF9B00'
                : data.status === 'HD'
                ? '#CECE00'
                : data.status === 'H'
                ? 'Grey'
                : data.status === 'NA'
                ? 'red'
                : data.atsfilledTime
                ? 'lightgreen'
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
    setShowATSDetails(false);
    setTimeout(() => {
      setShowATSDetails(true);
    }, 200);
    const filteredData = userListData.filter((data) => data.date === evt.start);
    console.log('handled clikced event filteredData', filteredData?.[0]);
    setSelectedUserListData({ ...filteredData?.[0] });
    console.log('handled clikced event>>>>', userListData);
    handleTaskDescription(filteredData);
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
              <Stack
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingTop: 3,
                  paddingLeft: 1.5,
                  paddingRight: 5,
                }}
                // ml={1}
              >
                <Stack sx={{ flexDirection: 'row' }}>
                  <Typography variant="h6" sx={{ color: '#0072BC' }}>
                    Employee Name:
                  </Typography>
                  <Typography variant="h6" ml={1}>
                    {location.state.user.employeeName}
                  </Typography>
                </Stack>
                {/* <Stack>
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
                </Stack> */}
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

              {/* <Stack sx={{ paddingRight: 5, paddingLeft: 5 }}>
                <Stack style={{ flexDirection: 'row' }}>
                  <Stack>
                    <Stack mt={2} style={{ width: '45vw', flexDirection: 'row', justifyContent: 'space-between' }}>
                      <Typography variant="h6" mt={1} mb={1} style={{ textAlign: 'center', color: '#0072BC' }}>
                        {selectedMonth?.month} {selectedMonth?.year}
                      </Typography>
                      <Stack mb={2}>
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
                      style={{
                        height: '70vh',
                        // width: showATSDetails ? 620 : '60vw',
                        width: '45vw',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
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
                </Stack>
                <Stack >
                  <Stack
                    // ml={2}
                    justifyContent="space-evenly"
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
                      width: '45vw',
                    }}
                  >
                    <Stack
                      sx={{ flexDirection: 'row', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    >
                      <Stack sx={{ height: 10, width: 10, borderRadius: 5, backgroundColor: 'blue' }} />
                      <Typography ml={1} sx={{ fontWeight: '500' }}>
                        Public Holiday
                      </Typography>
                    </Stack>
                    <Stack
                      sx={{ flexDirection: 'row', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    >
                      <Stack sx={{ height: 10, width: 10, borderRadius: 5, backgroundColor: 'red' }} />
                      <Typography ml={1} sx={{ fontWeight: '500' }}>
                        Full Day Leave
                      </Typography>
                    </Stack>
                    <Stack
                      sx={{ flexDirection: 'row', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    >
                      <Stack sx={{ height: 10, width: 10, borderRadius: 5, backgroundColor: 'orange' }} />
                      <Typography ml={1} sx={{ fontWeight: '500' }}>
                        Half Day Leave
                      </Typography>
                    </Stack>
                    <Stack
                      sx={{ flexDirection: 'row', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    >
                      <Stack sx={{ height: 10, width: 10, borderRadius: 5, backgroundColor: '#228B22' }} />
                      <Typography ml={1} sx={{ fontWeight: '500' }}>
                        Present
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </Stack> */}

              <Stack>
                <Stack mb={2} flexDirection="row" justifyContent="space-around">
                  <Stack>
                    <Stack mt={2} style={{ width: '45vw', flexDirection: 'row', justifyContent: 'space-between' }}>
                      <Typography variant="h6" mt={1} mb={1} style={{ textAlign: 'center', color: '#0072BC' }}>
                        {selectedMonth?.month} {selectedMonth?.year}
                      </Typography>
                      <Stack mb={2}>
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
                      style={{
                        height: '70vh',
                        // width: showATSDetails ? 620 : '60vw',
                        width: '45vw',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
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

                    <Stack>
                      <Stack
                        // justifyContent="space-evenly"
                        mt={2}
                        mb={2}
                        sx={{
                          height: 100,
                          backgroundColor: 'lightGrey',
                          borderRadius: '8px',
                          borderWidth: 1,
                          flexDirection: 'row',
                          display: 'flex',
                          width: '45vw',
                        }}
                      >
                        {/* <Stack
                          sx={{ flexDirection: 'row', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                        >
                          <Stack sx={{ height: 10, width: 10, borderRadius: 5, backgroundColor: 'blue' }} />
                          <Typography ml={1} sx={{ fontWeight: '500' }}>
                            Public Holiday
                          </Typography>
                        </Stack>
                        <Stack
                          sx={{ flexDirection: 'row', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                        >
                          <Stack sx={{ height: 10, width: 10, borderRadius: 5, backgroundColor: 'red' }} />
                          <Typography ml={1} sx={{ fontWeight: '500' }}>
                            Full Day Leave
                          </Typography>
                        </Stack>
                        <Stack
                          sx={{ flexDirection: 'row', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                        >
                          <Stack sx={{ height: 10, width: 10, borderRadius: 5, backgroundColor: 'orange' }} />
                          <Typography ml={1} sx={{ fontWeight: '500' }}>
                            Half Day Leave
                          </Typography>
                        </Stack>
                        <Stack
                          sx={{ flexDirection: 'row', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                        >
                          <Stack sx={{ height: 10, width: 10, borderRadius: 5, backgroundColor: '#228B22' }} />
                          <Typography ml={1} sx={{ fontWeight: '500' }}>
                            Present
                          </Typography>
                        </Stack> */}
                        <Stack
                          style={{ width: '45vw' }}
                          flexDirection="row"
                          alignItems="center"
                          justifyContent="space-around"
                          ml={5}
                          mr={5}
                        >
                          <Stack>
                            <Stack
                              sx={{
                                flexDirection: 'row',
                                display: 'flex',
                                // justifyContent: 'center',
                                alignItems: 'center',
                              }}
                            >
                              <Stack sx={{ height: 10, width: 10, borderRadius: 5, backgroundColor: '#228B22' }} />
                              <Typography ml={1} sx={{ fontWeight: '500' }}>
                                Present
                              </Typography>
                            </Stack>

                            <Stack
                              sx={{
                                flexDirection: 'row',
                                display: 'flex',
                                // justifyContent: 'center',
                                alignItems: 'center',
                              }}
                            >
                              <Stack sx={{ height: 10, width: 10, borderRadius: 5, backgroundColor: '#FF9B00' }} />
                              <Typography ml={1} sx={{ fontWeight: '500' }}>
                                Full Day Leave
                              </Typography>
                            </Stack>
                            <Stack
                              sx={{
                                flexDirection: 'row',
                                display: 'flex',
                                // justifyContent: 'center',
                                alignItems: 'center',
                              }}
                            >
                              <Stack sx={{ height: 10, width: 10, borderRadius: 5, backgroundColor: '#CECE00' }} />
                              <Typography ml={1} sx={{ fontWeight: '500' }}>
                                Half Day Leave
                              </Typography>
                            </Stack>
                          </Stack>

                          <Stack>
                            <Stack
                              sx={{
                                flexDirection: 'row',
                                display: 'flex',
                                // justifyContent: 'center',
                                alignItems: 'center',
                              }}
                            >
                              <Stack sx={{ height: 10, width: 10, borderRadius: 5, backgroundColor: 'red' }} />
                              <Typography ml={1} sx={{ fontWeight: '500' }}>
                                Ats Not filled Days
                              </Typography>
                            </Stack>
                            <Stack
                              sx={{
                                flexDirection: 'row',
                                display: 'flex',
                                // justifyContent: 'center',
                                alignItems: 'center',
                              }}
                            >
                              <Stack sx={{ height: 10, width: 10, borderRadius: 5, backgroundColor: 'blue' }} />
                              <Typography ml={1} sx={{ fontWeight: '500' }}>
                                Public Holiday
                              </Typography>
                            </Stack>
                            <Stack
                              sx={{
                                flexDirection: 'row',
                                display: 'flex',
                                // justifyContent: 'center',
                                alignItems: 'center',
                              }}
                            >
                              <Stack sx={{ height: 10, width: 10, borderRadius: 5, backgroundColor: 'Grey' }} />
                              <Typography ml={1} sx={{ fontWeight: '500' }}>
                                Weekend
                              </Typography>
                            </Stack>
                            {/* <Stack
                              sx={{
                                flexDirection: 'row',
                                display: 'flex',
                                // justifyContent: 'center',
                                alignItems: 'center',
                              }}
                            >
                              <Stack sx={{ height: 10, width: 10, borderRadius: 5, backgroundColor: 'red' }} />
                              <Typography ml={1} sx={{ fontWeight: '500' }}>
                                Future Dated
                              </Typography>
                            </Stack> */}
                          </Stack>
                        </Stack>
                      </Stack>
                    </Stack>
                  </Stack>

                  <Stack mb={5} mt={-3}>
                    <Stack
                      ml={2}
                      style={{
                        height: 80,
                        width: 320,
                        // justifyContent: 'center',
                        // paddingLeft: 5,
                        // paddingRight: 5,
                        backgroundColor: 'white',
                        boxShadow: '0px 0px 0.75px 0.75px #E5E4E2',
                        borderRadius: '10px',
                      }}
                    >
                      <div className="animate__animated animate__slideInDown">
                        <Stack
                          style={{
                            height: 40,
                            width: '100%',
                            justifyContent: 'center',
                            padding: 2,
                            backgroundColor: '#F7FAF4',
                            // backgroundColor: 'red',
                            borderTopLeftRadius: '10px',
                            borderTopRightRadius: '10px',
                          }}
                        >
                          <Stack>
                            <Stack flexDirection="row" alignItems="center" mt={5} justifyContent="space-between">
                              <Stack flexDirection="row" alignItems="center">
                                <img
                                  src={'/assets/images/covers/TimesheetCalendar/pendingDays.png'}
                                  alt="BajajLogo"
                                  style={{
                                    height: 40,
                                    width: 40,
                                  }}
                                />

                                <Typography variant="h6" style={{ fontSize: 15 }}>
                                  ATS Pending :
                                </Typography>
                              </Stack>
                              <div className="animate__animated animate__slideInDown">
                                <Stack mr={4}>
                                  <Typography variant="h6" style={{ fontSize: 15 }}>
                                    {/* {selectedUserListData?.atsfilledTime
                                      ? `${selectedUserListData?.atsfilledTime} Hrs`
                                      : '--'} */}
                                      {atsPendingDays.length === 1 ? '1 day' : `${atsPendingDays.length} Days`}
                                  </Typography>
                                </Stack>
                              </div>
                            </Stack>
                            <Stack style={{}}>
                              <div className="animate__animated animate__slideInDown">
                                <Stack
                                  spacing={2}
                                  style={{
                                    flexWrap: 'wrap',
                                    flexDirection: 'row',
                                    display: 'flex',
                                    // backgroundColor: 'yellow',
                                    justifyContent: 'space-evenly',
                                    overflow: 'scroll',
                                    overflowX: 'hidden',
                                    height: 30,
                                  }}
                                >
                                  {atsPendingDays.length === 0 ? (
                                    <Stack>
                                      <Typography
                                        variant="h6"
                                        style={{
                                          fontSize: 12,
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                          color: 'red',
                                          display: 'flex',
                                          textAlign: ' center',
                                        }}
                                      >
                                        No Pending Days found
                                      </Typography>
                                    </Stack>
                                  ) : (
                                    <>
                                      {atsPendingDays.map((data, index) => (
                                        <Stack
                                          key={index}
                                          style={{
                                            display: 'flex',
                                            margin: 0,
                                            flexBasis: '20%',
                                            marginBottom: 4,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                          }}
                                        >
                                          <Typography
                                            variant="h6"
                                            style={{
                                              fontSize: 12,
                                              alignItems: 'center',
                                              justifyContent: 'center',
                                              color: 'red',
                                              display: 'flex',
                                              textAlign: ' center',
                                              height: 30,
                                              width: 30,
                                              padding: 1,
                                              borderRadius: 15,
                                              backgroundColor: '#F7FAF4',
                                            }}
                                          >
                                            {moment(data).format('Do')}
                                          </Typography>
                                        </Stack>
                                      ))}
                                    </>
                                  )}
                                </Stack>
                              </div>
                            </Stack>
                          </Stack>
                        </Stack>
                      </div>
                    </Stack>

                    <Stack ml={2} mt={1.5}>
                      <Stack
                        style={{
                          height: 500,
                          width: 320,
                          justifyContent: 'center',
                          paddingLeft: 5,
                          paddingRight: 5,
                          backgroundColor: 'white',
                          boxShadow: '0px 0px 0.75px 0.75px #E5E4E2',
                          borderRadius: '10px',
                        }}
                      >
                        {/* ---------------------------first----------------------------- */}
                        <div className="animate__animated animate__slideInDown">
                          <Stack>
                            <Stack flexDirection="row" alignItems="center" justifyContent="space-between">
                              <Stack flexDirection="row" alignItems="center">
                                <img
                                  src={'/assets/images/covers/TimesheetCalendar/date.png'}
                                  alt="BajajLogo"
                                  style={{
                                    height: 40,
                                    width: 40,
                                  }}
                                />
                                <Typography variant="h6" style={{ fontSize: 15 }}>
                                  {moment(selectedUserListData?.date).format('MMM, DD, YYYY')}
                                </Typography>
                              </Stack>
                              <Stack mr={4}>
                                <Typography
                                  variant="h6"
                                  style={{
                                    fontSize: 15,
                                    color:
                                      selectedUserListData?.status === 'P'
                                        ? '#228B22'
                                        : selectedUserListData?.status === 'FD'
                                        ? '#FF9B00'
                                        : selectedUserListData?.status === 'HD'
                                        ? '#CECE00'
                                        : selectedUserListData?.status === 'PH'
                                        ? 'blue'
                                        : selectedUserListData?.status === 'H'
                                        ? 'Grey'
                                        : selectedUserListData?.status === 'NA'
                                        ? 'red'
                                        : 'black',
                                  }}
                                >
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
                                    : selectedUserListData?.status === 'NA'
                                    ? '--'
                                    : '--'}
                                </Typography>
                              </Stack>
                            </Stack>

                            <Stack
                              style={{
                                borderTop: '2px solid',
                                width: '100%',
                                color: '#00000029',
                              }}
                            >
                              <hr />
                            </Stack>
                          </Stack>
                        </div>
                        {/* ---------------------------second----------------------------- */}
                        <div className="animate__animated animate__slideInDown">
                          <Stack
                            style={{
                              height: 40,
                              width: '100%',
                              justifyContent: 'center',

                              backgroundColor: '#F7FAF4',
                              borderRadius: '10px',
                            }}
                          >
                            {' '}
                            {/* <div className="animate__animated animate__slideInDown"> */}
                            <Stack flexDirection="row" alignItems="center" justifyContent="space-between">
                              <Stack flexDirection="row" alignItems="center">
                                <img
                                  src={'/assets/images/covers/TimesheetCalendar/atsFilled.svg'}
                                  alt="BajajLogo"
                                  style={{
                                    height: 40,
                                    width: 40,
                                  }}
                                />

                                <Typography variant="h6" style={{ fontSize: 15 }}>
                                  ATS Filled Hrs:
                                </Typography>
                              </Stack>
                              <div className="animate__animated animate__slideInDown">
                                <Stack mr={4}>
                                  <Typography variant="h6" style={{ fontSize: 15 }}>
                                    {selectedUserListData?.atsfilledTime
                                      ? `${selectedUserListData?.atsfilledTime} Hrs`
                                      : '--'}
                                  </Typography>
                                </Stack>
                              </div>
                            </Stack>
                            {/* </div> */}
                          </Stack>
                        </div>
                        {/* -------------------------------third------------------------------ */}

                        {/* <Stack
                        mt={2}
                        style={{
                          height: 40,
                          width: '100%',
                          justifyContent: 'center',

                          backgroundColor: '#F0FAFB',
                          borderRadius: '10px',
                        }}
                      >
                        <Stack flexDirection="row" alignItems="center" justifyContent="space-between">
                          <Stack flexDirection="row" alignItems="center">
                            <img
                              src={'/assets/images/covers/TimesheetCalendar/VisitorEntry.png'}
                              alt="BajajLogo"
                              style={{
                                height: 40,
                                width: 40,
                              }}
                            />
                            <Typography variant="h6" style={{ fontSize: 15 }}>
                              Ats Filled Hrs:{' '}
                            </Typography>
                          </Stack>
                          <Stack mr={4}>
                            <Typography variant="h6" style={{ fontSize: 15 }}>
                              {selectedUserListData?.visitorEntry ? `${selectedUserListData?.visitorEntry} Hrs` : '--'}
                            </Typography>
                          </Stack>
                        </Stack>
                      </Stack> */}
                        {/* -------------------------------forth------------------------------ */}
                        <Stack
                          mt={2}
                          style={{
                            height: 'auto',
                            width: '100%',
                            justifyContent: 'center',
                            backgroundColor: '#FBF4FC',
                            borderRadius: '10px',
                          }}
                        >
                          <Stack
                            flexDirection="row"
                            alignItems="center"
                            justifyContent="center"
                            style={{ position: 'relative' }}
                          >
                            <Stack mt={2} mb={2} flexDirection="row" alignItems="center" justifyContent="center">
                              <img
                                src={'/assets/images/covers/TimesheetCalendar/CheckInOut.png'}
                                alt="BajajLogo"
                                style={{
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  height: '100%',
                                  width: '100%',
                                }}
                              />

                              <Stack
                                style={{
                                  position: 'absolute',
                                  top: '15%',
                                  left: '30%',
                                  transform: 'translate(-50%, -50%)',
                                }}
                              >
                                <div className="animate__animated animate__bounceInLeft">
                                  <Typography variant="h6" style={{ fontSize: 15, color: 'green' }}>
                                    {selectedUserListData?.checkIn ? selectedUserListData?.checkIn : 'No Check In'}
                                  </Typography>
                                </div>
                              </Stack>

                              <Stack
                                style={{
                                  position: 'absolute',
                                  top: '50%',
                                  left: '50%',
                                  transform: 'translate(-50%, -50%)',
                                  backgroundColor: 'white',
                                  paddingLeft: 4,
                                  paddingRight: 4,
                                  border: `2px solid #1789FC`,
                                  borderRadius: '8px',
                                }}
                              >
                                <div className="animate__animated animate__slideInDown">
                                  <Typography variant="h6" style={{ fontSize: 15, textAlign: 'center' }}>
                                    {selectedUserListData?.visitorEntry
                                      ? `${selectedUserListData?.visitorEntry} Hrs`
                                      : '--'}
                                  </Typography>
                                </div>
                              </Stack>
                              <Stack
                                style={{
                                  position: 'absolute',
                                  top: '87%',
                                  left: '68%',
                                  transform: 'translate(-50%, -50%)',
                                }}
                              >
                                <div className="animate__animated animate__bounceInRight">
                                  <Typography variant="h6" style={{ fontSize: 15, color: 'red' }}>
                                    {selectedUserListData?.checkOut || 'No Check Out'}
                                  </Typography>
                                </div>
                              </Stack>
                              {/* <Typography variant="h6" style={{ fontSize: 15 }}>
                              Ats Filled Hrs:{' '}
                            </Typography> */}
                            </Stack>
                            {/* <Stack mr={4}>
                            <Typography variant="h6" style={{ fontSize: 15 }}>
                              {selectedUserListData?.visitorEntry ? `${selectedUserListData?.visitorEntry} Hrs` : '--'}
                            </Typography>
                          </Stack> */}
                          </Stack>
                        </Stack>

                        {/* {showTask ? ( */}
                        <div className="animate__animated animate__slideInDown">
                          <Stack
                            mt={2}
                            style={{
                              height: 175,
                              width: '100%',
                              justifyContent: 'center',
                              backgroundColor: '#F7FAF4',
                              borderRadius: '10px',
                            }}
                          >
                            <Typography variant="h6" style={{ fontSize: 17 }}>
                              Task Description:{' '}
                            </Typography>
                            {console.log('lines', linesData)}
                            <Scrollbar>
                              <Typography style={{ textAlign: 'justify', marginLeft: '3px', marginRight: '3px' }}>
                                {linesData}
                              </Typography>
                            </Scrollbar>
                          </Stack>
                        </div>
                        {/* ) : null} */}
                      </Stack>
                    </Stack>
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
