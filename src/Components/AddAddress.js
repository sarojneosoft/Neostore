import React, {useState, useEffect} from 'react'
import Checkout_Side from './Checkout_Side'
import {Container, Row, Col, Button} from 'reactstrap';
import axios from "axios";
import { NavLink, useHistory } from 'react-router-dom';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

export default function AddAddress() {

    let history = useHistory()


    const [addresslineAdd, setAddressLine] = useState("");
    const [pinAdd, setPin] = useState("");
    const [cityAdd, setCity] = useState("")
    const [stateAdd, setState] = useState("")
    const [countryAdd, setCountry] = useState("")

    const onAddressLineChange = (e)=>{
        setAddressLine(e.target.value)
    }
    const onPincodeChange = (e)=>{
        setPin(e.target.value)
    }
    const onCityChange = (e)=>{
        setCity(e.target.value)
    }
    const onStateChange = (e)=>{
        setState(e.target.value)
    }
    const onCountryChange = (e)=>{
        setCountry(e.target.value)
    }
   
    const isOkay = () => {
        let res = true;
        if (addresslineAdd === "" || pinAdd === "" || cityAdd === "" || stateAdd === "" || countryAdd === "") {
          alert("fields can not be empty!");
          res = false;
        } else if (pinAdd.length < 6 || pinAdd.length >6 || /^[0-9]{6}$/.test(pinAdd)=== false) {
            alert("please give a valid pincode");
            setPin("");
            res = false;
          }else if(! /^[a-zA-Z ]+$/.test(cityAdd)){
          alert("please enter a valid city name");
          setCity("");
          res = false;
        }else if(! /^[a-zA-Z ]+$/.test(stateAdd)){
            alert("please enter a valid state name");
            setState("");
            res = false;
          }else if(! /^[a-zA-Z ]+$/.test(countryAdd)){
            alert("please enter a valid country name");
            setCountry("");
            res = false;
          }
        return res;
      };

    const NewAddress = async(e)=>{
        e.preventDefault();
        if(isOkay()){
            let addressOb = {
                addressLine : addresslineAdd,
                pincode : pinAdd,
                city : cityAdd,
                state : stateAdd,
                country : countryAdd
            }
            let token  = localStorage.getItem("token");
            var config = {
                method: 'POST',
                url: 'https://neostore-api.herokuapp.com/api/user/address',
                headers : {
                    'Authorization' : `${token}`
                },
                data : addressOb
              };
            try{
                const callback = await axios(config);
                console.log(callback.data);
                toast.success("address added successfully")
                alert("address added successfully");
                history.push("/address");
                
            }
            catch(error){
                console.log("ERROR", error);
                alert("unable to add address");
            }
        }
        
    }


    return (
        <Container>
         <ToastContainer position="bottom-center" />
            <Row>
                <Col md={7}>
                    <Checkout_Side />
                </Col>
                <Col md={5}>
                <p className="display-6 mt-2">Add Address</p>
                    <form className="text-center forml" style={{height : "80vh"}}>
        
        <p className="mt-2" >
          <label id="email1"  for="addressline">
            Address Line
          </label>
          <input
            onChange={onAddressLineChange}
            className="empMail"
            type="text"
            id="addressline"
            placeholder="address line"
            style={{marginTop : "5px"}}
            value={addresslineAdd}
          />
        </p>
        <p style={{marginTop : "-15px"}}>
          <label id="email1"  for="pincode">
             pincode
          </label>
         <input
             
            className="empMail"
            type = "text"
            id="pincode"
            placeholder="pincode"
            onChange={onPincodeChange}
             value={pinAdd}
             style={{marginTop : "5px"}}
          />
        </p>
        <p style={{marginTop : "-15px"}}>
          <label id="email1"  for="city">
             city
          </label>
         <input
            onChange={onCityChange}
            className="empMail"
            type="text"
            id="pincode"
            placeholder="city"
             value={cityAdd}
             style={{marginTop : "5px"}}
          />
        </p>
        <p style={{marginTop : "-15px"}}>
          <label id="email1"  for="state">
             state
          </label>
         <input
             onChange={onStateChange}
            className="empMail"
            type="text"
            id="state"
            placeholder="state"
             value={stateAdd}
             style={{marginTop : "5px"}}
          />
        </p>
        <p style={{marginTop : "-15px"}}>
          <label id="email1"  for="country">
             country
          </label>
         <input
             onChange={onCountryChange}
            className="empMail"
            type="text"
            id="country"
            placeholder="country"
             value={countryAdd}
             style={{marginTop : "5px"}}
          />
        </p>
        

        <button
          onClick={NewAddress}
          type="submit"
          className="btn btn-lg btn-primary sub1 mt-4"
        >
          Add Address
        </button>
        <NavLink to="/address" exact style={{textDecoration : "none"}}>
                    <span className="p-2 m-4 bg-danger text-white rounded" style={{fontSize : "20px"}}>Cancel</span>
                    </NavLink>  
       
      </form>
                </Col>
            </Row>
        </Container>
    )
}
