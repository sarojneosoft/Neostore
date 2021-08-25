import React, { useState, useContext, useEffect } from "react";
import logo from "../assets/logo.jpeg";
import { FaSistrix, FaShoppingCart, FaUserAlt } from "react-icons/fa";
import {
  DetailContext,
  CartContext,
  AuthContext,
} from "../context/DetailContext";
import { NavLink, useHistory, Redirect } from "react-router-dom";
import axios from "axios";
import theme from '../theme.css'
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
import { toast } from "react-toastify";
import Autosuggest from "react-autosuggest";
import themeable from 'react-themeable';

export default function Navbar(props) {
  const history = useHistory();
  const { details, dispatch } = useContext(DetailContext);
  const { cart, cartDispatch } = useContext(CartContext);
  const { search, searchDispatch } = useContext(SearchContext);
  const { auth, authDispatch } = useContext(AuthContext);
  const [originalCart, setOriginalCart] = useState(cart.length);
  const [loading, setLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const [searchProd, setSearchProd] = useState("");

  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  console.log("RED", cart.length);

  console.log("CART", cart);

  const [suggestPros, setSuggestPros] = useState([]);

  useEffect(() => {
    if (isAuthenticated()){
      console.log("calling callcart");
      callCart();
    } 
    else setOriginalCart(cart.length);
  }, [cart, auth]);

  useEffect(() => {
    console.log("arrow", search);
    if (search === "") {
      setValue("")
      setSearchProd("");
    }
  }, [search]);

  useEffect(() => {
    loadAllPros();
  }, []);

  const callCart = async () => {
    setLoading(true);
    let token = localStorage.getItem("token");
    let config = {
      method: "GET",
      url: "https://neostore-api.herokuapp.com/api/cart",
      headers: {
        Authorization: `${token}`,
      },
    };

    await axios(config)
      .then((res) => {
        console.log("WWW", res);
        console.log("CARTRES", res.data.data.products.length);
        setOriginalCart(res.data.data.products.length);
        localStorage.setItem("cartLength", res.data.data.products.length);
      })
      .catch((err) => console.log(err));
    setLoading(false);
  };

  const loadAllPros = async () => {
    let url = `https://neostore-api.herokuapp.com/api/product?&limit=19`;
    try {
      let res = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setSuggestPros(res.data.data.docs);
    } catch (err) {
      alert("error")
      setSuggestPros([]);
      console.log("MyERR",err);
    }
  };

  const getSuggestions = (value) => {
    console.log("VVV",value);
    const inputValue = value.trim().toLowerCase();
    setSearchProd(value)
    // console.log("input", inputValue);
    const inputLength = inputValue.length;
    // console.log("testing",suggestPros[0]);
    let res =
      inputLength === 0
        ? []
        : suggestPros.filter(
            (sug) => sug.name.toLowerCase().slice(0, inputLength) === inputValue
            || sug.name.toLowerCase().includes(inputValue+" ")
            || sug.name.toLowerCase().includes(" "+inputValue)
          );
     console.log("suggestion",res);
    return res;
  };

 

  const onMenuChange = (e) => {
    let item = e.target.value;
    if (item === "logout") {
      alert("logging out");
      localStorage.removeItem("token");
      localStorage.removeItem("invoiceOb");
      localStorage.removeItem("email");
      localStorage.removeItem("fname");
      localStorage.removeItem("lname");
      localStorage.removeItem("gender");
      localStorage.removeItem("mobile");
      localStorage.removeItem("cartLength");
      authDispatch({
        type: CHANGE_AUTH,
        payload: false,
      });
      cartDispatch({
        type: FLUSH_OUT,
      });
      

      
      history.push("/login");
    }
  };

  const onSearchChange = (e) => {
    setSearchProd(e.target.value);
  };
  const searchMethod = (e) => {
    if (searchProd === "") {
      return toast.error("please enter something");
    }
    searchDispatch({
      type: SEARCH_PRO,
      payload: searchProd.trim(),
    });
    history.push("/allproducts");
  };

  const onChange = (event, { newValue }) => {
    setValue(newValue);
  };

  const inputProps = {
    placeholder: "Type a product name....",
    value,
    onChange: onChange,
  };
  

  return (
    <div
      className="bg-dark text-white p-2"
      style={{ position: "sticky", top: "0", zIndex: "5", height: "12vh" }}
    >
      <div class="row">
        <div class="col-md-4">
          <span className="bg-danger display-6 p-1 m-2 rounded">NeoSTORE</span>
        </div>
        <div class="col-md-3 mt-2">
          <NavLink
            to="/dashboard"
            style={{ textDecoration: "none", color: "#000" }}
          >
            <span className="p-2 bg-warning rounded menu">Home</span>
          </NavLink>
          <NavLink
            to="/allproducts"
            style={{ textDecoration: "none", color: "#000" }}
          >
            <span className="p-2 bg-warning rounded menu">Products</span>
          </NavLink>
          <NavLink
            to="/order"
            style={{ textDecoration: "none", color: "#000" }}
          >
            <span className="p-2 bg-warning rounded menu">Order</span>
          </NavLink>
        </div>
        <div class="col-md-5">
          <div className = "row">
            <div className="col-md-5">

            <div className="mt-2" 
                onChange = {(e)=> setSearchProd(e.target.value)}

            >


              <Autosuggest
                inputProps={inputProps}
                suggestions={suggestions}
                onSuggestionsFetchRequested={() =>
                  setSuggestions(getSuggestions(searchProd))
                }
                onSuggestionsClearRequested={() => setSuggestions([])}
                getSuggestionValue={(suggestion) => suggestion.name}
                renderSuggestion={(suggestion) => (
                  <div>
                    {suggestion.name}
                  </div>
                )}
                onSuggestionSelected = {(event, {suggestion, method})=>{
                  setSearchProd(suggestion.name)
                  searchDispatch({
                    type : SEARCH_PRO,
                    payload : suggestion.name.trim()
                  })
                  // setSearchProd("")
                  history.push("allproducts")
                }}
              />
           
            
              {/* <input 
              onChange = {onSearchChange}
              id="form1" class="form-control" placeholder="search products here" /> */}
            </div>
           
            </div>
            <div className="col-md-1">
                <button 
                onClick = {()=>{
                 
                      if(searchProd === "")
                        toast.error("please enter something")
                      else{
                        searchDispatch({
                          type : SEARCH_PRO,
                          payload : searchProd.trim()
                        })
                        // setSearchProd("")
                        history.push("allproducts")
                      }
                  
                }}
                className="mt-2 btn btn-danger rounded" style={{fontSize : "15px", marginLeft : "8px"}}>
                  <FaSistrix />
                </button>
            </div>
            <div className="col-md-3 mt-2">
            <div
              className="cart-wrapper bg-dark"
              style={{marginLeft : "40px"}}
              onClick={() => {
                history.push("/cart");
              }}
            >
              <FaShoppingCart className="cart" />

              {loading ? (
                <div class="d-flex justify-content-center num1">
                  <div
                    class="spinner-border text-danger "
                    style={{ width: "1.2em", height: "1.2em" }}
                    role="status"
                  ></div>
                </div>
              ) : (
                <span className="bg-danger num">{originalCart}</span>
              )}

              <span >Cart</span>
            </div>
            </div>
            <div className="col-md-1 mt-2">
            <div className="user-wrapper">
              <ButtonDropdown isOpen={dropdownOpen} toggle={toggle} size="md" >
                <DropdownToggle caret color="dark">
                  <FaUserAlt />
                  <span className="caret"></span>
                </DropdownToggle>
                <DropdownMenu
                
                right
                  onClick={onMenuChange}
                  style={{
                    backgroundColor: "#03203C",
                    fontSize: "20px",
                    padding: "5px",
                  }}
                >
                  <NavLink
                      to="/profile"
                      exact
                      style={{ textDecoration: "none"}}
                    >
                  <DropdownItem value="profile" className="drop">
                    
                      <span style={{color : "#fff"}} >Profile</span>
                    
                  </DropdownItem>
                  </NavLink>

                  <NavLink
                      to="/address"
                      exact
                      style={{ textDecoration: "none" }}
                    >
                  <DropdownItem value="address" className="drop">

                  <span style={{color : "#fff"}}>Address</span>
                    
                   
                  </DropdownItem>
                  </NavLink>

                  <NavLink
                      to="/order"
                      exact
                      style={{ textDecoration: "none" }}
                    >
                  <DropdownItem value="order" className="drop">
                   
                  <span style={{color : "#fff"}}>Order</span>

                   
                  </DropdownItem >

                  </NavLink>
                  {localStorage.getItem("token") ? (
                    <DropdownItem value="logout" className="drop text-white" style={{paddingLeft :"26px", }} >
                      Logout

                    </DropdownItem>
                  ) : (
                    <NavLink
                    to="/login"
                    exact
                    style={{ textDecoration: "none" }}
                  >
                    <DropdownItem value="login" className="drop">
                     
                    <span style={{color : "#00D84A"}}>Login</span>

                     
                    </DropdownItem>
                    </NavLink>
                  )}
                </DropdownMenu>
              </ButtonDropdown>
            </div>
            </div>
          </div>

            {/* <button id="search-button" value={searchProd} type="button" class="btn btn-primary" onClick = {searchMethod}>
              <FaSistrix />
            </button> */}
            
            
        
        </div>
      </div>
    </div>
  );
}
