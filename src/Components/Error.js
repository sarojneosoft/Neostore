import React from "react";
import error from "../assets/error.jpg";

/**
 * @author Saroj Sundara
 * @description this method shows the error page
 * @returns JSX for Error Screen
 */

export default function Error() {
  return (
    <div>
      <img
        src={error}
        alt=""
        style={{ display: "block", margin: "5% auto", width: "70%" }}
      />
    </div>
  );
}
