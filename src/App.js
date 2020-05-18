import React, { useState } from "react";
import "./App.css";
import Homepage from "./components/Homepage";
import Footer from "./components/Footer";
import ResultPage from "./components/ResultsPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const [userData, setUserData] = useState(null);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Homepage setUserData={setUserData} />
          </Route>
          <Route exact path="/user">
            <ResultPage userData={userData} />
          </Route>
        </Switch>
      </Router>

      {/* <Footer /> */}
    </div>
  );
}

export default App;
