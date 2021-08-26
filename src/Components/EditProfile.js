import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import axios from "axios";
import { toast } from "react-toastify";

/**
 * @author Saroj Sundara
 * @description this method gets the exsisting profile data, accept the modification and send the new data to backend
 * @param {props} it takes profile object as props
 * @returns JSX for Edit Profile Screen
 */


export default function EditProfile(props) {
  let fname = localStorage.getItem("fname");
  let lname = localStorage.getItem("lname");
  let gender = localStorage.getItem("gender");
  let email = localStorage.getItem("email");
  let mobile = localStorage.getItem("mobile");

  const [firstname, setFirstname] = useState(fname);
  const [lastname, setLastname] = useState(lname);
  const [usergender, setUsergender] = useState(gender);
  const [useremail, setUseremail] = useState(email);
  const [usermobile, setUsermobile] = useState(mobile);

  const onfirstnameChange = (e) => {
    setFirstname(e.target.value);
  };
  const onlastnameChange = (e) => {
    setLastname(e.target.value);
  };
  const ongenderChange = (e) => {
    setUsergender(e.target.value);
  };
  const onemailChange = (e) => {
    setUseremail(e.target.value);
  };
  const onmobileChange = (e) => {
    setUsermobile(e.target.value);
  };
  let mob = /^[1-9]{1}[0-9]{9}$/;
  const reg =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const isOkay = () => {
    let res = true;
    if (firstname === "") {
      toast.error("firstname can not be empty");
      res = false;
    } else if (lastname === "") {
      toast.error("lastname can not be empty");
      res = false;
    } else if (useremail === "") {
      toast.error("email can not be empty");
      res = false;
    } else if (usergender === "") {
      toast.error("gender field can not be empty");
      res = false;
    } else if (usermobile === "") {
      toast.error("mobile field can not be empty");
      res = false;
    } else if (!/^[a-zA-Z ]+$/.test(firstname)) {
      toast.error("please give a valid first name");
      setFirstname("");
      res = false;
    } else if (!/^[a-zA-Z ]+$/.test(lastname)) {
      toast.error("please give a valid last name!");
      setLastname("");
      res = false;
    } else if (mob.test(usermobile) === false) {
      toast.error("please enter a valid mobile number");
      setUsermobile("");
      res = false;
    } else if (!reg.test(String(useremail).toLowerCase())) {
      toast.error("please give a valid email id");
      setUseremail("");
      res = false;
    }
    return res;
  };

  const saveprofile = async (e) => {
    e.preventDefault();
    if (isOkay()) {
      let userOb = {
        firstName: firstname,
        lastName: lastname,
        email: useremail,
        mobile: usermobile,
        gender: usergender,
      };
      let token = localStorage.getItem("token");
      var config = {
        method: "PUT",
        url: `https://neostore-api.herokuapp.com/api/user/editprofile/`,
        headers: {
          Authorization: `${token}`,
        },
        data: userOb,
      };
      try {
        const callback = await axios(config);
        toast.success("profile updated");
        props.editFun(false);
      } catch (error) {
        toast.error("unable to update profile");
      }
    }
  };

  return (
    <Container>
      <Row>
        <Col md={12}>
          <p className="display-6 mt-2">Edit Profile</p>
          <form className="text-center forml" style={{ height: "90vh" }}>
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
                onChange={onemailChange}
                className=" empName"
                type="email"
                id="empEmail"
                name="devEmail"
                placeholder="Email"
                value={useremail}
              />
            </p>

            <p>
              <label id="name" for="mobile">
                Mobile No*
              </label>
              <input
                onChange={onmobileChange}
                className=" empName"
                type="tel"
                maxLength="10"
                id="mobile"
                name="mobile"
                placeholder="Mobile No."
                value={usermobile}
              />
            </p>
            <p onChange={ongenderChange}>
              <input
                type="radio"
                id="male"
                name="gender"
                value="male"
                checked={usergender === "male" ? true : false}
              />
              <label for="male" className="m-2 text-white">
                Male
              </label>
              <input
                type="radio"
                id="female"
                name="gender"
                value="female"
                checked={usergender === "female" ? true : false}
              />
              <label for="female" className="m-2 text-white">
                Female
              </label>
              <br />
            </p>

            <button
              onClick={saveprofile}
              type="submit"
              className="btn btn-lg btn-primary sub1 mt-2"
            >
              Update Profile
            </button>
          </form>
        </Col>
      </Row>
    </Container>
  );
}
