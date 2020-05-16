import React, { useState, useEffect } from "react";
import "./ResultsPage.css";
import { retrieveBasicUserData as retrieveBasicUserDataAPI } from "./APIs/APIList";
import Error from "../components/Error";
function Homepage(props) {
  const [errorMessage, setErrorMessage] = useState({
    exists: false,
    type: null,
  });
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [username, setUserName] = useState(null);
  useEffect(() => {
    // Either set the data or make API call to get the data.

    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get("username");

    if (props.userData) {
      setUserData(props.userData);
    } else if (props.userData === null) {
      // if it is then search for data.

      setUserName(username);
      (async () => {
        // set loading signal while API data is retrieved
        setLoading(true);
        let responseObject = await retrieveBasicUserDataAPI(username);

        if (responseObject.data) {
        } else {
          setErrorMessage({
            exists: responseObject.error.exists,
            type: responseObject.error.type,
          });
        }
        // reset loading signal to remove loading message
        setLoading(false);
        setErrorMessage({
          exists: true,
          type: responseObject.error.type,
        });
      })();
    }
    // if error then display error
  }, []);

  return (
    <div className="MainResultPageContainer">
      {errorMessage.exists && <h1 className="LoadingText">Loading ...</h1>}
      {loading && <h1 className="LoadingText">Loading ...</h1>}
      {!loading && <div></div>}
    </div>
  );
}

export default Homepage;
