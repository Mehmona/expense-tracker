import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import { SIGNUP_STATE } from "../../components/formik/initialValues";
import { SIGNUP_YUP } from "../../components/formik/validations";
import Axios from "axios";
import { baseUrl } from "../../utils/BaseUrl";
import { handleLogin } from "../../utils/Auth";
import { Redirect } from "react-router-dom";
import Container from "@mui/material/Container";
import Notifier from "../../utils/Notifier";

export default function SignUp() {
  const [isLoading, setisLoading] = React.useState(false);
  const [isRedirect, setisRedirect] = React.useState(false);

  const formik = useFormik({
    initialValues: SIGNUP_STATE,
    validationSchema: SIGNUP_YUP,
    onSubmit: async (values) => {
      setisLoading(true);
      try {
        let response = await Axios({
          method: "post",
          url: `${baseUrl}/auth/register`,
          data: values,
        });
        Notifier(response.data.message, "success");

        setisRedirect(true);
        setisLoading(false);
      } catch (err) {
        setisLoading(false);
        Notifier(err.response.data.message, "error");

        console.log("Errror->>>", err);
      }
    },
  });
  if (isRedirect == true) return <Redirect to="/login" />;
  return (
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
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={formik.handleSubmit}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={formik.handleChange}
                value={formik.values.firstName}
                error={formik.values.firstName === ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                onChange={formik.handleChange}
                value={formik.values.lastName}
                error={formik.values.lastName === ""}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                error={formik.values.email === ""}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                onChange={formik.handleChange}
                value={formik.values.password}
                error={formik.values.password === ""}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading}
          >
            {isLoading ? "Signing Up" : "Sign Up"}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
