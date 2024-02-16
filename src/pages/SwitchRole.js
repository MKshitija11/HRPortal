/* eslint-disable no-plusplus */
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
// @mui
import { Stack, Button, Container, Typography, Modal, Box } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

export default function SwitchRole({ props }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(true);
  const [value, setValue] = useState();
  const [role, setRole] = useState();
  const ROLE = sessionStorage.getItem('ROLE');
  const [userProfileList, setUserProfileList] = useState([]);

  useEffect(() => {
    const USERDETAILS = JSON.parse(sessionStorage.getItem('USERDETAILS'));
    // setRole(USERDETAILS?.[0]?.userProfile);
    setUserProfileList(USERDETAILS);
  }, [role]);

  const handleChange = (event) => {
    console.log('EVENT', event.target.value);
    setValue(event.target.value);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    console.log('HANDLE CLOSE MODAL EVENT', value);
    sessionStorage.setItem('ROLE', value);

    if (value === 'BAGIC_TL') {
      navigate('/EmployeesTL');
    } else if (value === 'BAGIC_SM') {
      navigate('/EmployeesSM');
    }
  };
  return (
    <>
      <Helmet>
        <title> HR Portal | Employee Details (Partner)</title>
      </Helmet>
      <Container>
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
              alignItems: 'center',
              justifyContent: 'center',
            }}
            component="form"
          >
            <Typography style={{ textAlign: 'center', color: 'black' }}>
              <b>Please Select Role</b>{' '}
            </Typography>
            <FormControl
              style={{
                alignItems: 'center',
                alignSelf: 'center',
                justifyContent: 'center',
                width: '100%',
              }}
            >
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={value}
                onChange={handleChange}
                defaultValue={ROLE}
                style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%' }}
              >
                {/* <FormControlLabel value="BAGIC_TL" control={<Radio />} label="Team Lead" />
                <FormControlLabel value="BAGIC_SM" control={<Radio />} label="Senior Manager" /> */}
                {/* {userProfileList.map((item, index) => {

                })} */}
                {userProfileList.map((element) => (
                  <Stack
                    key={element.key}
                    alignItems="center"
                    justifyContent="center"
                    flexDirection="row"
                    style={{ flexDirection: 'row', width: '100%' }}
                  >
                    <FormControlLabel
                      style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}
                      value={element.userProfile}
                      control={<Radio />}
                      label={element.partnerName}
                    />
                  </Stack>
                ))}
              </RadioGroup>
              <>
                <Stack style={{ justifyContent: 'center' }}>
                  <Button
                    style={{ margin: '0 auto', display: 'flex', justifyContent: 'center' }}
                    size="medium"
                    variant="contained"
                    type="button"
                    color="primary"
                    onClick={() => handleCloseModal()}
                    sx={{ mt: 2 }}
                  >
                    OK
                  </Button>
                </Stack>
              </>
            </FormControl>
          </Box>
        </Modal>
      </Container>
    </>
  );
}
