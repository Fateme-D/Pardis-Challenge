import {
  FETCH_COMPANIES_FAILURE,
  FETCH_COMPANIES_SUCCESS,
  FETCH_COMPANIES_REQUEST,
} from "./companiesTypes";
import axios from "axios";

function fetchCompaniesRequest() {
  return {
    type: FETCH_COMPANIES_REQUEST,
  };
}
function fetchCompaniesFailure(error) {
  return {
    type: FETCH_COMPANIES_FAILURE,
    payload: error,
  };
}
function fetchCompaniesSuccess(companies) {
  return {
    type: FETCH_COMPANIES_SUCCESS,
    payload: companies,
  };
}

//async action creator:
export const fetchCompanies = () => {
  return function (dispatch) {
    dispatch(fetchCompaniesRequest());
    axios
      .get("http://185.159.179.6/api/Warehouse/GetCompanies")
      .then((res) => {
        const companies = res.data;
        dispatch(fetchCompaniesSuccess(companies));
      })
      .catch((error) => {
        dispatch(fetchCompaniesFailure(error.message));
      });
  };
};
