import React, { useState, useEffect } from "react";
import "./Homepage.css";
import Octicon, { Octoface } from "@primer/octicons-react";
import { apiErrorList, errorList } from "./Config/ErrorList";
const usernameHint = "Try 'Google'";

function Homepage(props) {
  // const history = useHistory();
  const [userData, setUserData] = useState({
    data: null,
    error: null,
  });

  //If data available then route page appropriately
  useEffect(() => {
    if (userData.data != null) {
      props.setUserData(userData);
    }
  });

  const retrieveBasicUserData = (usernameFieldValue) => {
    let responseObject = {
      data: null,
      error: null,
    };

    fetch(`https://api.github.com/users/${usernameFieldValue}`)
      .then((response) => {
        return response.json().then((data) => {
          if (response.status === 200) {
            responseObject.data = data;
          }
          // 404 and 403 errors
          else if (response.status in apiErrorList) {
            responseObject.error = apiErrorList[response.status];
          }
          // default error if response not ok and not in error list
          else {
            responseObject.error = errorList.GENERAL_ERROR;
          }
          setUserData(responseObject);
        });
      })
      .catch(() => {
        responseObject.error = errorList.GENERAL_ERROR;
        setUserData(responseObject);
      });
  };

  // Function deals with handling of empty username response
  const handleEmptyUsername = (usernameElement) => {
    // Reset input value, animate and set error
    usernameElement.value = "";
    usernameElement.classList.add("shakeAnimation");
    setUserData({
      data: null,
      error: errorList.USERNAME_EMPTY_ERROR,
    });
    setTimeout(function () {
      usernameElement.classList.remove("shakeAnimation");
    }, 300);
  };

  //   // this function is called when form is submitted-------------------------------------------
  const formSubmitted = (e) => {
    e.preventDefault();
    let usernameElement = document.getElementById("usernameInput");
    // condition to either call api or set erro
    if (usernameElement.value === null || usernameElement.value.trim() === "") {
      handleEmptyUsername(usernameElement);
    } else {
      retrieveBasicUserData(usernameElement.value.trim());
    }
  };

  return (
    <div className="mainHomepageContainer">
      <form onSubmit={formSubmitted}>
        <Octicon icon={Octoface} verticalAlign="middle" size="large" />
        <label>Enter GitHub Username:</label>
        <input
          id="usernameInput"
          type="text"
          autoComplete="off"
          onChange={() => setUserData({ data: null, error: null })}
        />
        {userData.error !== null && (
          <p className="errorMessage">{userData.error}</p>
        )}
        {userData.error == null && <p className="hintText">{usernameHint}</p>}
      </form>

    </div>
  );
}
export default Homepage
