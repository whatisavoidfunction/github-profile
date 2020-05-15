import React, { useState } from "react";
import "./Homepage.css";
import Octicon, { Octoface } from "@primer/octicons-react";
import { withRouter, useHistory } from "react-router-dom";

import { retrieveBasicUserData as retrieveBasicUserDataAPI } from "./APIs/APIList";
const usernameBlankError = "Username entered is not valid";
const pagePathOnValidUsername = "/user?username=";

function Homepage(props) {
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState({
    exists: false,
    type: null,
  });

  // this function is called when form is submitted-------------------------------------------
  function formSubmitted(e) {
    e.preventDefault();
    let usernameElement = document.getElementById("usernameInput");
    let usernameFieldValue =
      usernameElement.value === null || usernameElement.value.trim() === ""
        ? null
        : usernameElement.value.trim();

    // Show blank username error if value is null--------------
    if (usernameFieldValue === null) {
      usernameElement.classList.add("shakeAnimation");
      setErrorMessage({ exists: true, type: usernameBlankError });
      setTimeout(function () {
        usernameElement.classList.remove("shakeAnimation");
      }, 300);
    } else {
      // do something with the username
      let responseObject = retrieveBasicUserDataAPI(usernameFieldValue);
      console.log(responseObject);
      console.log("AFTER API CALL" + JSON.stringify(responseObject));
      console.log("before timeout function");

      setTimeout(function () {
        console.log("timeout ended");
        console.log("AFTER API CALL" + JSON.stringify(responseObject));
      }, 1000);

      console.log("after timeout function");

      // setErrorMessage({
      //   exists: responseObject.error.exists,
      //   type: responseObject.error.type,
      // });

      // // trigger path change if the
      // if (responseObject.data) {
      //   props.setUserData(responseObject.data);
      //   history.push(pagePathOnValidUsername + responseObject.data.login);
      // }
    }
  }
  return (
    <div className="mainHomepageContainer">
      <form onSubmit={formSubmitted}>
        <Octicon icon={Octoface} verticalAlign="middle" size="large" />
        <label htmlFor="username">Enter GitHub Username:</label>
        <input
          id="usernameInput"
          type="text"
          autocomplete="off"
          onChange={() => setErrorMessage({ exists: false, type: null })}
        />

        {errorMessage.exists && (
          <p className="errorMessage">{errorMessage.type}</p>
        )}
      </form>
    </div>
  );
}

export default withRouter(Homepage);
