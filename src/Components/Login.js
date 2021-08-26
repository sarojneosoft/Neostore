import React, { useState, useEffect, useContext } from "react";
import { useHistory, NavLink } from "react-router-dom";

//Imports for making API calls
import axios from "axios";

//Imports for toast messages
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Imports for styling
import { Container, Row, Col } from "reactstrap";

//Imports for social logins
import GoogleLog from "./GoogleLog";
import FacebookLog from "./FacebookLog";
import TwitterLog from "./TwitterLog";

//Imports for authentication context
import { isAuthenticated } from "./Auth";
import { AuthContext } from "../context/DetailContext";
import { CHANGE_AUTH } from "../context/action.type";

/**
 * @author Saroj Sundara
 * @description this method is responsible for logging in a user by email and password
 * @returns JSX for Login screen
 */


export default function Login() {
  const { auth, authDispatch } = useContext(AuthContext);

  let history = useHistory();

  //States for email, password, loading and type

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("password");

  //OnChange functions for getting value
  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const onPasswordChange = (event) => {
    setType(event.target.type);
    setPassword(event.target.value);
  };

  const data = {
    email,
    password,
  };

  const showPass = () => {
    if (type === "password") {
      setType("text");
    } else {
      setType("password");
    }
  };

  //Function for validation
  const isOkay = () => {
    let res = true;
    if (email === "") {
      toast.error("email field can not be empty!");
      res = false;
    } else if (!reg.test(String(email).toLowerCase())) {
      toast.error("please give a valid email id");
      setEmail("");
      res = false;
    } else if (password === "") {
      toast.error("password field can not be empty!");
      res = false;
    } else if (password.length < 8) {
      toast.error("minimum eight characters required");
      setPassword("");
      res = false;
    }
    return res;
  };

  useEffect(() => {
    if (isAuthenticated()) {
      history.replace("/dashboard");
    }
  }, []);

  const reg =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  //function for handling form data
  const onHandleSubmit = async (e) => {
    e.preventDefault();
    if (isOkay()) {
      setLoading(true);
      try {
        const callback = await axios.post(
          "https://neostore-api.herokuapp.com/api/auth/login",
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        setLoading(false);
        authDispatch({
          type: CHANGE_AUTH,
          payload: true,
        });
        toast.success("login successfull");
        console.log("RES", callback.data.data.token);
        localStorage.setItem("token", callback.data.data.token);
        localStorage.setItem("fname", callback.data.data.firstName);
        localStorage.setItem("lname", callback.data.data.lastName);
        localStorage.setItem("email", callback.data.data.email);
        localStorage.setItem("gender", callback.data.data.gender);
        localStorage.setItem("mobile", callback.data.data.mobile);
        alert("login successfull");
        history.replace("/dashboard");
      } catch (error) {
        setLoading(false);
        toast("invalid user! check your email or password", { type: "error" });
        setEmail("");
        setPassword("");
      }
    }
  };
  return (
    <>
      <Container>
        <ToastContainer position="top-center" />
        <Row>
          <Col className="con">
            <Row>
              <FacebookLog />
            </Row>
            <Row className="mt-2">
              <TwitterLog />
            </Row>
            <Row className="mt-2">
              <GoogleLog />
            </Row>
          </Col>
          <Col>
            <div>
              <h2 className="text-center display-6 mt-4">Login To NeoSTORE</h2>
              {loading ? (
                <div class="d-flex justify-content-center">
                  <div
                    class="spinner-border text-danger"
                    style={{ width: "2.2em", height: "2.2em" }}
                    role="status"
                  ></div>
                  <span
                    style={{ backgroundColor: "transparent", fontSize: "20px" }}
                  >
                    Loading.....
                  </span>
                </div>
              ) : (
                ""
              )}

              <form className="text-center forml">
                <p>
                  <label
                    id="email1"
                    style={{ marginTop: "50px", marginLeft: "-50%" }}
                    for="empMail"
                  >
                    Email*
                  </label>
                  <input
                    onChange={onEmailChange}
                    className="empMail"
                    type="email"
                    id="empEmail"
                    name="devEmail"
                    placeholder="Email"
                    value={email}
                  />
                </p>
                <p className="profile" style={{ marginLeft: "0px" }}>
                  <label id="password1" for="empPassword">
                    Password*
                  </label>
                  <input
                    onChange={onPasswordChange}
                    type={type}
                    id="empPassword"
                    name="devPassword"
                    placeholder="Password"
                    value={password}
                  />
                  <div className="form-check form-switch mt-2">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      onClick={showPass}
                      id="showpass"
                      style={{ marginLeft: "15%", width: "7%" }}
                    />
                    <label
                      className="form-check-label"
                      for="showpass"
                      style={{ marginRight: "50%" }}
                    >
                      Show Password
                    </label>
                  </div>
                </p>

                <button
                  onClick={onHandleSubmit}
                  type="submit"
                  className="btn btn-lg btn-dark sub1 mt-4 "
                >
                  Login
                </button>
                <p className="mt-4">
                  <span className="text-white">Don't have an account?</span>
                  <NavLink
                    to="/register"
                    exact
                    style={{ textDecoration: "none" }}
                  >
                    <span className="m-2 display-8 bg-dark text-white">
                      Register Now
                    </span>
                  </NavLink>
                </p>
                <p className="mt-4">
                  <span className="text-white">Forgot Password?</span>
                  <NavLink
                    to="/forgetmiddle"
                    exact
                    style={{ textDecoration: "none" }}
                  >
                    <span className="m-2 display-8 bg-dark text-white">
                      Click Here
                    </span>
                  </NavLink>
                </p>
              </form>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
