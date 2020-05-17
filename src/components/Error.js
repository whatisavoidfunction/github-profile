import React from "react";
import "./Error.css";
import Octicon, { Octoface } from "@primer/octicons-react";

function Error(props) {
  return (
    <div className="mainErrorContainer">
      <div>
        <Octicon icon={Octoface} verticalAlign="middle" size="large" />
        <p>OOPS! Something web wrong. </p>
        <p className="RedirectMessage">
          Redirecting you to homepage in 3 seconds.{" "}
        </p>

        {/* {props.error.exists && props.error.value === 404 && (
          <p>Oops! User with username: {props.username} was not found.</p>
        )}
        {props.error.exists && props.error.value !== 404 && (
          <p>Something went wrong.</p>
        )} */}
      </div>
    </div>
  );
}

export default Error;
