import {
  FETCH_PRODUCTS_FAILURE,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_REQUEST,
} from "./productsTypes";

const initialState = {
  loading: false,
  error: "",
  products: [],
};
const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_REQUEST:
      return { ...state, loading: true };
    case FETCH_PRODUCTS_FAILURE:
      return { loading: false, error: action.payload, products: [] };
    case FETCH_PRODUCTS_SUCCESS:
      return { loading: false, error: "", products: action.payload };
    default:
      return state;
  }
};
export default productsReducer;
