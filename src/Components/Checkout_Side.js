import React from 'react'
import {Container, Row, Col} from 'reactstrap'
import {FaFirstOrderAlt, FaRegUser, FaAddressCard, FaExchangeAlt} from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

export default function Checkout_Side() {
    let fname = localStorage.getItem("fname");
    let lname = localStorage.getItem("lname");
    let fullName = fname+" "+lname
    return (
        <Container>
            <Row>
                <Col>
                    <p className="bg-dark text-white display-6 p-2 text-center rounded mt-2" style={{width : "50%"}}>My Account</p>
                    <img src="https://avatars3.githubusercontent.com/u/9384699?s=400&v=4" width="30%"/>
                    <input type="text" readOnly value={fullName} className="form-control mt-4" style={{width : "50%", fontSize : "1.5em"}}/>
                </Col>
            </Row>
            <Row>
                <Row className = "mt-4">
                    <Col md={1}>
                        <FaFirstOrderAlt className="icons"/>
                    </Col>
                    <Col>
                    <NavLink to="/order" exact style={{textDecoration : "none"}}>
                        <span className="icontitle">Order</span>
                    </NavLink>    
                    </Col>
                </Row>
                <Row className = "mt-4">
                    <Col md={1}>
                        <FaRegUser className="icons"/>
                    </Col>
                    <Col>
                    <NavLink to="/profile" exact style={{textDecoration : "none"}}>
                    <span className="icontitle">Profile</span>
                    </NavLink>
                    </Col>
                </Row>
                <Row className = "mt-4">
                    <Col md={1}>
                        <FaAddressCard className="icons"/>
                    </Col>
                    <Col>
                    <NavLink to="/address" exact style={{textDecoration : "none"}}>
                    <span className="icontitle">Address</span>
                    </NavLink>     
                    </Col>
                </Row>
                <Row className = "mt-4">
                    <Col md={1}>
                        <FaExchangeAlt className="icons"/>
                    </Col>
                    <Col>
                    <NavLink to="/changepassword" exact style={{textDecoration : "none"}}>
                    <span className="icontitle">Change Password</span>
                    </NavLink> 
                    </Col>
                </Row>
            </Row>
        </Container>
    )
}
