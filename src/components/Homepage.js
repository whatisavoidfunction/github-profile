import React, { useState, useEffect } from "react";
import "./Homepage.css";
import Octicon, { Octoface } from "@primer/octicons-react";
import { withRouter, useHistory } from "react-router-dom";

import { retrieveBasicUserData as retrieveBasicUserDataAPI } from "./APIs/APIList";
const usernameBlankError = "Username entered is not valid";
const pagePathOnValidUsername = "/user?username=";
const usernameHint = "Try 'Google'";

function Homepage(props) {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({ data: null, error: null });

  useEffect(() => {
    if (userData.data !== null || userData.error !== null) {
      console.log(userData);
    }
  });

  // this function is called when form is submitted-------------------------------------------
  function formSubmitted(e) {
    e.preventDefault();
    let usernameElement = document.getElementById("usernameInput");
    retrieveBasicUserDataAPI(usernameElement.value.trim(), setUserData);
    // e.preventDefault();
    // let usernameElement = document.getElementById("usernameInput");
    // let usernameFieldValue =
    //   usernameElement.value === null || usernameElement.value.trim() === ""
    //     ? null
    //     : usernameElement.value.trim();

    // // Show blank username error if value is null--------------
    // if (usernameFieldValue === null) {
    //   usernameElement.value = "";
    //   usernameElement.classList.add("shakeAnimation");
    //   setErrorMessage({ exists: true, type: usernameBlankError });
    //   setTimeout(function () {
    //     usernameElement.classList.remove("shakeAnimation");
    //   }, 300);
    // } else {
    //   (async () => {
    //     // set loading signal while API data is retrieved
    //     setLoading(true);

    //     let responseObject = await retrieveBasicUserDataAPI(usernameFieldValue);

    //     if (responseObject.data) {
    //       props.setUserData(responseObject.data);
    //       history.push(pagePathOnValidUsername + usernameFieldValue);
    //     } else {
    //       setErrorMessage({
    //         exists: responseObject.error.exists,
    //         type: responseObject.error.type,
    //       });
    //     }
    //     // reset loading signal to remove loading message
    //     setLoading(false);
    //   })();
    // }
  }
  return (
    <div className="mainHomepageContainer">
      <form onSubmit={formSubmitted}>
        <Octicon icon={Octoface} verticalAlign="middle" size="large" />
        <label>Enter GitHub Username:</label>
        <input
          id="usernameInput"
          type="text"
          autocomplete="off"
          // onChange={() => setErrorMessage({ exists: false, type: null })}
        />

        {/* {error!==null && (
          <p className="errorMessage">{errorMessage.type}</p>
        )}
        {error==null && !loading && (
          <p className="hintText">{usernameHint}</p>
        )}
        {loading && <p className="hintText">Loading ...</p>} */}
      </form>
    </div>
  );
}

export default withRouter(Homepage);
