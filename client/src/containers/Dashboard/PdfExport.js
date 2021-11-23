import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useFormik } from "formik";
import { PDF_EXPORT_STATE } from "../../components/formik/initialValues";
import { PDF_EXPORT_YUP } from "../../components/formik/validations";

import { handleLogin, getToken } from "../../utils/Auth";
import Button from "@mui/material/Button";
import DatePicker from "../../components/DatePicker";
import "jspdf-autotable";
import moment from "moment";
import jsPDF from "jspdf";
import Notifier from "../../utils/Notifier";

export default function AddExpense(props) {
  const token = getToken();
  const [isLoading, setisLoading] = React.useState(false);
  const formik = useFormik({
    initialValues: PDF_EXPORT_STATE,
    validationSchema: PDF_EXPORT_YUP,
    onSubmit: async (values) => {
      setisLoading(true);
      let result = generatePDF();
      setisLoading(false);
      if (result == true) {
        props.handleModal();
      }
    },
  });
  const generatePDF = () => {
    let array = [];
    let data = props.data;
    let date1 = new Date(formik.values.start_date);
    let date2 = new Date(formik.values.end_date);
    var startDate = moment(date1, "DD/MM/YYYY");
    var endDate = moment(date2, "DD/MM/YYYY");
    if (formik.values.start_date != "" && formik.values.end_date != "") {
      data.map((dt) => {
        var date = moment(new Date(dt.date), "DD/MM/YYYY");
        if (
          date.isSameOrAfter(startDate, "day") &&
          date.isSameOrBefore(endDate, "day")
        ) {
          array.push(dt);
        }
      });
      data = array;
    }
    if (data && data.length == 0) {
      Notifier("No Record found for pdf export", "error");
      return false;
    }
    var today = moment(new Date()).format("DD/MM/YYYY HH:mm:ss");
    var newdate = "Date: " + today;
    const doc = new jsPDF();
    const tableColumn = ["Amount", "Description", "Comments", "Date/Time"];
    const tableRows = [];
    let sum =
      "Amount Total= " +
      data.reduce((accumulator, curr) => +accumulator + +curr.amount, 0);
    let average =
      "Amount Average = " +
      data
        .reduce(
          (accumulator, curr) => accumulator + curr.amount / data.length,
          0
        )
        .toFixed(2);
    data.forEach((ticket) => {
      const ticketData = [
        ticket.amount,
        ticket.description,
        ticket.comment,
        moment(ticket.date).format("DD/MM/YYYY HH:mm:ss"),
      ];
      tableRows.push(ticketData);
    });
    doc.setFont("", "bold");
    doc.text("Expense Data", 105, 10, null, null, "center");
    doc.text(newdate, 140, 25);
    doc.text(sum, 140, 120);
    doc.text(average, 140, 130);
    doc.autoTable(tableColumn, tableRows, {
      startY: 54,
      theme: "grid",
      styles: {
        halign: "center",
      },
    });
    doc.setFontSize(10);

    doc.setTextColor(255, 0, 0);
    const date = Date().split(" ");
    const dateStr = date[0] + "_" + date[1] + "_" + date[2];
    doc.save(`${dateStr}.pdf`);
    return true;
  };
  return (
    <Box
      component="form"
      noValidate
      onSubmit={formik.handleSubmit}
      sx={{ mt: 3 }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <DatePicker
            onChange={formik.handleChange}
            value={formik.values.start_date}
            error={formik.values.start_date === ""}
            name="start_date"
            label="Start Date"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DatePicker
            onChange={formik.handleChange}
            value={formik.values.end_date}
            error={formik.values.end_date === ""}
            name="end_date"
            label="End Date"
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
        {isLoading ? "Exporting.." : "Export"}
      </Button>
    </Box>
  );
}
