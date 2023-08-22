import { Typography, Box } from '@mui/material';
import { ColorRing, Oval } from 'react-loader-spinner';

export default function Loader() {
  return (
    <>
      <Box style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: "20%" }}>
        <Oval
          height={70}
          width={70}
          color="#0072BC"
          wrapperStyle={{}}
          wrapperClass=""
          ariaLabel="oval-loading"
          secondaryColor="#0072BC"
          strokeWidth={4}
          strokeWidthSecondary={4}
        />
      </Box>
    </>
  );
}
