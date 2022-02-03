import { combineReducers } from "redux";
import companiesReducer from "./companies/companiesReducer";
import productDetailsReducer from "./productDetails/productDetailsReducer";
import productsReducer from "./products/productsReducer";

const rootReducer = combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
  companies: companiesReducer,
});
export default rootReducer;
