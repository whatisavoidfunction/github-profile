import React from "react";
import "./UserData.css";

function UserData({ userData }) {
  return (
    <div className="mainUserDataContainer">
      {/* Picture */}
      {userData.avatar_url && (
        <div className="userPicture">
          <img src={userData.avatar_url} alt="avatar" />
        </div>
      )}

      {/* Profile name */}
      {userData.name && <h1>{userData.name}</h1>}

      {/* Login */}
      {userData.login && (
        <h2>
          <a href={userData.html_url} rel="noopener noreferrer" target="_blank">
            @{userData.login}
          </a>
        </h2>
      )}

      {/* JoiningDate */}
      {userData.created_at && (
        <p>
          Joined{" "}
          {new Date(userData.created_at).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      )}

      {/* Repository, follower and following */}
      <div className="userStatistics">
        <div className="statBox">
          <span className="statBoxNum">
            {userData.public_repos.toLocaleString()}
          </span>
          <span className="statBoxLabel">Repositories</span>
        </div>
        <div className="statBox">
          <span className="statBoxNum">
            {userData.followers.toLocaleString()}
          </span>
          <span className="statBoxLabel">Followers</span>
        </div>

        <div className="statBox">
          <span className="statBoxNum">
            {userData.following.toLocaleString()}
          </span>
          <span className="statBoxLabel">Following</span>
        </div>
      </div>
    </div>
  );
}

export default UserData;
