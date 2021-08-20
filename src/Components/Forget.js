import React,{useState, useEffect} from 'react'
import  Navbar  from './Navbar'
import Footer from './Footer'
import axios from "axios";
import { useHistory } from 'react-router-dom';


export default function Forget() {
   
    const history = useHistory()

    const [code, setCode] = useState("");
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [loading, setLoading] = useState(false)

    const onEmailChange = (event) => {
      setEmail(event.target.value);
    };
  
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
        token : code,
        password : password,
        repeatPassword:confirm
      } 
     
    const isOkay = ()=>{
      let res = true;
      if (code === "" || password === "" || confirm === "") {
        alert("fields can not be empty!");
        res = false;
      }else if(password.length < 8){
        alert("Password lenght should be more than 8 characters")
        setPassword("");
        res = false;
    }else if(password !== confirm){
        alert("password mismatch!");
        setConfirm("");
        res = false;
     } 

     return res;
    }  
    
    const onHandleSubmit = (e)=>{
       e.preventDefault();
        if(isOkay()){
          console.log("ok");
           
            let config = {
              method: 'post',
              url: 'https://neostore-api.herokuapp.com/api/auth/set-password',
              data : recoverOb
            }
            axios(config)
        .then(res =>{
          setLoading(false);
          console.log("SUCCESS", res);
          if(res.status === 200){
            alert("Password recovered successfully");
            history.push("/login");
          }
        })
        .catch(err => {
          setLoading(false);
          console.log("ERROR", err);
          alert("unable to recover password!")
        })
        }
    }


  //  const isCodeSent = ()=>{
    
  //   let config = {
  //     method: 'post',
  //     url: 'https://neostore-api.herokuapp.com/forgotPassword',
  //     headers: { 
  //       Accept:"application/json",
  //       'Content-Type': 'application/json', 
  //     },
  //     email
  //   }
  //  }
    
    // useEffect(()=>{
    //     isCodeSent()
    // }, [])
    return (
        <div>
         
             <h1 className="mt-4 text-center display-5">Recover Password</h1>
             <form className="text-center forml">
        <p>
          <label id="email1" style={{marginTop : "50px"}} for="code">
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
          <label id="email1"  for="newpassword">
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
        <p className="profile" style={{marginLeft : "0px"}}>
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
    )
}
