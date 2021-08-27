import React, { useState } from "react";
import Checkout_Side from "./Checkout_Side";
import { Container, Row, Col } from "reactstrap";
import { Card, CardHeader, Button } from "reactstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditProfile from "./EditProfile";

/**
 * @author Saroj Sundara
 * @description this method gets the exsisting profile data and show them in to the profile section
 * @returns JSX for Profile Screen
 */

export default function Profile(props) {
  let fname = localStorage.getItem("fname");
  let lname = localStorage.getItem("lname");
  let gender = localStorage.getItem("gender");
  let email = localStorage.getItem("email");
  let mobile = localStorage.getItem("mobile");
  const [isEdit, setIsEdit] = useState(false);

  const cancel = () => {
    setIsEdit(false);
  };
  const edit = () => {
    setIsEdit(true);
  };

  return (
    <div>
      <ToastContainer position="bottom-center" />
      <Container className="mt-2">
        <Row>
          <Col md={7}>
            <Checkout_Side />
          </Col>
          <Col md={5}>
            {isEdit ? (
              <>
                <EditProfile editFun={setIsEdit} editAlert = {props.editMethod}/>
                <Button
                  color="warning"
                  style={{ fontSize: "20px", width: "100%", marginLeft: "10%" }}
                  onClick={cancel}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <p className="bg-dark text-white display-6 p-2 rounded mt-2 text-center">
                  Profile Section
                </p>
                <Row>
                  <Col>
                    <Card>
                      <CardHeader className="m-2 p-2 bg-muted text-dark pro">
                        First Name : {fname}
                      </CardHeader>
                      <CardHeader className="m-2 p-2 bg-muted text-dark pro">
                        Last Name : {lname}
                      </CardHeader>
                      <CardHeader className="m-2 p-2 bg-muted text-dark pro">
                        Gender : {gender}
                      </CardHeader>
                      <CardHeader className="m-2 p-2 bg-muted text-dark pro">
                        Mobile : {mobile}
                      </CardHeader>
                      <CardHeader className="m-2 p-2 bg-muted text-dark pro">
                        Email : {email}
                      </CardHeader>
                    </Card>
                    <Button
                      color="primary"
                      style={{ fontSize: "20px", width: "100%" }}
                      onClick={edit}
                    >
                      Edit Profile
                    </Button>
                  </Col>
                </Row>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}
