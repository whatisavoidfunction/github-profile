// import React, { useState, useEffect } from "react";
// import "./ResultsPage.css";
// import { retrieveBasicUserData as retrieveBasicUserDataAPI } from "./APIs/APIList";
// import Error from "../components/Error";
// import PieGraph from "./Graphs/PieGraph";
// import errorList from "./Config/ErrorList";
// import UserData from "./UserData";
// import { useHistory } from "react-router-dom";
// import BarGraph from "./Graphs/BarGraph";

// // 1. Check if the incoming props and username data has value.
// // 2. Make API call if user data is null and username is not empty.
// // 3. Display userdata if both username and data is avaialble
// // 4. Else display error page

// function Homepage(props) {
//   const history = useHistory();
//   const [languageData, setLanguageData] = useState(null);
//   const [starredData, setStarredData] = useState(null);
//   const [repoList, setRepoList] = useState(null);
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState();
//   // const [username, setUserName] = useState(null);
//   const [errorMessage, setErrorMessage] = useState({
//     exists: false,
//     type: null,
//   });

//   // Loop over all the repos and calculate how often a language is used.
//   const getUserRepositories = (url) => {
//     fetch(url)
//       .then((data) => data.json())
//       .then((data) => {
//         setRepoList(data);
//         return data;
//       })
//       .then((data) => {
//         // Get language and starred data
//         let languageDataMap = new Map();
//         let starredDataMap = new Map();

//         for (let i = 0; i < data.length; i++) {
//           let language = data[i].language;
//           let starredCount = data[i].stargazers_count;
//           let repoName = data[i].name;

//           // Language cannot be null / empty
//           if (
//             language !== null &&
//             language !== undefined &&
//             language.trim() !== ""
//           ) {
//             if (languageDataMap.has(language)) {
//               let currentCount = languageDataMap.get(language);
//               languageDataMap.set(language, currentCount + 1);
//             } else {
//               languageDataMap.set(language, 1);
//             }
//           }

//           // get starred data
//           if (
//             starredCount !== null &&
//             starredCount !== undefined &&
//             repoName != null &&
//             repoName !== undefined
//           ) {
//             starredDataMap.set(repoName, starredCount);
//           }
//         }
//         const sortedLanguageData = new Map(
//           [...languageDataMap.entries()].sort((a, b) => b[1] - a[1])
//         );

//         const sortedStarredMap = new Map(
//           [...starredDataMap.entries()].sort((a, b) => b[1] - a[1])
//         );
//         setStarredData(sortedStarredMap);
//         setLanguageData(sortedLanguageData);
//       });
//   };

//   // if an error exists, display page and start redirect timer.
//   useEffect(() => {
//     if (errorMessage.exists) {
//       setTimeout(function () {
//         history.push("/");
//       }, 3000);
//     }
//   });

//   // Set user data or make API call to retrieve it
//   useEffect(() => {
//     let responseObject = null;
//     const urlParams = new URLSearchParams(window.location.search);
//     const username = urlParams.get("username");

//     if (
//       props.userData &&
//       username !== null &&
//       username !== undefined &&
//       username.trim() !== ""
//     ) {
//       setUserData(props.userData);
//       getUserRepositories(props.userData.repos_url);
//     } else if (
//       (props.userData === null && username !== null) ||
//       username !== undefined ||
//       username.trim() !== ""
//     ) {
//       (async () => {
//         // set loading signal while API data is retrieved
//         setLoading(true);
//         responseObject = await retrieveBasicUserDataAPI(username);
//         getUserRepositories(responseObject.data.repos_url);
//         if (responseObject.data) {
//           setUserData(responseObject.data);
//         } else {
//           setErrorMessage({
//             exists: responseObject.error.exists,
//             type: responseObject.error.type,
//           });
//         }
//         // reset loading signal to remove loading message
//         setLoading(false);
//       })();
//     } else {
//       setErrorMessage({
//         exists: true,
//         type: errorList.apiGeneralError,
//       });
//     }
//   }, []);

//   return (
//     <div className="MainResultPageContainer">
//       {errorMessage.exists && <Error />}

//       {loading && <h1 className="LoadingText">Loading ...</h1>}

//       {userData !== null && languageData !== null && starredData !== null && (
//         <React.Fragment>
//           {/* <UserData userData={userData} /> */}
//           {/* <PieGraph languageData={languageData} /> */}
//           {/* <BarGraph starredData={starredData} /> */}
//         </React.Fragment>
//       )}
//       {starredData !== null && <BarGraph starredData={starredData} />}
//     </div>
//   );
// }

// export default Homepage;
