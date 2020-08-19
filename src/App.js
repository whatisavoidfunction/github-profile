import React, { useState } from "react";
import "./App.css";
import Homepage from "./components/Homepage";
import ResultsPage from "./components/ResultsPage";
import Footer from "./components/Footer"
import { HashRouter, Switch, Route } from "react-router-dom";
import { Redirect } from "react-router-dom";

function App() {
  const [userData, setUserData] = useState(null);


  return (
    <div className="App">
      <HashRouter>
        <Switch>
          <Route exact path="/">
            <Homepage setUserData={setUserData} />
            {/* {userData ?
              <Redirect push
                to={{
                  pathname: "/user",
                  search: `username=${userData.data.login}`
                }}
              />
              :
              <Homepage setUserData={setUserData} />} */}
          </Route>
          <Route path="/user">
            <ResultsPage userData={userData} />
          </Route>
        </Switch>
      </HashRouter>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
