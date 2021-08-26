import React from "react";
import TwitterLogin from "react-twitter-auth";


/**
 * @author Saroj Sundara
 * @description this method is responsible for login in with Twitter functionality
 * @returns JSX for Twitter login button
 */

export default function TwitterLog() {
  const onFailed = () => {};
  const onSuccess = () => {};

  return (
    <div>
      <TwitterLogin
        className="tw"
        style={{}}
        loginUrl="http://localhost:3000/api/v1/auth/twitter"
        onFailure={onFailed}
        onSuccess={onSuccess}
        requestTokenUrl="http://localhost:3000/api/v1/auth/twitter/reverse"
      />
    </div>
  );
}
