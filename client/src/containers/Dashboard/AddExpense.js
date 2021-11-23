import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useFormik } from "formik";
import { EXPENSE_STATE } from "../../components/formik/initialValues";
import { EXPENSE_YUP } from "../../components/formik/validations";
import Axios from "axios";
import { baseUrl } from "../../utils/BaseUrl";
import { handleLogin, getToken } from "../../utils/Auth";
import Notifier from "../../utils/Notifier";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import DatePicker from "../../components/DatePicker";
import TextareaAutosize from "@mui/material/TextareaAutosize";
export default function AddExpense(props) {
  const token = getToken();
  const [isLoading, setisLoading] = React.useState(false);
  const formik = useFormik({
    initialValues: EXPENSE_STATE,
    validationSchema: EXPENSE_YUP,
    onSubmit: async (values) => {
      setisLoading(true);

      try {
        let response = await Axios({
          method: "post",
          url: `${baseUrl}/expense/create`,
          data: values,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        Notifier(response.data.message, "success");
        setisLoading(false);
        props.handleModal();
        formik.resetForm();
      } catch (err) {
        setisLoading(false);
        Notifier(err.response.data.message, "error");

        console.log("Errror->>>", err);
      }
    },
  });

  return (
    <Box
      component="form"
      noValidate
      onSubmit={formik.handleSubmit}
      sx={{ mt: 3 }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            id="email"
            label="Amount"
            type="number"
            min="0"
            name="amount"
            autoComplete="amount"
            onChange={formik.handleChange}
            value={formik.values.amount}
            error={formik.values.amount === ""}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DatePicker
            label="DateTime"
            onChange={formik.handleChange}
            value={formik.values.date}
            error={formik.values.amount === ""}
            name="date"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextareaAutosize
            aria-label="minimum height"
            minRows={5}
            placeholder="Description(optional)"
            style={{ width: "98%" }}
            name="description"
            onChange={formik.handleChange}
            value={formik.values.description}
            // error={formik.values.description === ""}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextareaAutosize
            aria-label="minimum height"
            minRows={5}
            placeholder="Comments(optional)"
            style={{ width: "98%" }}
            name="comment"
            onChange={formik.handleChange}
            value={formik.values.comment}
            // error={formik.values.comment === ""}
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
        {isLoading ? "Creating.." : "Create"}
      </Button>
    </Box>
  );
}
