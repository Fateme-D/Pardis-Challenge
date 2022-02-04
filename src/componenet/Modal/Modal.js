import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

const ModalForm = ({ onSubmit, edit }) => {
  const [input, setInput] = useState({ price: "", quantity: "" });

  useEffect(() => {
    setInput({ ...input, price: edit.price, quantity: edit.quantity });
    console.log("loop");
  }, [edit]);

  const changeHandler = (e) => {
    setInput(([e.target.name] = e.target.value));
  };
  return (
    <Form onSubmit={onSubmit}>
      <Form.Group>
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="tel"
          placeholder="Enter Price"
          value={input.price}
          name="price"
          onChange={(e) => changeHandler(e)}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label style={{ marginTop: "15px" }}>Quantity</Form.Label>
        <Form.Control
          type="tel"
          placeholder="Enter Quantity"
          value={input.quantity}
          name="price"
          onChange={(e) => changeHandler(e)}
        />
      </Form.Group>
      <Button
        variant="primary"
        type="submit"
        block="true"
        style={{ marginTop: "15px" }}
      >
        submit
      </Button>
    </Form>
  );
};
export default ModalForm;
