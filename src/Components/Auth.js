/**
 * @author Saroj Sundara
 * @description this method will return true or false for authentication based on token
 * @returns {boolean} true or false
 */

export const isAuthenticated = ()=>{
    if(typeof window === "undefined"){
        return false;
    }
    if(localStorage.getItem("token")){
        return true;
    }else{
        return false;
    }
}