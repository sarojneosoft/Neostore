import React, { useState, useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Checkout_Side from "./Checkout_Side";
import { Container, Row, Col } from "reactstrap";
import { toast, ToastContainer } from "react-toastify";
import { CHANGE_AUTH, FLUSH_OUT } from "../context/action.type";
import { AuthContext, CartContext } from "../context/DetailContext";


/**
 * @author Saroj Sundara
 * @description this method is reponsible for changing password 
 * @returns JSX for Change password screen
 */

export default function ChangePassword() {
  const history = useHistory();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirm, setConfirm] = useState("");
  const { cart, cartDispatch } = useContext(CartContext);
  const { auth, authDispatch } = useContext(AuthContext);

  const onOldPasswordChange = (event) => {
    setOldPassword(event.target.value);
  };
  const onNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };
  const onconfirmChange = (event) => {
    setConfirm(event.target.value);
  };
  let changePasswordOb = {
    password: oldPassword,
    newPassword: newPassword,
  };
  const isOkay = () => {
    let res = true;
    if (oldPassword === "") {
      toast.error("old password field can not be empty!");
      res = false;
    } else if (newPassword === "") {
      toast.error("new password field can not be empty!");
      res = false;
    } else if (newPassword.length < 8) {
      toast.error("Password lenght should be more than 8 characters");
      setNewPassword("");
      res = false;
    } else if (newPassword === oldPassword) {
      toast.error("new password & old password can not be same!");
      res = false;
    } else if (newPassword !== confirm) {
      toast.error("password mismatch!");
      setConfirm("");
      res = false;
    }
    return res;
  };

  const onHandleSubmit = (e) => {
    e.preventDefault();
    if (isOkay()) {
      console.log("ok");
      let token = localStorage.getItem("token");
      let config = {
        method: "post",
        url: "https://neostore-api.herokuapp.com/api/user/change-password",
        data: changePasswordOb,
        headers: {
          Authorization: `${token}`,
        },
      };
      axios(config)
        .then((res) => {
          setLoading(false);
          if (res.status === 200) {
            toast.info("Password changed successfully");
            alert("logging out");
            localStorage.removeItem("token");
            localStorage.removeItem("cartLength");
            localStorage.removeItem("invoiceOb");
            localStorage.removeItem("email");
            localStorage.removeItem("fname");
            localStorage.removeItem("lname");
            localStorage.removeItem("gender");
            localStorage.removeItem("mobile");
            authDispatch({
              type: CHANGE_AUTH,
              payload: false,
            });
            cartDispatch({
              type: FLUSH_OUT,
            });

            return history.replace("/login");
          }
        })
        .catch((err) => {
          setLoading(false);
          toast.error("unable to change password!");
        });
    }
  };

  return (
    <div>
      <Container>
        <ToastContainer position="top-center" />
        <Row>
          <Col md={7}>
            <Checkout_Side />
          </Col>
          <Col md={5}>
            <p className="bg-dark text-white display-6 rounded mt-2 text-center">
              Change Password
            </p>
            <Row>
              <div>
                <form className="text-center forml">
                  <p className="mt-4">
                    <label id="email1" for="oldpassword">
                      Old Password*
                    </label>
                    <input
                      onChange={onOldPasswordChange}
                      className="empMail"
                      type="password"
                      id="oldpassword"
                      placeholder="old password"
                      value={oldPassword}
                    />
                  </p>
                  <p className="profile" style={{ marginLeft: "0px" }}>
                    <label id="password1" for="empPassword">
                      New Password*
                    </label>
                    <input
                      onChange={onNewPasswordChange}
                      type="password"
                      id="empPassword"
                      placeholder="New Password"
                      value={newPassword}
                    />
                  </p>
                  <p>
                    <label
                      id="name"
                      for="confirm"
                      style={{ marginLeft: "-40%" }}
                    >
                      Confirm Password*
                    </label>
                    <input
                      onChange={onconfirmChange}
                      className=" empName"
                      type="password"
                      id="confirm"
                      name="confirm"
                      placeholder="confirm password"
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
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
