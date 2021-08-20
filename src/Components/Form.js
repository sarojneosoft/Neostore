import React, { useState } from "react";
import FacebookLog from "./FacebookLog";
import GoogleLog from "./GoogleLog";
import { Container, Row, Col, Button } from "reactstrap";
import GoogleLogin from "react-google-login";
import { NavLink, useHistory } from 'react-router-dom'
import axios from "axios";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'



export default function Form() {
   
  const history = useHistory();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [mobile, setMobile] = useState("");
  const [gender, setGender] = useState("");
  const [loading, setLoading] = useState(false);

  const onfirstnameChange = (event) => {
    setFirstname(event.target.value);
  };
  const onlastnameChange = (event) => {
    setLastname(event.target.value);
  };
  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const onpasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const onconfirmChange = (event) => {
    setConfirm(event.target.value);
  };
  const onmobileChange = (event) => {
    setMobile(event.target.value);
  };
  const ongenderChange = (event) => {
    setGender(event.target.value);
  };

  var mob = /^[1-9]{1}[0-9]{9}$/;
  const reg =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const isOkay = ()=>{
    let res = true;
    if (
      firstname === "" || lastname === "" || email === "" || password === ""
       || confirm === "" || mobile === "" || gender === ""
    ) {
      toast.error("fields can not be empty")
      res = false;
    } else if (!/^[a-zA-Z ]+$/.test(firstname)) {
      toast.error("please give a valid first name")
      setFirstname("");
      res = false;
    } else if (!/^[a-zA-Z ]+$/.test(lastname)) {
      toast.error("please give a valid last name!");
      setLastname("");
      res = false;
    } else if(password.length < 8){
        toast.error("Password lenght should be more than 8 characters")
        setPassword("");
        res = false;
    }else if(password !== confirm){
        toast.error("password mismatch!");
        setConfirm("");
        res = false;
    }else if(mob.test(mobile) === false){
      toast.error("please enter a valid mobile number")
      setMobile("");
      res = false;
    }
    else if (!reg.test(String(email).toLowerCase())) {
      toast.error("please give a valid email id");
      setEmail("");
      res = false;
    }
    return res;
  }

  const onHandleSubmit = (e)=>{
      e.preventDefault()
      if(isOkay()){

        let userOb = {
          firstName : firstname,
          lastName : lastname,
          email : email,
          mobile : mobile,
          gender : gender,
          password : password,
          confirm_password : confirm
        }
        console.log("USER", userOb);

        var config = {
          method: 'post',
          url: 'https://neostore-api.herokuapp.com/api/auth/register',
          data : userOb
        };

        axios(config)
        .then(res =>{
          setLoading(false);
          console.log("SUCCESS", res);
          if(res.status === 200){
            alert("Sign up successfull");
            history.push("/login");
          }
        })
        .catch(err => {
          setLoading(false);
          console.log("ERROR", err);
          alert("error in sign up")
        })
      }
  }
  
  

  return (
    <Container className="form-con">
    <ToastContainer position="top-right" />

        <Row className="fbg">
            <Col >
              <FacebookLog />
            </Col>
            <Col >
             <GoogleLog/>
            </Col>
        </Row>
        <Row>
        <div>
      
      <h2 className="text-center mt-4 display-5">Enter New Developer</h2>
      {
        loading ? <div class="d-flex justify-content-center">
        <div class="spinner-border text-danger" style={{width:"2.2em", height:"2.2em"}} role="status">
        </div>
        <span style={{backgroundColor : "transparent", fontSize:"20px"}}>Loading.....</span>
      </div>: ""
      }
      <form className="text-center form">
        <p>
          <label id="name" for="firstname">
            First Name*
          </label>
          <input
            onChange={onfirstnameChange}
            className=" empName"
            type="text"
            id="firstname"
            name="devName"
            placeholder="First Name"
            value={firstname}
          />
        </p>
        <p>
          <label id="name" for="lastname">
            Last Name*
          </label>
          <input
            onChange={onlastnameChange}
            className="empName"
            type="text"
            id="lastname"
            name="devName"
            placeholder="Last Name"
            value={lastname}
          />
        </p>
        <p>
          <label id="email" for="empMail">
            Email*
          </label>
          <input
            onChange={onEmailChange}
            className=" empName"
            type="email"
            id="empEmail"
            name="devEmail"
            placeholder="Email"
            value={email}
          />
        </p>
        <p>
          <label id="name" for="password">
            Password*
          </label>
          <input
            onChange={onpasswordChange}
            className=" empName"
            type="password"
            id="password"
            name="password"
            placeholder="password"
            value={password}
          />
        </p>
        <p>
          <label id="name" for="confirm">
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
        <p>
          <label id="name" for="mobile">
            Mobile No*
          </label>
          <input
            onChange={onmobileChange}
           className=" empName"
            type = "tel"
            maxLength = "10"
            id="mobile"
            name="mobile"
            placeholder="Mobile No."
            value={mobile}
          />
        </p>
        <p onChange = {ongenderChange}>
        <input type="radio" id="male" name="gender" value="male"/>
        <label for="male" className="m-2">Male</label>
        <input type="radio" id="female" name="gender" value="female"/>
        <label for="female" className="m-2">Female</label><br />
        </p>

        <button
          onClick={onHandleSubmit}
          type="submit"
          className="btn btn-primary sub"
        >
          Submit
        </button>
        <p>Already registered?
        <NavLink to="/login" exact>
              <span className="m-2 p-1 display-8 text-white bg-dark">sign in here</span>
        </NavLink>
        </p>
      </form>
    </div>
        </Row>
        </Container>
  )
}
