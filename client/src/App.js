import React from "react";
import { BrowserRouter } from "react-router-dom";
import Main from "./containers";
import ErrorBoundary from "./components/ErrorBoundary";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Toaster } from "react-hot-toast";

export default function App() {
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <Toaster />

      <ErrorBoundary>
        <BrowserRouter>
          <Main />
        </BrowserRouter>
      </ErrorBoundary>
    </ThemeProvider>
  );
}
