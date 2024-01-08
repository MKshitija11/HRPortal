import React, { useState } from 'react';
import { Typography, Container, Card, Stack } from '@mui/material';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function EmployeeTimesheetDetails() {
  const [value, onChange] = useState(new Date());
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
          <Stack sx={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Stack sx={{ flexDirection: 'row' }}>
              <Typography variant="h6" sx={{ color: '#0072BC' }}>
                Employee Code:
              </Typography>
              <Typography variant="h6" sx={{ color: '#676767', fontSize: 18 }}>
                PT1058
              </Typography>
            </Stack>

            <Typography variant="h6" sx={{ color: '#676767' }}>
              |
            </Typography>

            <Stack sx={{ flexDirection: 'row' }}>
              <Typography variant="h6" sx={{ color: '#0072BC' }}>
                Employee Name:
              </Typography>
              <Typography variant="h6" sx={{ color: '#676767' }}>
                Test Employee
              </Typography>
            </Stack>
          </Stack>
          <Stack sx={{ padding: 10 }}>
            <Stack
              sx={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                alignItems: 'flex-start',
                margin: '10px 0',
                padding: '10px',
              }}
            >
              <Calendar onChange={onChange} value={value} sx={{ width: 400, height: '40vh' }} />
            </Stack>
          </Stack>
        </Card>
      </Container>
    </>
  );
}
