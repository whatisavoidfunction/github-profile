import React, { useState, useEffect } from "react";
import "./ResultsPage.css";
import { retrieveBasicUserData as retrieveBasicUserDataAPI } from "./APIs/APIList";
import Error from "../components/Error";
import errorList from "./Static-codes/ErrorList";
import { useHistory } from "react-router-dom";

// 1. Check if the incoming props data has value
// 2. Check if the incoming username is valid.
// 3. Make API call if user data is null and username is not empty.
// 4. Display userdata if both username and data is avaialble
// 5. Else display error page

function Homepage(props) {
  const history = useHistory();

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [username, setUserName] = useState(null);
  const [errorMessage, setErrorMessage] = useState({
    exists: false,
    type: null,
  });

  // if an error exists, display page and start redirect timer.
  useEffect(() => {
    if (errorMessage.exists) {
      setTimeout(function () {
        history.push("/");
      }, 3000);
    }
  });

  // Either set the data or make API call to get the data.
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get("username");

    if (props.userData) {
      setUserData(props.userData);
    } else if (
      props.userData === null &&
      username !== null &&
      username !== undefined &&
      username.trim() !== ""
    ) {
      // Set username -> make api call -> Display data or display error
      setUserName(username);
      (async () => {
        // set loading signal while API data is retrieved
        setLoading(true);
        let responseObject = await retrieveBasicUserDataAPI(username);

        if (responseObject.data) {
          // TODO:    display data here ------
        } else {
          setErrorMessage({
            exists: responseObject.error.exists,
            type: responseObject.error.type,
          });
        }

        // reset loading signal to remove loading message
        setLoading(false);
      })();
    } else {
      setErrorMessage({
        exists: true,
        type: errorList.apiGeneralError,
      });
    }
  }, []);

  return (
    <div className="MainResultPageContainer">
      {errorMessage.exists && <Error />}
      {loading && <h1 className="LoadingText">Loading ...</h1>}
      {!loading && <div></div>}
    </div>
  );
}

export default Homepage;
