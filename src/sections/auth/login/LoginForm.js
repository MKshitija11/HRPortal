import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// @mui
import {
  Stack,
  IconButton,
  InputAdornment,
  TextField,
  Alert,
  Collapse,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import Configuration from "../../../utils/Configuration";

import Iconify from "../../../components/iconify";

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [userName, setUsername] = useState("");
  const [passWord, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    sessionStorage.clear();
    console.log("Session Cleared!");
  }, []);

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleClick = () => {
    const loginRequest = {
      username: userName,
      password: passWord,
    };

    if (userName === "") {
      setErrorMessage("Please enter username!");
      setOpen(true);
    } else if (passWord === "") {
      setErrorMessage("Please enter password!");
      setOpen(true);
    } else {
      Configuration.login(loginRequest).then((LoginResponse) => {
        console.log("LoginForm.login.LoginResponse", LoginResponse.data);
        if (
          LoginResponse.data.errorCode === "0" &&
          LoginResponse.data.errorDesc === "Success"
        ) {
          if (LoginResponse.data.userProfile === "BAGIC_ADMIN") {
            navigate("/Dashboard");
          } else if (LoginResponse.data.userProfile === "BAGIC_PARTNER") {
            navigate("/EmployeesBP");
          } else if (LoginResponse.data.userProfile === "BAGIC_TL") {
            navigate("/EmployeesTL");
          } else if (LoginResponse.data.userProfile === "BAGIC_SM") {
            navigate("/EmployeesSM");
          } else if (LoginResponse.data.userProfile === "BAGIC_ITS") {
            navigate("/EmployeesITS");
          }

          console.log("LoginResponse", LoginResponse);
          let USERDETAILS = {};
          USERDETAILS = JSON.stringify(LoginResponse.data);
          if (USERDETAILS != null) {
            sessionStorage.setItem("USERDETAILS", USERDETAILS);
          }

          Configuration.getReportingList().then((RAResponse) => {
            console.log(
              "LoginForm.getReportingList.LoginResponse",
              RAResponse.data
            );
            let REPORTINGDETAILS = [];
            REPORTINGDETAILS = JSON.stringify(RAResponse.data);
            sessionStorage.setItem("REPORTINGDETAILS", REPORTINGDETAILS);
          });
        } else {
        // setErrorMessage('INCORRECT')
          setErrorMessage(LoginResponse.data.errorDesc);
          setOpen(true);
        }
      });
    }
    // navigate('/dashboard', { replace: true });
  };

  

  return (
    <>
      <Stack spacing={2}>
        <img
          src={"/assets/images/covers/HRLogo.svg"}
          alt="text"
          style={{
            height: '80%', width: '80%', paddingLeft: '10%',   display: 'flex',   backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'round',
            backgroundAttachment: 'fixed',
            margin: 'auto',
            position: 'relative',
          }}
          
        />
        <Collapse in={open}>
          <Alert severity="warning" variant="filled">
            {errorMessage}
          </Alert>
        </Collapse>
        <TextField
          required
          name="userName"
          id="userName"
          label="Username"
          onChange={(e) => handleUsername(e)}
          sx={{
            width: 300,
            backgroundColor: 'white'
        }}
        />

        <TextField
           sx={{
            width: 300,
            backgroundColor: 'white'
        }}
          name="passWord"
          label="Password"
          required
          onChange={(e) => handlePassword(e)}
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  <Iconify
                    icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ my: 2 }}
      >
        {/* <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link> */}
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        spacing={5}
        sx={{ my: 2 }}
      >
        <LoadingButton
          // fullWidth
          size="large"
          type="submit"
          variant="contained"
          onClick={handleClick}
        >
          Domain Login
        </LoadingButton>

        {/* <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          onClick={handleClick}
          sx={{ backgroundColor: "purple" }}
        >
          Domain Login
        </LoadingButton> */}
      </Stack>
    </>
  );
}
