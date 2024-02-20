import React, { useState } from 'react';
import styled from 'styled-components';
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
  // Step,
  StepLabel,
  // StepsLabelContainer,
  // StepStyle,
  // StepWrapper,
  // StepCount,
} from '@mui/material';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
// import Step from '@mui/material/Step';
// import StepLabel from '@mui/material/StepLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';

import 'react-step-progress-bar/styles.css';
import { ProgressBar, Step } from 'react-step-progress-bar';
import Iconify from '../components/iconify';

export default function CustomProgressBar(props) {
  console.log('log>>>>>>', props);
  const [checked, setChecked] = useState(false);
  const [checkPercent, setCheckedPercent] = useState();
  const labelStyle = {
    height: 20,
    width: 'auto',
    padding: 2,
    backgroundColor: 'lightgrey',
    border: '1px transparent',
    borderRadius: '5px',
  };

  const ActiveConditionalLabel = {
    height: 20,
    width: 'auto',
    padding: 2,
    backgroundColor: 'green',
    border: '1px transparent',
    borderRadius: '5px',
  };

  const PendingLabel = {
    height: 20,
    width: 'auto',
    padding: 2,
    backgroundColor: '#FFD580',
    border: '1px transparent',
    borderRadius: '5px',
  };

  const labelText = {
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 14,
    fontWeight: '600',
  };

  const ActiveLabel = {
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
  };

  const handleCheck = (index) => {};

  console.log('checked index', props.percent);
  const steps = ['Generation', 'Pending with TL', 'Pending with SM', 'Pending with IT Spoc', 'Active'];
  console.log('checkPercent', checkPercent);

  const outerStyle = {
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: '#12CE2B',
  };

  const innerStyle = {
    height: 14,
    width: 14,
    borderRadius: 7,
    backgroundColor: 'white',
  };

  const conditionalOuterStyle = {
    height: 34,
    width: 34,
    borderRadius: 17,
    backgroundColor: '#12CE2B',
  };

  const conditionalInnerStyle = {
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: 'white',
  };

  const conditionalLastInnerStyle = {
    height: 26,
    width: 26,
    borderRadius: 13,
    backgroundColor: '#12CE2B',
  };

  const UnAccomplishedComponent = (accomplished) => {
    return (
      <Stack
        style={{ height: 30, width: 30, borderRadius: 15, backgroundColor: 'grey' }}
        alignItems="center"
        justifyContent="center"
      >
        <Stack
          style={{ height: 14, width: 14, borderRadius: 7, backgroundColor: 'lightgrey' }}
          alignItems="center"
          justifyContent="center"
        />

        {/* </Stack> */}
      </Stack>
    );
  };
  return (
    <>
      <Stack alignItems="center" >
        <ProgressBar filledBackground="#1E3587"  percent={props.employeeStatus === 'Active' ? 100 : props.percent} height={5} width="75%">
          {/* <Stack mt={2}> */}
          {/* -------------------------------Generation ------------------------------------- */}
          <Step>
            {({ accomplished, index }) => (
              <Stack>
                <Stack
                  className={`indexedStep ${accomplished ? 'accomplished' : ''}`}
                  style={props.percent === 0 ? conditionalOuterStyle : outerStyle}
                  alignItems="center"
                  justifyContent="center"
                >
                  {accomplished ? (
                    <Stack
                      style={props.percent === 0 ? conditionalInnerStyle : innerStyle}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Stack
                        style={props.percent === 0 ? conditionalLastInnerStyle : null}
                        alignItems="center"
                        justifyContent="center"
                      >
                        {accomplished ? (
                          <>{/* <Iconify icon="material-symbols:check" color="black" width={20} height={20} /> */}</>
                        ) : null}
                      </Stack>
                    </Stack>
                  ) : (
                    <UnAccomplishedComponent accomplished />
                  )}
                </Stack>
                {/* <Stack><Typography><Typography style={{ fontSize: 12 }}>Generation</Typography> </Typography></Stack> */}
              </Stack>
            )}
          </Step>
          {/* -------------------------------TL ------------------------------------- */}
          <Step>
            {({ accomplished, index }) => (
              <Stack>
                <Stack
                  className={`indexedStep ${accomplished ? 'accomplished' : ''}`}
                  style={props.percent === 25 ? conditionalOuterStyle : outerStyle}
                  alignItems="center"
                  justifyContent="center"
                >
                  {accomplished ? (
                    <Stack
                      style={props.percent === 25 ? conditionalInnerStyle : innerStyle}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Stack
                        style={props.percent === 25 ? conditionalLastInnerStyle : null}
                        alignItems="center"
                        justifyContent="center"
                      >
                        {accomplished ? (
                          <>{/* <Iconify icon="material-symbols:check" color="black" width={20} height={20} /> */}</>
                        ) : null}
                      </Stack>
                    </Stack>
                  ) : (
                    <UnAccomplishedComponent accomplished />
                  )}
                </Stack>

                {/* <Stack>
                <Typography style={{ fontSize: 12 }}>Pending with TL</Typography>
              </Stack> */}
              </Stack>
            )}
          </Step>
          {/* -------------------------------SM------------------------------------- */}
          <Step>
            {({ accomplished, index }) => (
              <Stack>
                <Stack
                  className={`indexedStep ${accomplished ? 'accomplished' : ''}`}
                  style={props.percent === 50 ? conditionalOuterStyle : outerStyle}
                  alignItems="center"
                  justifyContent="center"
                >
                  {accomplished ? (
                    <Stack
                      style={props.percent === 50 ? conditionalInnerStyle : innerStyle}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Stack
                        style={props.percent === 50 ? conditionalLastInnerStyle : null}
                        alignItems="center"
                        justifyContent="center"
                      >
                        {accomplished ? (
                          <>{/* <Iconify icon="material-symbols:check" color="black" width={20} height={20} /> */}</>
                        ) : null}
                      </Stack>
                    </Stack>
                  ) : (
                    <UnAccomplishedComponent accomplished />
                  )}
                </Stack>
                {/* <Stack>
                <Typography style={{ fontSize: 12 }}>Pending with SM</Typography>
              </Stack> */}
              </Stack>
            )}
          </Step>
          {/* -------------------------------IT SPOC ------------------------------------- */}
          <Step>
            {({ accomplished, index }) => (
              <Stack>
                <Stack
                  className={`indexedStep ${accomplished ? 'accomplished' : ''}`}
                  style={props.percent === 75 ? conditionalOuterStyle : outerStyle}
                  alignItems="center"
                  justifyContent="center"
                >
                  {accomplished ? (
                    <Stack
                      style={props.percent === 75 ? conditionalInnerStyle : innerStyle}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Stack
                        style={props.percent === 75 ? conditionalLastInnerStyle : null}
                        alignItems="center"
                        justifyContent="center"
                      >
                        {accomplished ? (
                          <>{/* <Iconify icon="material-symbols:check" color="black" width={20} height={20} /> */}</>
                        ) : null}
                      </Stack>
                    </Stack>
                  ) : (
                    <UnAccomplishedComponent accomplished />
                  )}
                </Stack>
                {/* <Stack>
                <Typography style={{ fontSize: 12 }}>Pending with IT Spoc</Typography>
              </Stack> */}
              </Stack>
            )}
          </Step>
          {/* -------------------------------ACTIVE------------------------------------- */}
          <Step>
            {({ accomplished, index }) => (
              <Stack>
                <Stack
                  className={`indexedStep ${accomplished ? 'accomplished' : ''}`}
                  style={props.percent === 100 ? conditionalOuterStyle : outerStyle}
                  alignItems="center"
                  justifyContent="center"
                >
                  {accomplished ? (
                    <Stack
                      style={props.percent === 100 ? conditionalInnerStyle : innerStyle}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Stack
                        style={props.percent === 100 ? conditionalLastInnerStyle : null}
                        alignItems="center"
                        justifyContent="center"
                      >
                        {accomplished ? (
                          <>{/* <Iconify icon="material-symbols:check" color="black" width={20} height={20} /> */}</>
                        ) : null}
                      </Stack>
                    </Stack>
                  ) : (
                    <UnAccomplishedComponent accomplished />
                    // <Stack
                    //   style={{ height: 30, width: 30, borderRadius: 15, backgroundColor: 'grey' }}
                    //   alignItems="center"
                    //   justifyContent="center"
                    // >
                    //   <Stack
                    //     style={{ height: 20, width: 20, borderRadius: 10, backgroundColor: 'lightgrey' }}
                    //     alignItems="center"
                    //     justifyContent="center"
                    //   >
                    //     {accomplished ? (
                    //       <>{/* <Iconify icon="material-symbols:check" color="black" width={20} height={20} /> */}</>
                    //     ) : null}
                    //   </Stack>
                    // </Stack>
                  )}
                </Stack>
                {/* <Stack>
                <Typography style={{ fontSize: 12 }}>Active</Typography>
              </Stack> */}
              </Stack>
            )}
          </Step>
          {/* </Stack> */}
        </ProgressBar>
      </Stack>

      <Stack justifyContent="space-evenly" display="flex" alignItems="center" mt={3} flexDirection="row" width="100%">
        <Stack>
          <Typography style={{ fontSize: 12 }}>Generation</Typography>
        </Stack>
        <Stack>
          <Typography style={{ fontSize: 12 }}>Pending with TL</Typography>
        </Stack>
        <Stack>
          <Typography style={{ fontSize: 12 }}>Pending with SM</Typography>
        </Stack>
        <Stack>
          <Typography style={{ fontSize: 12 }}>Pending with IT Spoc</Typography>
        </Stack>
        <Stack>
          <Typography style={{ fontSize: 12 }}>Active</Typography>
        </Stack>
      </Stack>
    </>
  );
}
