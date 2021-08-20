import React, {useReducer} from 'react';
import {DetailContext, CartContext, SearchContext, AuthContext} from './context/DetailContext'
import {detailReducer, cartReducer, searchReducer, authReducer} from './context/reducer';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

//Importing All The Components

import LocateStore from './Components/Locate';
import Dashboard from './Components/Dashboard';
import Login from './Components/Login';

//Routing
import { BrowserRouter as Router, Route , Switch} from 'react-router-dom'
import Register from './Components/Register';
import Forget from './Components/Forget';
import ForgetMiddle from './Components/ForgetMiddle';
import AllProduct from './Components/AllProduct';
import ProductDetails from './Components/ProductDetails';
import ChangePassword from './Components/ChangePassword';
import Cart from './Components/Cart';
import Test from './Components/Test';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Checkout_Side from './Components/Checkout_Side';
import Order from './Components/Order';
import Profile from './Components/Profile';
import Address from './Components/Address';
import EditAddress from './Components/EditAddress';
import AddAddress from './Components/AddAddress';
import PrivateRoute from './Components/PrivateRoute';
import Document from './Components/Document';
import Error from './Components/Error';


function App() {
   
  const [details, dispatch] = useReducer(detailReducer, [])
  const [cart, cartDispatch] = useReducer(cartReducer, [])
  const [search, searchDispatch] = useReducer(searchReducer, "")
  const [auth, authDispatch] = useReducer(authReducer, false)

  return (
    <DetailContext.Provider value={{details, dispatch}}>
      <CartContext.Provider value={{cart, cartDispatch}}>
      <SearchContext.Provider value={{search, searchDispatch}}>
      <AuthContext.Provider value={{auth, authDispatch}}>
    <div>
      <Router>
        <Navbar/>
        <Switch>  
          <Route exact path="/" component={Dashboard}/>
          <Route exact path="/dashboard" component={Dashboard}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/register" component={Register}/>
          <Route exact path="/locate" component={LocateStore}/>
          <Route exact path="/forgetmiddle" component={ForgetMiddle}/>
          <Route exact path="/forget" component={Forget}/>
          <Route exact path="/allproducts" component={AllProduct}/>
          <Route exact path="/productdetails" component={ProductDetails}/>
          <PrivateRoute path="/changepassword" exact component={ChangePassword}/>
          <PrivateRoute path="/cart" exact component={Cart}/>
          {/* <Route exact path="/side" component={Checkout_Side}/>  */}
          <PrivateRoute path="/order" exact component={Order}/>
          <PrivateRoute path="/profile" exact component={Profile}/>
          <PrivateRoute path="/address" exact component={Address}/>
          <PrivateRoute path="/editaddress" exact component={EditAddress}/>
          <PrivateRoute path="/addaddress" exact component={AddAddress}/>
          <PrivateRoute path="/document" exact component={Document}/>
          <Route path="/" component={Error} />
        </Switch>
        <Footer /> 
      </Router>
    </div>
    </AuthContext.Provider>
    </SearchContext.Provider>
    </CartContext.Provider>
    </DetailContext.Provider>
  );
}

export default App;