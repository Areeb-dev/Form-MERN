import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Alert } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import validator from "email-validator";
const theme = createTheme();

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassWord] = useState(0);
  //Error State
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPassWordError] = useState(false);
  const [animation, setAnimation] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  let navigate = useNavigate();
  const handleSubmit = (e) => {
    const validemail = validator.validate(email);
    // console.log(email)
    e.preventDefault();
    if (email == "") {
      setEmailError(true);
    } else if (password == "") {
      setPassWordError(true);
    } else if (validemail == false) {
      setValidEmail(true);
    } else {
      axios
        .post("http://localhost:4000/signIn", {
          email: email,
          password: password,
        })
        .then((response) => {
          setAnimation(true);
          console.log(response);
        })
        .catch((error) => {
          let errorMessage = error.response.data.message;
          setErrorMsg(errorMessage);
          setIsError(true);
        });
    }

    setTimeout(() => {
      setValidEmail(false);
      setIsError(false);
      setPassWordError(false);
      setEmailError(false);
      setAnimation(false);
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
            Sign In
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              // type="email"
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

            <Button
              color="success"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>

            <Grid container>
              <Grid item>
                <Link
                  to="/"
                  sx={{ textAlign: "center", mt: 10 }}
                  variant="body2"
                >
                  {"Don't have an account? Sign up"}
                </Link>
              </Grid>
            </Grid>
            {isError ? (
              <Alert
                variant="outlined"
                sx={{ textAlign: "center", mb: 3, mt: 3 }}
                severity="error"
              >
                {errorMsg}
              </Alert>
            ) : (
              ""
            )}
          </Box>
          {animation ? (
            <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
              Sign-In SuccessFully
            </Alert>
          ) : (
            ""
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}
