import React, { useEffect, useState } from 'react';
import { Typography, Container, Card, Stack } from '@mui/material';
// import Calendar from 'react-calendar';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-calendar/dist/Calendar.css';
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
  console.log('LOCATION..........', location.state.user);

  // function formatDate(inputDate) {
  //   const date = new Date(inputDate);
  //   const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  //   const day = date.getDate();
  //   const monthIndex = date.getMonth();
  //   const year = date.getFullYear();
  //   const formattedDate = `${day}-${monthNames[monthIndex].toLowerCase()}-${year}`;
  //   return formattedDate;
  // }

  // const inputDateString = 'Thu Jan 04 2024 00:00:00 GMT+0530 (India Standard Time)';
  // const formattedDateString = formatDate(inputDateString);
  // console.log('FS>>>>', formattedDateString);

  useEffect(() => {
    setIsLoading(true);
    const atsReq = {
      userName: location.state.user.username,
      fromDate: '01-dec-2023',
      toDate: '10-jan-2024',
    };
    Configuration.getTimeSheetDetails(atsReq)
      .then((atsRes) => {
        console.log('custom useeffect>>>.', atsRes.data.userList);
        const list1 = JSON.parse(JSON.stringify(atsRes.data.userList));
        const list2 = JSON.parse(JSON.stringify(atsRes.data.userList));
        const list3 = JSON.parse(JSON.stringify(atsRes.data.userList));
        list2.map((item) => {
          delete item.status;
          return item;
        });
        list3.map((item) => {
          delete item.status;
          delete item.atsfilledTime;
          return item;
        });
        console.log('mapped list', list1, list2, atsRes.data.userList);
        setUserListData([...list1, ...list2, ...list3]);
        setIsLoading(false);
      })
      .catch((error) => console.log('error', error));
  }, [location.state.user.username]);

  const localizer = momentLocalizer(moment);

  const events = userListData.map((data, index) => {
    console.log('data===>', data);
    return {
      // title: data.status
      //   ? `Status: ${data.status}`
      //   : data.atsfilledTime
      //   ? `ATS Entry: ${data.atsfilledTime}`
      //   : `Vistor Entry: ${data.visitorEntry}`,

      title: (
        <span>
          <span
            style={{
              height: data.status ? 10 : 20,

              width: 10,
              borderRadius: '50%',
              display: 'flex',
              background:
                data.status === 'PH'
                  ? 'orange'
                  : data.status === 'P'
                  ? 'green'
                  : data.status === 'FD'
                  ? 'red'
                  : data.status === 'HD'
                  ? '#d32f2f'
                  : data.atsfilledTime ? 'blue' : data.visitorEntry ? 'blue' : null,
            }}
          >
            <input style={{borderWidth: 0}} type={data.status ? "hidden" : null} value={data.status ? '' : data.atsfilledTime ? `ATS : ${data.atsfilledTime}` : data.visitorEntry ? `Vistior: ${data.visitorEntry}` : null} />
            {/* <input */}
            {/* <span>{data.atsfilledTime ? '' : null}</span>
        <span>{data.visitorEntry ? '' : null}</span> */}
            {/* <span></span> */}
          </span>
          {/* <span   style={{
              height: 10,

              // width: 10,
           
              // display: 'flex',
              background: 'blue'
              
            }}>
              <input value={data.atsfilledTime}/>
          </span> */}
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
      // backgroundColor:
      //   event.title === 'Status: PH'
      //     ? 'orange'
      //     : event.title === 'Status: P'
      //     ? 'green'
      //     : event.title === 'Status: H'
      //     ? 'grey'
      //     : event.title === 'Status: FD'
      //     ? 'red'
      //     : event.title === 'Status: HD'
      //     ? 'red'
      //     : null,
    };
    return {
      style,
    };
  };
  console.log('user list data', userListData);
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
