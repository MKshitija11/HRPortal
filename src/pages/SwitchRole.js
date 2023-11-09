/* eslint-disable no-plusplus */
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
// @mui
import {
  TextField,
  Grid,
  Card,
  Stack,
  Button,
  Container,
  Typography,
  MenuItem,
  InputLabel,
  Select,
  Switch,
  Modal,
  Box,
} from '@mui/material';
import FormHelperText from '@mui/material/FormHelperText';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';
import addMonths from 'date-fns/addMonths';
import format from 'date-fns/format';
// components
import Loader from '../components/Loader/Loader';
import Iconify from '../components/iconify';
import Configuration from '../utils/Configuration';

export default function SwitchRole({ props }) {
  const location = useLocation();
  const [openModal, setOpenModal] = useState(true);
  const [value, setValue] = useState();

  const handleChange = (event) => {
    console.log('EVENT', event.target.value);
    setValue(event.target.value);
    // sessionStorage.setItem('ROLE', event.target.value);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    console.log('HANDLE CLOSE MODAL EVENT', value);
    sessionStorage.setItem('ROLE', value);
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
            }}
            component="form"
          >
            <Typography style={{ textAlign: 'center' }}>Please Select Role </Typography>
            <FormControl>
              <FormLabel id="demo-controlled-radio-buttons-group">Gender</FormLabel>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={value}
                onChange={handleChange}
              >
                <FormControlLabel value="BAGIC_TL" control={<Radio />} label="Team Lead" />
                <FormControlLabel value="BAGIC_SM" control={<Radio />} label="Senior Manager" />
              </RadioGroup>
              <>
                <Stack justifyContent="center">
                  <Button
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
