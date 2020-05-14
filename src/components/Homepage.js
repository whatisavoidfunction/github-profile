import React, { useState } from "react";
import "./Homepage.css";
import Octicon, { Octoface } from "@primer/octicons-react";
import { withRouter } from "react-router-dom";

const userNotFoundError = "User was not found in GitHub database";
const usernameBlankError = "Username entered is not valid";
const apiGeneralError = "Something went wrong. Check back later.";
const pagePathOnValidUsername = "/user?username=";

function Homepage(props) {
  const [errorMessage, setErrorMessage] = useState({
    exists: false,
    type: null,
  });
  const [searchResult, setSearchResult] = useState(null);

  const retrieveBasicUserData = (usernameFieldValue) => {
    fetch(`https://api.github.com/users/${usernameFieldValue}`)
      .then((response) => {
        if (response.status === 404) {
          return setErrorMessage({
            exists: true,
            type: userNotFoundError,
          });
        } else if (response.status === 200) {
          return response.json();
        } else if (response.status !== 200 && response.status !== 404) {
          return setErrorMessage({
            exists: true,
            type: apiGeneralError,
          });
        }
        return null;
      })
      .then((json) => (json !== null ? props.setUserData(json) : null))
      .catch((error) => {
        setErrorMessage({ exists: true, type: apiGeneralError });
      });
  };
  // Function called when form is submitted
  function formSubmitted(e) {
    e.preventDefault();
    let usernameElement = document.getElementById("usernameInput");
    let usernameFieldValue =
      usernameElement.value === null || usernameElement.value.trim() === ""
        ? null
        : usernameElement.value.trim();

    // get username value entered by user
    if (usernameFieldValue === null) {
      usernameElement.classList.add("shakeAnimation");
      setErrorMessage({ exists: true, type: usernameBlankError });
      setTimeout(function () {
        usernameElement.classList.remove("shakeAnimation");
      }, 300);
    } else {
      // do something with the username
      retrieveBasicUserData(usernameFieldValue);
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
