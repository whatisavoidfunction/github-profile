import React, { useState, useEffect, useCallback } from "react";
import "./ResultsPage.css";
import Error from "../components/Error";
import PieGraph from "./Graphs/PieGraph";
import { apiErrorList, errorList } from "./Config/ErrorList";
import UserData from "./UserData";
import { useHistory } from "react-router-dom";
import BarGraph from "./Graphs/BarGraph";
import queryString from 'query-string';

// 1. Check if the incoming props and query param username has value.
// 2. Make API call if user data is null and username is not empty.
// 3. Display userdata if both username and data is avaialble
// 4. Else display error page

function ResultsPage(props) {
  const history = useHistory();
  const [languageData, setLanguageData] = useState({
    data: null,
    loading: false
  });
  const [starredData, setStarredData] = useState({
    data: null,
    loading: false
  });
  const [userData, setUserData] = useState({
    data: null,
    error: null,
  });

  useEffect(() => {
    if (userData.error) {
      setTimeout(function () {
        history.push("/");
      }, 3000);
    }
  });

  // Loop over all the repos and calculate how often a language is used.
  const getUserRepositories = async (url, publicRepoCount) => {
    // These are used to store repo data
    let languageDataMap = new Map();
    let starredDataMap = new Map();

    let reposRemaining = publicRepoCount;
    let currentPageNumber = 1;
    let errorOccured = false;
    // Loop over until all public repo data is fetched or error occurs
    while (reposRemaining > 0 && !errorOccured) {

      setLanguageData({ data: null, loading: true });
      setStarredData({ data: null, loading: true });

      try {

        let response = await fetch(url + `?page=${currentPageNumber}&per_page=100`);
        if (response.status !== 200) {
          setUserData({ data: null, error: errorList.GENERAL_ERROR })
          errorOccured = true;
        }
        else {
          let data = await response.json();

          for (let i = 0; i < data.length; i++) {
            let language = data[i].language;
            let starredCount = data[i].stargazers_count;
            let repoName = data[i].name;

            // Language cannot be null / empty
            if (language && language.trim() !== "") {
              if (languageDataMap.has(language)) {
                let currentCount = languageDataMap.get(language);
                languageDataMap.set(language, currentCount + 1);
              } else {
                languageDataMap.set(language, 1);
              }
            }
            // get starred data
            if (starredCount !== null && starredCount !== undefined &&
              repoName != null && repoName !== undefined) {

              starredDataMap.set(repoName, starredCount);
            }
          }
          // Reduce number of repos
          reposRemaining = reposRemaining - data.length;
          currentPageNumber++;
        }
      }
      catch (err) {
        setUserData({ data: null, error: errorList.GENERAL_ERROR })
        errorOccured = true
      }
    }

    // sort all the repos
    const sortedLanguageData = new Map(
      [...languageDataMap.entries()].sort((a, b) => b[1] - a[1])
    );

    const sortedStarredData = new Map(
      [...starredDataMap.entries()].sort((a, b) => b[1] - a[1])
    );

    setLanguageData({ data: sortedLanguageData, loading: false });
    setStarredData({ data: sortedStarredData, loading: false });
  }


  // This method will retrieve both basic user data and repo data--
  const retrieveBasicUserData = useCallback((usernameFieldValue) => {
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
          if (responseObject.data !== null) {
            getUserRepositories(
              responseObject.data.repos_url,
              responseObject.data.public_repos
            );
          }
        });
      })

      .catch(() => {
        responseObject.error = apiErrorList[0];
        setUserData(responseObject);
      });
  }, []);

  useEffect(() => {
    const parsed = queryString.parse(window.location.hash);
    let username = null;

    if ("/user?username" in parsed) {
      username = parsed["/user?username"];
    }

    // Set incoming data using setUserData and call API to retrieve repolist
    if (props.userData && username && username.trim() !== "") {
      setUserData(props.userData);

      // get Repo data
      let repoUrl = props.userData.data.repos_url;
      let totalPublicRepos = props.userData.data.public_repos
      if (repoUrl != null && repoUrl.trim() !== "") {
        getUserRepositories(repoUrl, totalPublicRepos);
      }
    } else if (
      props.userData === null &&
      username !== null &&
      username.trim() !== ""
    ) {
      retrieveBasicUserData(username);
    } else {
      setUserData({ data: null, error: errorList.GENERAL_ERROR });
    }
  }, [props.userData, retrieveBasicUserData]);

  return (
    <div className="MainResultPageContainer">
      {userData.error && <Error error={userData.error} />}

      {userData.data && (
        <React.Fragment>
          <UserData userData={userData.data} />
        </React.Fragment>
      )}
      {userData.data &&
        <div className="chartContainer">
          <PieGraph languageData={languageData} totalRepos={userData.data.public_repos} />
          <BarGraph starredData={starredData} />
        </div>
      }
    </div>
  );
}

export default ResultsPage;
