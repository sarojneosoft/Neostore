import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";


/**
 * @author Saroj Sundara
 * @description this method accepts the verification code and new password and send them to backend 
 * @returns JSX for new password in forget password section
 */


export default function ForgetMiddle() {
  let history = useHistory();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };
  let userOb = {
    email: email,
  };

  const isOkay = () => {
    let res = true;
    if (email === "") {
      toast.error("email field can not be empty!");
      res = false;
    } else if (!reg.test(String(email).toLowerCase())) {
      toast.error("please give a valid email id");
      setEmail("");
      res = false;
    }
    return res;
  };
  const onHandleSubmit = () => {
    if (isOkay()) {
      setLoading(true);
      let config = {
        method: "post",
        url: "https://neostore-api.herokuapp.com/api/auth/forgot-password",
        data: userOb,
      };
      axios(config)
        .then((res) => {
          setLoading(false);
          console.log("SUCCESS", res);
          if (res.status === 200) {
            alert("code sent successfully");
            history.push("/forget");
          }
        })
        .catch((err) => {
          setLoading(false);
          toast.error("unable to send code!");
        });
    }
  };

  const reg =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return (
    <div>
      <ToastContainer position="top-right" />

      <h1 className="text-center mt-4">
        Give Your Email Id to send the verification code
      </h1>
      {loading ? (
        <div class="d-flex justify-content-center">
          <div
            class="spinner-border text-danger"
            style={{ width: "2.2em", height: "2.2em" }}
            role="status"
          ></div>
          <span style={{ backgroundColor: "transparent", fontSize: "20px" }}>
            Loading.....
          </span>
        </div>
      ) : (
        ""
      )}
      <p>
        <label id="email" for="empMail">
          Email*
        </label>
        <input
          onChange={onEmailChange}
          className=" empName"
          type="email"
          id="empEmail"
          placeholder="Email"
          value={email}
        />
      </p>
      <button
        onClick={onHandleSubmit}
        type="submit"
        className="btn btn-lg btn-primary sub1 mt-4"
      >
        Submit
      </button>
    </div>
  );
}
