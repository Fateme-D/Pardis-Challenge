import {
  FETCH_PRODUCTDETAILS_FAILURE,
  FETCH_PRODUCTDETAILS_SUCCESS,
  FETCH_PRODUCTDETAILS_REQUEST,
} from "./productDetailsTypes";

const initialState = {
  loading: false,
  error: "",
  productDetails: [],
};
const productDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTDETAILS_REQUEST:
      return { ...state, loading: true };
    case FETCH_PRODUCTDETAILS_FAILURE:
      return { loading: false, error: action.payload, productDetails: [] };
    case FETCH_PRODUCTDETAILS_SUCCESS:
      return { loading: false, error: "", productDetails: action.payload };
    default:
      return state;
  }
};
export default productDetailsReducer;
