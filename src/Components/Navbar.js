import React, {useState, useContext, useEffect} from "react";
import logo from '../assets/logo.jpeg'
import { FaSistrix, FaShoppingCart, FaUserAlt } from 'react-icons/fa'
import { DetailContext, CartContext, AuthContext } from "../context/DetailContext";
import { NavLink, useHistory, Redirect } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
} from "reactstrap";
import { CHANGE_AUTH, SEARCH_PRO } from "../context/action.type";
import { SearchContext } from "../context/DetailContext";
import { FLUSH_OUT } from "../context/action.type";
import { AUTH_CHANGE } from "../context/action.type";
import { isAuthenticated } from "./Auth";

export default function Navbar(props) {
  
  const history = useHistory();
  const {details, dispatch} = useContext(DetailContext);
  const {cart, cartDispatch} = useContext(CartContext);
  const {search, searchDispatch} = useContext(SearchContext);
  const {auth, authDispatch} = useContext(AuthContext);
  const [originalCart, setOriginalCart] = useState(cart.length);
  const [loading, setLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const [searchProd, setSearchProd] = useState("");
  console.log("RED", cart.length);

  console.log("CART",cart);

  useEffect(()=>{
    if(isAuthenticated())
        callCart();
    else
      setOriginalCart(cart.length)
             
  },[cart, auth])



  const callCart = async()=>{

    setLoading(true)
    let token = localStorage.getItem('token');
     let config = {
       method : 'GET',
       url  : "https://neostore-api.herokuapp.com/api/cart",
       headers: {
        'Authorization' : `${token}`
      }
     }

    await axios(config).then(res =>{
      console.log("WWW", res);
       console.log("CARTRES", res.data.data.products.length);
       setOriginalCart(res.data.data.products.length)
     })
     .catch(err => console.log(err))
     setLoading(false)
      
  }

  const onMenuChange = (e) => {

    let item = e.target.value;
    if(item === "logout"){
      alert("logging out")
      cartDispatch({
        type : FLUSH_OUT
      })
      authDispatch({
        type : CHANGE_AUTH,
        payload : false
      })
      
      localStorage.removeItem("token");
      localStorage.removeItem("invoiceOb");
      localStorage.removeItem("email");
      localStorage.removeItem("fname");
      localStorage.removeItem("lname");
      localStorage.removeItem("gender");
      localStorage.removeItem("mobile");
      history.push("/login")
    }
  };

  const onSearchChange = (e)=>{
    setSearchProd(e.target.value);
  }
  const searchMethod = (e)=>{
    searchDispatch({
      type : SEARCH_PRO,
      payload : searchProd
    })
    setSearchProd("")
    history.push("allproducts")
  }
  

  return (
    <div className="bg-dark text-white p-2" style={{position : "sticky", top : "0", zIndex : "5"}}>
         <div class="row">
        <div class="col-md-4">
          <img
            id="logo"
            src={logo}
            alt="neosoft logo"
          />
        </div>
        <div class="col-md-3 mt-2">
        <NavLink to="/dashboard" style={{textDecoration : "none", color : "#000"}}>
               <span className="p-2 bg-warning rounded menu">Home</span>
          </NavLink>
          <NavLink to="/allproducts" style={{textDecoration : "none", color : "#000"}}>
               <span className="p-2 bg-warning rounded menu">Products</span>
          </NavLink>
          <NavLink to="/order" style={{textDecoration : "none", color : "#000"}}>
               <span className="p-2 bg-warning rounded menu">Order</span>
          </NavLink>
        </div>
        <div class="col-md-5">
          <div class="input-group mt-2">
            <div>
              <input 
              onChange = {onSearchChange}
              id="form1" class="form-control" placeholder="search products here" />
            </div>
            <button id="search-button" value={searchProd} type="button" class="btn btn-primary" onClick = {searchMethod}>
              <FaSistrix />
            </button>
            <div 
            className="cart-wrapper bg-dark" 
            style={{ marginLeft: "7%" }}
            onClick={()=>{
              history.push("/cart");
            }}
            >
              <FaShoppingCart className="cart" />
             
      {
        loading ? <div class="d-flex justify-content-center num1">
        <div class="spinner-border text-danger " style={{width:"1.2em", height:"1.2em"}} role="status">
        </div>
      </div>: ( <span className="bg-danger num">{originalCart}</span>)
      }
              
              
              
              <span style={{ marginLeft: "20px" }}>Cart</span>
            </div>
            <div className="user-wrapper" style={{ marginLeft: "3%" }}>
            <ButtonDropdown
              isOpen={dropdownOpen}
              toggle={toggle}
              size="md"
            >
              <DropdownToggle caret color="dark">
                  <FaUserAlt />
                  <span className="caret"></span>
              </DropdownToggle>
              <DropdownMenu onClick={onMenuChange} style={{backgroundColor : "#03203C", color :"#fff", fontSize : "20px", padding : "5px"}}>
                <DropdownItem value="profile">
                  <NavLink to="/profile" exact style={{textDecoration :"none"}}>
                      Profile
                  </NavLink>
                </DropdownItem>
                <DropdownItem value="address">
                <NavLink to="/address" exact style={{textDecoration :"none"}}>
                      Address
                  </NavLink>
                </DropdownItem>
                <DropdownItem value="cart">
                <NavLink to="/cart" exact style={{textDecoration :"none"}}>
                      Cart
                  </NavLink>
                </DropdownItem>
                {
                 localStorage.getItem("token") ? (
                  <DropdownItem value="logout" style={{color : "#EF5354"}}>
                    Logout
                </DropdownItem>
                 ) : (
                  <DropdownItem value="login">
                <NavLink to="/login" exact style={{textDecoration :"none"}}>
                      Login
                  </NavLink>
                </DropdownItem>
                 )
                }
              </DropdownMenu>
            </ButtonDropdown>
            
            </div>
            

          </div>
        </div>
      </div> 
    </div>
   

  )
}

