import React, {useState, useEffect} from 'react'
import Checkout_Side from './Checkout_Side'
import {Container, Row, Col, Button} from 'reactstrap';
import AddressCard from './AddressCard';
import axios from "axios";
import { useHistory } from 'react-router-dom';
import Footer from './Footer';
import Navbar from './Navbar';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

export default function Address() {

    let history = useHistory()

    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(false)
    const [del, setDel] = useState(false)


    const AddAddress = ()=>{
        history.push("/addaddress")
    }

    const loadAllAddress = async()=>{
        setLoading(true)
        let token  = localStorage.getItem("token");
        var config = {
            method: 'GET',
            url: 'https://neostore-api.herokuapp.com/api/user/address',
            headers : {
                'Authorization' : `${token}`
            }
          };
        try{
            const callback = await axios(config);
            console.log(callback.data.data.address);
            setAddresses(callback.data.data.address);
        }
        catch(error){
            console.log("ERROR", error);
            alert("unable to load address");
        }
        setLoading(false)
    }

    const editAddress = ()=>{
        history.push("/editaddress");
    }

    useEffect(()=>{
        loadAllAddress();
    },[del])

    return (
        <div>
       

        <Container>
            <Row>
                <Col md={7}>
                    <Checkout_Side />
                </Col>
                <Col md={5}>
                    <p className="display-5">Addresses</p>
                    <Button color="danger" size="lg" onClick={AddAddress}>Add Address</Button>
                    {
        loading ? <div class="d-flex justify-content-center">
        <div class="spinner-border text-danger" style={{width:"2.2em", height:"2.2em"}} role="status">
        </div>
        <span style={{backgroundColor : "transparent", fontSize:"20px"}}>Loading.....</span>
      </div>: ""
      }
                    {
                        addresses.map((address, index)=>(
                           
                                <Row md={4} key={index} className="mt-2">
                                    <Col md={12}>
                                        <AddressCard data={address} method = {setDel} state = {del}/>
                                    </Col>
                                 </Row>
                            ))
                        
    
                    }
                </Col>
            </Row>
        </Container>
       
        </div>
    )
}
