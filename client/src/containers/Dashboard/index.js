import React from "react";
import Table from "../../components/Table";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import PictureAsPdf from "@mui/icons-material/PictureAsPdf";

import ExpenseModal from "../../components/Modal";
import ConfirmDialoge from "../../components/ConfirmDialoge";
import TextField from "@mui/material/TextField";
import PdfExport from "./PdfExport";
import { handleLogin, getToken } from "../../utils/Auth";
import AddExpense from "./AddExpense";
import EditExpense from "./EditExpense";
import Notifier from "../../utils/Notifier";

import Axios from "axios";
import { baseUrl } from "../../utils/BaseUrl";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
export default function Index(props) {
  const token = getToken();
  const [modal, setModal] = React.useState(false);
  const [search, setSearch] = React.useState("");

  const [open, setOpen] = React.useState(false);
  const [editmodal, setEditModal] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [editData, setEditData] = React.useState([]);
  const [editId, seteditId] = React.useState("");
  const [deleteId, setdeleteId] = React.useState("");
  const [pdfModal, setPdfModal] = React.useState(false);

  const handleModal = () => setModal(!modal);
  const handleEditModal = () => setEditModal(!editmodal);
  const handlePdfModal = () => setPdfModal(!pdfModal);

  React.useEffect(() => {
    getAllExpenses();
  }, [modal, editmodal]);
  const getAllExpenses = async () => {
    let response = await Axios.get(`${baseUrl}/expense`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    let tempData = response.data.expenses;
    setData(tempData);
  };
  const handleEdit = async (id) => {
    seteditId(id);
    try {
      let response = await Axios.get(`${baseUrl}/expense/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      let tempData = response.data.expense;
      setEditData(tempData);

      handleEditModal();
    } catch (err) {
      Notifier(err.response.data.message, "error");
    }
  };
  const handleDelete = async () => {
    try {
      let response = await Axios.delete(`${baseUrl}/expense/${deleteId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      let tempData = response.data.expenses;
      setData(tempData);
      setOpen(!open);

      Notifier(response.data.message, "success");
    } catch (err) {
      Notifier(err.response.data.message, "error");
    }
  };
  const handleClickOpen = (id) => {
    setdeleteId(id);
    setOpen(!open);
  };

  const handleSearch = async (e) => {
    let search = e.target.value;
    setSearch(e.target.value);

    if (search == "") {
      getAllExpenses();
      return;
    }
    try {
      let response = await Axios.get(`${baseUrl}/expense/search/${search}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      let tempData = response.data.expenses;
      setData(tempData);
    } catch (err) {
      console.log(err.response.data.message, "error");
    }
  };
  return (
    <div>
      <ConfirmDialoge
        open={open}
        handleDelete={handleDelete}
        handleClickOpen={handleClickOpen}
      />
      <ExpenseModal
        modal={modal}
        label={"Add Expense"}
        handleModal={handleModal}
        component={<AddExpense handleModal={handleModal} setData={setData} />}
      />
      <ExpenseModal
        modal={pdfModal}
        label={"Pdf Export"}
        handleModal={handlePdfModal}
        component={
          <PdfExport
            data={data}
            handleModal={handlePdfModal}
            setData={setData}
          />
        }
      />
      <ExpenseModal
        modal={editmodal}
        label={"Edit Expense"}
        handleModal={handleEditModal}
        component={
          <EditExpense
            handleModal={handleEditModal}
            editData={editData}
            editId={editId}
            setData={setData}
          />
        }
      />
      <Container component="main" maxWidth="xl">
        <Grid
          container
          justifyContent="flex-end"
          sx={{
            paddingBottom: "1rem",
            paddingTop: "1rem",
          }}
        >
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={handleModal}
              startIcon={<AddIcon />}
            >
              Add Expense
            </Button>
          </Grid>
          {data && data.length > 0 ? (
            <Grid item sx={{ marginLeft: "1rem" }}>
              <Button
                variant="contained"
                color="success"
                onClick={handlePdfModal}
                startIcon={<PictureAsPdf />}
              >
                Pdf Export
              </Button>
            </Grid>
          ) : (
            ""
          )}
        </Grid>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          sx={{
            paddingBottom: "1rem",
            paddingTop: "1rem",
          }}
        >
          <Typography
            component="h1"
            variant="h4"
            sx={{
              paddingBottom: "1rem",
            }}
          >
            All Expenses
          </Typography>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              id="search"
              label="Search Amount"
              name="search"
              onChange={handleSearch}
              value={search}
            />
          </Grid>
        </Grid>
        <Table
          data={data}
          handleEdit={handleEdit}
          handleDelete={handleClickOpen}
        />
      </Container>
    </div>
  );
}
