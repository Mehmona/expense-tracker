import React, { Component } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/system";

const borderColor = "#f5f5f5";
const MyComponent = styled("div")({
  width: "100vw",
  height: "100vh",
  display: "flex",
  alignItems: "center",
  backgroundSize: "cover",
  flexDirection: "column",
  justifyContent: "center",
  backgroundColor: borderColor,
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
});
const Text404 = styled("div")({
  margin: "0",
  color: "#000",
  marginBottom: "10px",
  fontSize: "4em",
  textAlign: "center",
  letterSpacing: ".2px",
  fontFamily: "Roboto Mono, monospace",
});

// const styles = (theme) => {
//   const borderColor = "#f5f5f5";

//   return {
//     ErrorBoundary: {
//       width: "100vw",
//       height: "100vh",
//       display: "flex",
//       alignItems: "center",
//       backgroundSize: "cover",
//       flexDirection: "column",
//       justifyContent: "center",
//       backgroundColor: borderColor,
//       backgroundPosition: "center",
//       backgroundRepeat: "no-repeat",
//     },
//     Text404: {
//       margin: "0",
//       color: black,
//       fontSize: "4em",
//       textAlign: "center",
//       letterSpacing: ".2px",
//       fontFamily: "Roboto Mono, monospace",
//     },
//     button: {
//       width: 300,
//       marginTop: "15em",
//       borderColor: "#fff",
//       color: theme.palette.common.white,
//     },
//   };
// };

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }
  //   static getDerivedStateFromError(error) {
  //     // Update state so the next render will show the fallback UI.
  //     return { hasError: true };
  //   }

  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
    // You can also log error messages to an error reporting service here
  }

  render() {
    const { classes } = this.props;
    if (this.state.errorInfo) {
      // Error path
      return (
        <MyComponent>
          <Text404>404, page not found.</Text404>
          <Button
            color="primary"
            variant="contained"
            onClick={() => (window.location = "/")}
          >
            Home
          </Button>
        </MyComponent>
      );
    }
    // Normally, just render children
    return this.props.children;
  }
}

export default ErrorBoundary;
