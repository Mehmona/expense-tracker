import * as React from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

export default function NativePickers(props) {
  return (
    <Stack component="form" noValidate spacing={3}>
      <TextField
        id="datetime-local"
        label={props.label}
        type="datetime-local"
        value={props.value}
        name={props.name}
        onChange={props.onChange}
        sx={{ width: "100%" }}
        error={props.error}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </Stack>
  );
}
