import {
  ADD_DETAILS,
  ADD_TO_CART,
  CHANGE_AUTH,
  CHANGE_QUANTITY,
  FLUSH_OUT,
  REMOVE_FROM_CART,
  SEARCH_PRO,
} from "./action.type";


/**
 * @author Saroj Sundara
 * @description this method is responsible to monitor change in product detail state
 * @returns the state of product details
 */

export const detailReducer = (state, action) => {
  switch (action.type) {
    case ADD_DETAILS:
      return action.payload;
    default:
      return state;
  }
};


/**
 * @author Saroj Sundara
 * @description this method is responsible to monitor change in cart state
 * @returns the state of cart
 */

export const cartReducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return [...state, action.payload];
    case REMOVE_FROM_CART:
      return state.filter((prod) => prod.id !== action.payload);
    case CHANGE_QUANTITY:
      return [...state];
    case FLUSH_OUT:
      state = [];
      return state;
    default:
      return state;
  }
};

/**
 * @author Saroj Sundara
 * @description this method is responsible to monitor change in search state
 * @returns the state of searchbar
 */
export const searchReducer = (state, action) => {
  switch (action.type) {
    case SEARCH_PRO:
      return action.payload;
    default:
      return state;
  }
};


/**
 * @author Saroj Sundara
 * @description this method is responsible to monitor change in authentication state
 * @returns the state of authentication
 */

export const authReducer = (state, action) => {
  switch (action.type) {
    case CHANGE_AUTH:
      return action.payload;
    default:
      return state;
  }
};
