// import React from "react";
// import "./UserData.css";

// function UserData({ userData }) {
//   return (
//     <div className="mainUserDataContainer">
//       {userData.avatar_url && (
//         <div className="userPicture">
//           <img src={userData.avatar_url} alt="avatar" />
//         </div>
//       )}
//       {userData.name && <h1>{userData.name}</h1>}
//       {userData.login && (
//         <h2>
//           <a href={userData.html_url} target="_blank">
//             {userData.login}
//           </a>
//         </h2>
//       )}

//       {userData.created_at && (
//         <p>
//           Joined{" "}
//           {new Date(userData.created_at).toLocaleDateString("en-US", {
//             month: "long",
//             day: "numeric",
//             year: "numeric",
//           })}
//         </p>
//       )}

//       <div className="userStatistics">
//         {userData.public_repos && (
//           <div className="statBox">
//             <span className="statBoxNum">
//               {userData.public_repos.toLocaleString()}
//             </span>
//             <span className="statBoxLabel">Repositories</span>
//           </div>
//         )}

//         {userData.followers && (
//           <div className="statBox">
//             <span className="statBoxNum">
//               {userData.followers.toLocaleString()}
//             </span>
//             <span className="statBoxLabel">Repositories</span>
//           </div>
//         )}

//         {userData.following && (
//           <div className="statBox">
//             <span className="statBoxNum">
//               {userData.following.toLocaleString()}
//             </span>
//             <span className="statBoxLabel">Repositories</span>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default UserData;
