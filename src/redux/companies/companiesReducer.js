import {
  FETCH_COMPANIES_FAILURE,
  FETCH_COMPANIES_SUCCESS,
  FETCH_COMPANIES_REQUEST,
} from "./companiesTypes";

const initialState = {
  loading: false,
  error: "",
  companies: [],
};
const companiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COMPANIES_REQUEST:
      return { ...state, loading: true };
    case FETCH_COMPANIES_FAILURE:
      return { loading: false, error: action.payload, companies: [] };
    case FETCH_COMPANIES_SUCCESS:
      return { loading: false, error: "", companies: action.payload };
    default:
      return state;
  }
};
export default companiesReducer;
