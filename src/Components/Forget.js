import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";


/**
 * @author Saroj Sundara
 * @description this method is responsible for taking the user email and sending the verification code to the user
 * @returns JSX for Forget Password Screen
 */

export default function Forget() {
  const history = useHistory();

  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const onCodeChange = (event) => {
    setCode(event.target.value);
  };
  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const onConfirmChange = (event) => {
    setConfirm(event.target.value);
  };

  let recoverOb = {
    token: code,
    password: password,
    repeatPassword: confirm,
  };

  const isOkay = () => {
    let res = true;
    if (code === "") {
      toast.error("code field can not be empty!");
      res = false;
    } else if (password === "") {
      toast.error("password field can not be empty!");
      res = false;
    } else if (confirm === "") {
      toast.error("confirm password field can not be empty!");
      res = false;
    } else if (password.length < 8) {
      toast.error("Password lenght should be more than 8 characters");
      setPassword("");
      res = false;
    } else if (password !== confirm) {
      toast.error("password mismatch!");
      setConfirm("");
      res = false;
    }

    return res;
  };

  const onHandleSubmit = (e) => {
    e.preventDefault();
    if (isOkay()) {
      let config = {
        method: "post",
        url: "https://neostore-api.herokuapp.com/api/auth/set-password",
        data: recoverOb,
      };
      axios(config)
        .then((res) => {
          setLoading(false);
          if (res.status === 200) {
            toast.error("Password recovered successfully");
            history.push("/login");
          }
        })
        .catch((err) => {
          setLoading(false);
          toast.error("unable to recover password!");
        });
    }
  };

  return (
    <div>
      <ToastContainer position="top-right" />

      <h1 className="mt-4 text-center display-5">Recover Password</h1>
      <form className="text-center forml">
        <p>
          <label id="email1" style={{ marginTop: "50px" }} for="code">
            Verification Code*
          </label>
          <input
            onChange={onCodeChange}
            className="empMail"
            type="text"
            id="code"
            placeholder="verification code"
            value={code}
          />
        </p>
        <p>
          <label id="email1" for="newpassword" style={{ marginLeft: "-50%" }}>
            New Password*
          </label>
          <input
            onChange={onPasswordChange}
            className="empMail"
            type="password"
            id="newpassword"
            placeholder="New Password"
            value={password}
          />
        </p>
        <p className="profile" style={{ marginLeft: "0px" }}>
          <label id="password1" for="empPassword">
            Confirm Password*
          </label>
          <input
            onChange={onConfirmChange}
            type="password"
            id="empPassword"
            placeholder="Confirm Password"
            value={confirm}
          />
        </p>

        <button
          onClick={onHandleSubmit}
          type="submit"
          className="btn btn-lg btn-primary sub1 mt-4"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
