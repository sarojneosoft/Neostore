import {ADD_DETAILS, ADD_TO_CART, CHANGE_AUTH, CHANGE_QUANTITY, FLUSH_OUT, REMOVE_FROM_CART, SEARCH_PRO} from './action.type'

export const detailReducer = (state, action)=>{
    switch (action.type) {
        case ADD_DETAILS:
            return action.payload;
        default:
            return state;
    }
}

export const cartReducer = (state, action)=>{
    switch (action.type) {
        case ADD_TO_CART:
            return [...state, action.payload]
        case REMOVE_FROM_CART:
            return state.filter(prod => prod.id !== action.payload)
        case CHANGE_QUANTITY : 
            return [...state]  
        case FLUSH_OUT:
            state = []
            return state;      
        default:
            return state;
    }
}

export const searchReducer = (state, action)=>{
    switch (action.type) {
        case SEARCH_PRO:
            return action.payload; 
        default:
            return state;
    }
}

export const authReducer = (state, action)=>{
    switch (action.type) {
        case CHANGE_AUTH:
            return action.payload; 
        default:
            return state;
    }
}

