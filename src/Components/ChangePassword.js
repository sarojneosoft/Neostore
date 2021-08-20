import React,{useState, useEffect} from 'react'
import  Navbar  from './Navbar'
import Footer from './Footer'
import axios from "axios";
import { useHistory } from 'react-router-dom';
import Checkout_Side from './Checkout_Side'

import {Container, Row, Col} from 'reactstrap';


export default function ChangePassword() {

    const history = useHistory()
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [loading, setLoading] = useState(false)

    const onOldPasswordChange = (event) => {
        setOldPassword(event.target.value);
      };
      const onNewPasswordChange = (event) => {
          setNewPassword(event.target.value);
        };
        let changePasswordOb = {
            password : oldPassword,
            newPassword: newPassword
          } 
          const isOkay = ()=>{
            let res = true;
            if (oldPassword === "" || newPassword === "") {
              alert("fields can not be empty!");
              res = false;
            }else if(newPassword.length < 8){
              alert("Password lenght should be more than 8 characters")
              setNewPassword("");
              res = false;
          }
           return res;
          }    

          const onHandleSubmit = (e)=>{
            e.preventDefault();
             if(isOkay()){
               console.log("ok");
               let token = localStorage.getItem('token');
                 let config = {
                   method: 'post',
                   url: 'https://neostore-api.herokuapp.com/api/user/change-password',
                   data : changePasswordOb,
                   headers : {
                       'Authorization' : `${token}`
                   }
                 }
                 axios(config)
             .then(res =>{
               setLoading(false);
               console.log("SUCCESS", res);
               if(res.status === 200){
                 alert("Password changed successfully");
                 history.push("/login");
               }
             })
             .catch(err => {
               setLoading(false);
               console.log("ERROR", err);
               alert("unable to change password!")
             })
             }
         }

    return (
      <div>
    
      <Container>
         <Row>
                <Col md={7}>
                     <Checkout_Side/> 
                </Col>
                <Col md={5}>
                     <p className="display-5">Change Password</p>
                     <Row>
                     <div>
           
           <form className="text-center forml">
      
      <p className="mt-4">
        <label id="email1"  for="oldpassword">
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
      <p className="profile" style={{marginLeft : "0px"}}>
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
       
    )
}
