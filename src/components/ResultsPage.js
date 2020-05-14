import React, { useState, useEffect } from "react";
import "./ResultsPage.css";
const userNotFoundError = "User was not found in GitHub database";
// const usernameBlankError = "Username entered is blank";
const apiGeneralError = "Something went wrong. Check back later.";
// const pagePathOnValidUsername = "/user?username=";

function Homepage(props) {
  const [errorMessage, setErrorMessage] = useState({
    exists: false,
    type: null,
  });

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

  useEffect(() => {
    // check if userdata has value but userData is null
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get("username");
    const userData = props.userData;

    if (username && !username.trim() === "" && userData === null) {
      // if it is then search for data.
      retrieveBasicUserData();
    }
    // if error then display error
  }, []);

  return <div className="Homepage"></div>;
}

export default Homepage;
