import React from "react";
import { GoogleLogin } from "react-google-login";

export default function GoogleLog() {
  const responseGoogle = (response) => {
    console.log(response);
  };

  return (
    <div>
    <GoogleLogin
      clientId="your google api key"
      render={renderProps => (
        <button onClick={renderProps.onClick} disabled={renderProps.disabled}
        style={{width : "68%", height : "8vh", border : "1px solid black", borderRadius : "10px", marginLeft : "2%"}}
        >
          <img src="https://e7.pngegg.com/pngimages/299/774/png-clipart-google-logo-google-search-search-engine-optimization-google-s-google-google-logo-google.png" width="10%"/>
          <span style={{fontSize :"20px"}}>Sign in with google</span>
        </button>
      )}
      buttonText="Login With Google"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={"single_host_origin"}
      className = "gl"
    />
    </div>
  );
}
