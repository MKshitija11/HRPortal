import { Typography, Stack, Button } from '@mui/material';

export default function HandleApi() {
  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <>
      <Stack sx={{ alignItems: 'center', justifyContent: 'center', mt: 10 }}>
        <img
          src={'/assets/images/covers/FailedApiImage.png'}
          alt="text"
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: '20%',
            width: '20%',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'round',
          }}
        />
        <Typography variant="h4" sx={{ mb: 2 }}>
          Something went wrong!!
        </Typography>
        <Stack direction="row" alignItems="center" justifyContent="center">
          <Button variant="contained" onClick={refreshPage}>
            Retry
          </Button>
        </Stack>
      </Stack>
    </>
  );
}
