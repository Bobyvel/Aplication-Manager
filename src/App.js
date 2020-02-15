import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import AplicationForm from "./components/AplicationForm";
import AllAplicants from "./components/AllAplicants";

function App() {
  const [id, setId] = useState("");

  const passId = id => {
    setId(id);
  };

  console.log(id);
  return (
    <div className="container">
      <Router>
        <Switch>
          <Route
            path="/add"
            exact
            component={props => <AplicationForm {...props} editId={id} />}
          />
          <Route
            path="/"
            exact
            component={props => <AllAplicants {...props} editForm={passId} />}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
