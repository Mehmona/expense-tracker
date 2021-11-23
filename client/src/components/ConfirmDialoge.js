import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function DraggableDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClickOpen}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Are you sure you want to delete
        </DialogTitle>

        <DialogActions>
          <Button
            color="error"
            variant="outlined"
            autoFocus
            onClick={props.handleClickOpen}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            variant="outlined"
            onClick={props.handleDelete}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
