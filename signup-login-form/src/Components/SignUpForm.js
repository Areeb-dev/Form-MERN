import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
// import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import MuiPhoneNumber from "material-ui-phone-number";
import { useNavigate } from "react-router-dom";
import SignIn from "./SignIn";
import { Link } from "react-router-dom";
import axios from "axios";
import { Alert } from "@mui/material";
import validator from "email-validator";

const theme = createTheme();

export default function SignUp() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState(0);
  const [password, setPassWord] = useState(0);
  const [comfirmPassword, setConfirmPassword] = useState(0);
  //Error State
  const [fullNameError, setFullNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [numberError, setNumberError] = useState(false);
  const [passwordError, setPassWordError] = useState(false);
  const [comfirmPasswordError, setConfirmPasswordError] = useState(false);
  const [incorrectPasswordError, setIncorrectPasswordError] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  let navigate = useNavigate();
  const validemail = validator.validate(email);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (fullName == "") {
      setFullNameError(true);
    } else if (email == "") {
      setEmailError(true);
    } else if (number == "") {
      setNumberError(true);
    } else if (password == "") {
      setPassWordError(true);
    } else if (comfirmPassword == "") {
      setConfirmPasswordError(true);
    } else if (validemail == false) {
      setValidEmail(true);
    } else {
      if (password === comfirmPassword) {
        axios
          .post("http://localhost:4000/users", {
            fullName: fullName,
            email: email,
            password: password,
            number: number,
          })
          .then((response) => {
            navigate("/signIn", { replace: true });
          })
          .catch((error) => {
            let errorMessage = error.response.data.message;
            setErrorMsg(errorMessage);
            setIsError(true);
          });
      } else {
        setIncorrectPasswordError(true);
      }
    }

    setTimeout(() => {
      setIncorrectPasswordError(false);
      setConfirmPasswordError(false);
      setPassWordError(false);
      setNumberError(false);
      setEmailError(false);
      setFullNameError(false);
      setIsError(false);
      setValidEmail(false);
    }, 5500);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h4">
            Sign Up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              error={fullNameError}
              onChange={(e) => {
                setFullName(e.target.value);
              }}
              margin="normal"
              required
              fullWidth
              id="Name"
              label="Full Name"
              name="Name"
              autoComplete="name"
              autoFocus
              color="success"
            />
            <TextField
              type="email"
              error={emailError || validEmail}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              color="success"
              helperText={validEmail ? "Please Enter Valid Email" : ""}
            />
            <MuiPhoneNumber
              error={numberError}
              variant="outlined"
              defaultCountry={"pk"}
              onChange={(e) => {
                setNumber(e);
              }}
              margin="normal"
              required
              fullWidth
              id="number"
              label="Number"
              name="number"
              autoComplete="number"
              color="success"
            />
            <TextField
              error={passwordError}
              onChange={(e) => {
                setPassWord(e.target.value);
              }}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              color="success"
            />
            <TextField
              error={comfirmPasswordError || incorrectPasswordError}
              color="success"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              margin="normal"
              required
              fullWidth
              name="Confirm Password"
              label="Confirm Password"
              type="password"
              id="confirm password"
              autoComplete="current-password"
              helperText={incorrectPasswordError ? "Incorrect Password" : ""}
            />
            <Button
              color="success"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>

            <Grid container>
              <Grid item>
                <Link to="/signIn" sx={{ textAlign: "center" }} variant="body2">
                  {"Already have an account? Sign in"}
                </Link>
              </Grid>
            </Grid>
            {isError ? (
              <Alert
                variant="outlined"
                sx={{ textAlign: "center",mb:3,mt:3 }}
                severity="error"
              >
                {errorMsg}
              </Alert>
            ) : (
              ""
            )}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
