import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { getToken, handleLogout } from "../utils/Auth";
import { useHistory } from "react-router-dom";

export default function ButtonAppBar() {
  const token = getToken();
  const history = useHistory();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {/* News */}
          </Typography>
          {token ? (
            <Button
              onClick={() => {
                handleLogout();
                history.push("/login");
                window.location.reload();
              }}
              color="inherit"
            >
              Logout
            </Button>
          ) : (
            <Button onClick={() => history.push("/login")} color="inherit">
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
