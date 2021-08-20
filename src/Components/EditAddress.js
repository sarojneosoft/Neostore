import React, {useState, useEffect} from 'react'
import Checkout_Side from './Checkout_Side'
import {Container, Row, Col, Button} from 'reactstrap';
import AddressCard from './AddressCard';
import axios from "axios";
import { useHistory } from 'react-router-dom';

export default function EditAddress(props) {

    let history = useHistory()
    let addressLine = props.data.addressLine;
    let pincode = props.data.pincode;
    let city = props.data.city;
    let state = props.data.state;
    let country = props.data.country;
    let id = props.data.id;
    console.log(id);

    const [addresslineAdd, setAddressLine] = useState(addressLine);
    const [pinAdd, setPin] = useState(pincode);
    const [cityAdd, setCity] = useState(city)
    const [stateAdd, setState] = useState(state)
    const [countryAdd, setCountry] = useState(country)

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


    const saveAddress = async(e)=>{
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
                method: 'PUT',
                url: `https://neostore-api.herokuapp.com/api/user/address/${id}`,
                headers : {
                    'Authorization' : `${token}`
                },
                data : addressOb

              };
            try{
                const callback = await axios(config);
                alert("address updated")
                history.push("/profile")
                console.log(callback);
            }
            catch(error){
                console.log("ERROR", error);
                alert("unable to update address");
            }
        }
       
    }



    return (
        <Container>
            <Row>
              
                <Col md={12}>
                    <p className="display-6 mt-2">Edit Address</p>
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
             onChange={onPincodeChange}
            className="empMail"
            type="number"
            maxLength = "6"
            id="pincode"
            placeholder="pincode"
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
          onClick={saveAddress}
          type="submit"
          className="btn btn-lg btn-primary sub1 mt-4"
        >
          Update Address
        </button>
       
      </form>
                </Col>
            </Row>
        </Container>
    )
}
