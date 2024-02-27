import React, { useState } from 'react';
import styled from 'styled-components';
import { Stack, Typography } from '@mui/material';
import 'react-step-progress-bar/styles.css';
import { ProgressBar, Step } from 'react-step-progress-bar';

export default function CustomProgressBar(props) {
  console.log("props=>", props);
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
    backgroundColor: props.employeeStatus === 'Resigned' ? 'red' : '#12CE2B',
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
    backgroundColor: props.employeeStatus === 'Resigned' ? 'red' : '#12CE2B',
  };

  const UnAccomplishedComponent = (accomplished) => (
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
    </Stack>
  );
  return (
    <>
      <Stack alignItems="center">
        <ProgressBar
          filledBackground="#1E3587"
          percent={props.employeeStatus === 'Active' ? 100 : props.percent}
          height={5}
          width="75%"
        >
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
              </Stack>
            )}
          </Step>
          {props.data.map((status, idx) => (
            <Step>
              {({ accomplished }) => (
                <Stack>
                  <Stack
                    className={`indexedStep ${accomplished ? 'accomplished' : ''}`}
                    style={
                      props.employeeStatus === status && idx === props.data.length - 1
                        ? conditionalOuterStyle
                        : outerStyle
                    }
                    alignItems="center"
                    justifyContent="center"
                  >
                    {accomplished ? (
                      <Stack
                        style={
                          props.employeeStatus === status && idx === props.data.length - 1
                            ? conditionalInnerStyle
                            : innerStyle
                        }
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Stack
                          style={
                            props.employeeStatus === status && idx === props.data.length - 1
                              ? conditionalLastInnerStyle
                              : null
                          }
                          alignItems="center"
                          justifyContent="center"
                        >
                          {accomplished ? <></> : null}
                        </Stack>
                      </Stack>
                    ) : (
                      <UnAccomplishedComponent accomplished />
                    )}
                  </Stack>
                </Stack>
              )}
            </Step>
          ))}
        </ProgressBar>
      </Stack>

      <Stack
        justifyContent="space-between"
        display="flex"
        margin="auto"
        alignItems="flex-start"
        mt={3}
        flexDirection="row"
        width="90%"
      >
        <Stack style={{ width: `${100 / (props.data.length + 1) - 3}%` }}>
          <Typography style={{ fontSize: 12, textAlign: 'center' }}>Generation</Typography>
        </Stack>
        {console.log('props.percent>>>>>>>..', props.percent)}
        {props.data.map((status, idx) => (
          <Stack style={{ width: `${100 / (props.data.length + 1) - 3}%` }}>
            <Typography style={{ fontSize: 12, textAlign: 'center', flexWrap: 'wrap' }}>{status}</Typography>
          </Stack>
        ))}
      </Stack>
    </>
  );
}
