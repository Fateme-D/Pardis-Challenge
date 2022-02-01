import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import { Modal, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import ModalForm from "./componenet/Modal/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [companies, setCompanies] = useState([]);
  const [products, setProducts] = useState([]);
  const [productDetails, setProductDetails] = useState([]);
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState({});

  useEffect(() => {
    const fetchProductDetails = async () => {
      const { data } = await axios.get(
        "http://185.159.179.6/api/Warehouse/GetProductDetails"
      );
      setProductDetails(data);
    };
    try {
      fetchProductDetails();
    } catch (error) {}

    const fetchProducts = async () => {
      const { data } = await axios.get(
        "http://185.159.179.6/api/Warehouse/GetProducts"
      );
      setProducts(data);
    };
    try {
      fetchProducts();
    } catch (error) {}

    const fetchCompanies = async () => {
      const { data } = await axios.get(
        "http://185.159.179.6/api/Warehouse/GetCompanies"
      );
      setCompanies(data);
    };
    try {
      fetchCompanies();
    } catch (error) {}
  }, []);

  // useEffect(() => {
  //   let getCompanies = "http://185.159.179.6/api/Warehouse/GetCompanies";
  //   let getProducts = "http://185.159.179.6/api/Warehouse/GetProducts";
  //   let getProductDetails =
  //     "http://185.159.179.6/api/Warehouse/getProductDetails";

  //   const requestOne = axios.get(getCompanies);
  //   const requestTwo = axios.get(getProducts);
  //   const requestThree = axios.get(getProductDetails);

  //   axios
  //     .all([requestOne, requestTwo, requestThree])
  //     .then(
  //       axios.spread((...responses) => {
  //         const resGetCompanies = responses[0];
  //         const resGetProducts = responses[1];
  //         const resGetProductDetails = responses[2];

  //         setCompanies(resGetCompanies.data);
  //         setProducts(resGetProducts.data);
  //         setProductDetails(resGetProductDetails.data);
  //       })
  //     )
  //     .catch((errors) => {});
  // }, []);

  const handleClose = () => setShow(false);
  const onModalFormSubmit = (e) => {
    e.preventDefault();
    handleClose();
    toast.success("با موفقیت ثبت گردید");
  };

  const editProductHandler = (id) => {
    setShow(true);
    const index = productDetails.findIndex((p) => p.id === id);
    const selectedProduct = { ...productDetails[index] };
  };

  const modalHandler = (id) => {
    const index = productDetails.findIndex((p) => p.id === id);
    const selectedProduct = { ...productDetails[index] };
    setEdit(selectedProduct);
    setShow(true);
  };

  function sortRowData() {
    const newData = {};
    for (const product of products) {
      const sameProductsId = productDetails
        .sort((a, b) => a.companyId - b.companyId)
        .filter((pD) => pD.productId === product.id);
      newData[product["title"]] = sameProductsId;
    }
    return newData;
  }
  const orderedData = sortRowData();

  console.log([...Array(companies.length).keys()]);
  return (
    <div className="App">
      <div className="tableContainer">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th></th>
              {companies
                .sort((a, b) => a.id - b.id)
                .map((c) => (
                  <th key={c.id}>{c.title}</th>
                ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(companies.length).keys()].map((i, index) => {
              return (
                <tr key={index}>
                  <td>{Object.keys(orderedData)[index]}</td>
                  {orderedData[Object.keys(orderedData)[index]].map((d) => {
                    return (
                      <td key={d.id} onClick={() => modalHandler(d.id)}>
                        id:{d.id} - pId:{d.productId} - cId:{d.companyId}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ModalForm
            onSubmit={onModalFormSubmit}
            editProductHandler={editProductHandler}
            edit={edit}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default App;
