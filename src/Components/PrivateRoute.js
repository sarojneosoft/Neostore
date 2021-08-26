import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import {isAuthenticated} from './Auth'


/**
 * @author Saroj Sundara
 * @description this method is responsible for giving access to routes on the basis of authentication
 * @param {props} receives a compomnent as prop
 * @returns JSX for Private Routing
 */

export default function PrivateRoute({component : Component, ...rest}) {
    return (
        <Route 
         {...rest}
         render = {props =>
         isAuthenticated() ? (
             <Component {...props}/>
         ) : (
             <Redirect 
               to={{
                   pathname : "/login",
                   state : {from: props.location}
               }}
             />
         )
        }
        />
    )
}
