import {
  FETCH_PRODUCTS_FAILURE,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_REQUEST,
} from "./productsTypes";
import axios from "axios";

function fetchProductsRequest() {
  return {
    type: FETCH_PRODUCTS_REQUEST,
  };
}
function fetchProductsFailure(error) {
  return {
    type: FETCH_PRODUCTS_FAILURE,
    payload: error,
  };
}
function fetchProductsSuccess(products) {
  return {
    type: FETCH_PRODUCTS_SUCCESS,
    payload: products,
  };
}

//async action creator:
export const fetchProducts = () => {
  return function (dispatch) {
    dispatch(fetchProductsRequest());
    axios
      .get("http://185.159.179.6/api/Warehouse/GetProducts")
      .then((res) => {
        const products = res.data;
        dispatch(fetchProductsSuccess(products));
      })
      .catch((error) => {
        dispatch(fetchProductsFailure(error.message));
      });
  };
};
