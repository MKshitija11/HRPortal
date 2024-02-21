import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack, Typography, Modal, Grid, Button, Box } from '@mui/material';
import Iconify from '../../../components/iconify/Iconify';

export default function Logout(props) {
  const navigate = useNavigate()
  const [openModal, setOpenModal] = useState(true);
  return (
    <>
      <Stack alignItems="center" justifyContent="center" spacing={5} sx={{ my: 2 }}>
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
            <Stack alignItems="center" justifyContent="center">
              <Iconify icon="material-symbols:check-circle-outline-rounded" height={60} width={60} style={{color:"#07690e"}}/>
            </Stack>
            <Typography id="modal-modal-description" sx={{ mt: 1, textAlign: 'center' }}>
              You have been successfully logged-out from the application
            </Typography>

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
                    setOpenModal(false);
                    navigate('/login', {
                      state: {
                        param: true,
                      },
                    });
                  }}
                  sx={{ mt: 2 }}
                >
                  OK
                </Button>
              </Stack>
            </Grid>
          </Box>
        </Modal>
      </Stack>
    </>
  );
}
