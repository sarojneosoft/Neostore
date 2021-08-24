import React, {useState, useContext} from "react";
import { useHistory } from "react-router-dom";
import {
  Card,
  CardHeader,
  Button,
} from "reactstrap";
import EditAddress from "./EditAddress";
import axios from "axios";
import { FLUSH_OUT } from "../context/action.type";
import { CartContext } from "../context/DetailContext";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'



export default function AddressCard(props) {
const [isEdit, setIsEdit] = useState(false);
const {cart, cartDispatch} = useContext(CartContext);



    let history = useHistory()
    let addressLine = props.data.addressLine;
    let pincode = props.data.pincode;
    let city = props.data.city;
    let state = props.data.state;
    let country = props.data.country;
    let id = props.data._id;

    let addressOb = {
        addressLine,
        pincode,
        city,
        state,
        country,
        id
    }

    const edit = ()=>{
       setIsEdit(true);
    }

 

    const deleteAddress = async()=>{
           
            let token  = localStorage.getItem("token");
            var config = {
                method: 'DELETE',
                url: `https://neostore-api.herokuapp.com/api/user/address/${id}`,
                headers : {
                    'Authorization' : `${token}`
                }

              };
            try{
                const callback = await axios(config);
               toast.success("address deleted successfully")
                props.method(!props.state);
                // history.push("/profile")
                console.log(callback);
            }
            catch(error){
                console.log("ERROR", error);
                alert("unable to delete address");
            }
        
    }
    const cancel = ()=>{
      setIsEdit(false)
    }

  return (
    <div>
         <ToastContainer position="top-center" />
        {
            isEdit ? (<><EditAddress data = {addressOb} editFun = {setIsEdit}/>
              <Button color = "warning"  style={{fontSize : "20px", width : "100%", marginLeft : "15%"}} onClick={cancel}>Cancel</Button></>
              
              ) : (
                <Card className="bg-dark text-white mt-4">
                <CardHeader className="m-2 p-2 pro">
                  Address Line : <span style={{float : "right"}}>{addressLine}</span>
                </CardHeader>
                <CardHeader className="m-2 p-2  pro">
                  Pincode : <span style={{float : "right"}}>{pincode}</span>
                </CardHeader>
                <CardHeader className="m-2 p-2  pro">
                  City : <span style={{float : "right"}}>{city}</span>
                </CardHeader>
                <CardHeader className="m-2 p-2 pro">
                  State : <span style={{float : "right"}}>{state}</span>
                </CardHeader>
                <CardHeader className="m-2 p-2 pro">
                  Country : <span style={{float : "right"}}>{country}</span>
                </CardHeader>
                <Button color = "primary" style={{fontSize : "20px"}} onClick={edit}>Edit</Button>
                <Button color = "warning" className="mt-2" style={{fontSize : "20px"}} onClick={deleteAddress}>Delete</Button>
               
              </Card>
            )
        }
    </div>
   
  );
}
