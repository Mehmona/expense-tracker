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
import Container from "@mui/material/Container";
import { useFormik } from "formik";
import { LOGIN_STATE } from "../../components/formik/initialValues";
import { LOGIN_YUP } from "../../components/formik/validations";
import Axios from "axios";
import { baseUrl } from "../../utils/BaseUrl";
import { handleLogin } from "../../utils/Auth";
import { Redirect } from "react-router-dom";
export default function SignIn() {
  const [isLoading, setisLoading] = React.useState(false);
  const [isRedirect, setisRedirect] = React.useState(false);

  const formik = useFormik({
    initialValues: LOGIN_STATE,
    validationSchema: LOGIN_YUP,
    onSubmit: async (values) => {
      setisLoading(true);
      try {
        let response = await Axios({
          method: "post",
          url: `${baseUrl}/auth/login`,
          data: values,
        });
        const { token, user } = response.data.result;
        handleLogin(token, user);
        setisRedirect(true);
        setisLoading(false);
        window.location.reload();
      } catch (err) {
        setisLoading(false);

        console.log("Errror->>>", err);
      }
    },
  });
  if (isRedirect == true) return <Redirect to="/dashboard" />;
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
          Sign in
        </Typography>

        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={formik.handleChange}
            value={formik.values.email}
            error={formik.values.email === ""}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={formik.handleChange}
            value={formik.values.password}
            error={formik.values.password === ""}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading}
          >
            {!isLoading ? "Sign In" : "Signing In"}
          </Button>

          <Grid container>
            <Grid item xs></Grid>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
