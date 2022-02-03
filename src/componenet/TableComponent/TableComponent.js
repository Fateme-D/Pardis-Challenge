import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompanies } from "../../redux/companies/companiesActions";
import { fetchProductDetails } from "../../redux/productDetails/productDetailsActions";
import { fetchProducts } from "../../redux/products/productsActions";
import { Modal, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModalForm from "../Modal/Modal";

const TableComponent = () => {
  const { products } = useSelector((state) => state.products);
  const { productDetails } = useSelector((state) => state.productDetails);
  const { companies } = useSelector((state) => state.companies);
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState({});

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchProductDetails());
    dispatch(fetchCompanies());
  }, []);

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

  return (
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
};

export default TableComponent;
