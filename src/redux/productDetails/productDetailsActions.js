import {
  FETCH_PRODUCTDETAILS_FAILURE,
  FETCH_PRODUCTDETAILS_SUCCESS,
  FETCH_PRODUCTDETAILS_REQUEST,
} from "./productDetailsTypes";
import axios from "axios";

function fetchProductDetailsRequest() {
  return {
    type: FETCH_PRODUCTDETAILS_REQUEST,
  };
}
function fetchProductDetailsFailure(error) {
  return {
    type: FETCH_PRODUCTDETAILS_FAILURE,
    payload: error,
  };
}
function fetchProductDetailsSuccess(productDetails) {
  return {
    type: FETCH_PRODUCTDETAILS_SUCCESS,
    payload: productDetails,
  };
}

//async action creator:
export const fetchProductDetails = () => {
  return function (dispatch) {
    dispatch(fetchProductDetailsRequest());
    axios
      .get("http://185.159.179.6/api/Warehouse/GetProductDetails")
      .then((res) => {
        const productDetails = res.data;
        dispatch(fetchProductDetailsSuccess(productDetails));
      })
      .catch((error) => {
        dispatch(fetchProductDetailsFailure(error.message));
      });
  };
};

//store:
// const store = createStore(reducer, applyMiddleware(reduxThunk, logger));
// store.dispatch(fetchProductDetails());
