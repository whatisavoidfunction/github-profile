import React, { useState, useEffect } from "react";
import "./ResultsPage.css";
import { retrieveBasicUserData as retrieveBasicUserDataAPI } from "./APIs/APIList";
import Error from "../components/Error";
import PieGraph from "./Graphs/PieGraph";
import errorList from "./Config/ErrorList";
import UserData from "./UserData";
import { useHistory } from "react-router-dom";

// 1. Check if the incoming props and username data has value.
// 2. Make API call if user data is null and username is not empty.
// 3. Display userdata if both username and data is avaialble
// 4. Else display error page

function Homepage(props) {
  const history = useHistory();
  const [languageData, setLanguageData] = useState(null);
  const [repoList, setRepoList] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState();
  // const [username, setUserName] = useState(null);
  const [errorMessage, setErrorMessage] = useState({
    exists: false,
    type: null,
  });

  const computeLanguageData = (url) => {
    fetch(url)
      .then((data) => data.json())
      .then((data) => {
        setRepoList(data);
        return data;
      })
      .then((data) => {
        let languageDataMap = new Map();
        for (let i = 0; i < data.length; i++) {
          let language = data[i].language;
          if (
            language !== null &&
            language !== undefined &&
            language.trim() !== ""
          ) {
            if (languageDataMap.has(language)) {
              let currentCount = languageDataMap.get(language);
              languageDataMap.set(language, currentCount + 1);
            } else {
              languageDataMap.set(language, 1);
            }
          }
        }
        const sortedLanguageData = new Map(
          [...languageDataMap.entries()].sort((a, b) => b[1] - a[1])
        );
        setLanguageData(sortedLanguageData);
      });
  };

  // if an error exists, display page and start redirect timer.
  useEffect(() => {
    if (errorMessage.exists) {
      setTimeout(function () {
        history.push("/");
      }, 3000);
    }
  });

  // Set user data or make API call to retrieve it
  useEffect(() => {
    let responseObject = null;
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get("username");

    if (
      props.userData &&
      username !== null &&
      username !== undefined &&
      username.trim() !== ""
    ) {
      setUserData(props.userData);
      computeLanguageData(props.userData.repos_url);
    } else if (
      (props.userData === null && username !== null) ||
      username !== undefined ||
      username.trim() !== ""
    ) {
      // console.log("here");
      // Set username -> make api call -> Display data or display error
      // setUserName(username);
      (async () => {
        // set loading signal while API data is retrieved
        setLoading(true);
        responseObject = await retrieveBasicUserDataAPI(username);
        computeLanguageData(responseObject.data.repos_url);
        if (responseObject.data) {
          setUserData(responseObject.data);
        } else {
          setErrorMessage({
            exists: responseObject.error.exists,
            type: responseObject.error.type,
          });
        }
        // console.log(responseObject);
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

      {userData !== null && languageData !== null && (
        <React.Fragment>
          <UserData userData={userData} />
          <PieGraph languageData={languageData} />
        </React.Fragment>
      )}
    </div>
  );
}

export default Homepage;
