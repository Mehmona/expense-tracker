import { Switch, Route, Redirect } from "react-router-dom";
import { getToken } from "../utils/Auth";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import Navbar from "../components/Navbar";
function Index() {
  const token = getToken();

  return (
    <>
      <Navbar />
      {token == undefined ? (
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Redirect from="/" to="/login" />
        </Switch>
      ) : (
        <Switch>
          <Route path="/dashboard" component={Dashboard} />
          <Redirect from="*" to="dashboard" />
        </Switch>
      )}
    </>
  );
}
export default Index;
