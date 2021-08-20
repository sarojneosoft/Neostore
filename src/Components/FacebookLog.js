import React from 'react'
import FacebookLogin from 'react-facebook-login';

export default function FacebookLog() {

    const responseFacebook = (response) => {
        console.log(response);
      }
      const componentClicked = (data)=>{
          console.log(data);
      }
    return (
        <div>
            <FacebookLogin
    appId="564682381646211"
    autoLoad={true}
    fields="name,email,picture"
    buttonStyle = {{width : "67%", borderRadius : "10px", fontSize : "19px",  textTransform: "lowercase", padding : "13px"}}
    onClick={componentClicked}
    callback={responseFacebook}
    icon="fa-facebook"
    />
        </div>
    )
}
