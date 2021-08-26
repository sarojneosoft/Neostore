import React from "react";
import FacebookLogin from "react-facebook-login";

/**
 * @author Saroj Sundara
 * @description this method is responsible for login in with facebook functionality
 * @returns JSX for Facebook login button
 */

export default function FacebookLog() {
  const responseFacebook = (response) => {
    console.log(response);
  };
  const componentClicked = (data) => {
    console.log(data);
  };
  return (
    <div>
      <FacebookLogin
        appId="facebok app id"
        autoLoad={true}
        fields="name,email,picture"
        buttonStyle={{
          width: "67%",
          borderRadius: "10px",
          fontSize: "19px",
          textTransform: "lowercase",
          padding: "10px",
        }}
        onClick={componentClicked}
        callback={responseFacebook}
        icon="fa-facebook"
      />
    </div>
  );
}
