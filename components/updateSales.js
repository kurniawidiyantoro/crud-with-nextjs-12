import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  Spinner,
  Alert,
} from "reactstrap";

function UpdateSales({ datas }) {
  const [customerName, setCustomerName] = useState("");
  const [city, setCity] = useState("");
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState();
  const [message, setMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [modal, setModal] = useState(false);
  const router = useRouter();

  const toggle = () => {
    setModal(!modal);
    if (!modal) 
    setMessage("");
    // Reset the state when the modal is opened
    setCustomerName(datas.customer_name);
    setCity(datas.city);
    setProductName(datas.product_name);
    setQuantity(datas.quantity);
  };

  useEffect (() => {
    
  }
  )
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/updateTransaction/${datas.customers_id}`,
        {
          customer_name: customerName,
          city: city,
          product_name: productName,
          quantity: Number(quantity)
        }
      );

      setMessage(response.data.msg);
      toggle();
      setTimeout(() => {
        setIsSaving(false);
        setMessage("");
        router.reload();
      }, 2000);
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.msg);
        setIsSaving(false);
      }
    }
  };

  return (
    <div>
      <Button
        className="badge rouded-pill me-2 p-2"
        color="primary"
        onClick={toggle}
      >
        Update <i className="bi bi-clipboard2"></i>
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          <strong>Update Sales</strong>
        </ModalHeader>

        <Form className="fs-6" onSubmit={handleUpdate}>
          {!message ? null : (
            <Alert color="danger" className="w-75 m-auto">
              {message}
            </Alert>
          )}
          <ModalBody>
            <FormGroup>
              <Label for="customer name">
                <strong>customer name</strong>
              </Label>
              <Input
                id="customer name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="customer name"
                type="text"
              />
            </FormGroup>
            <FormGroup>
              <Label for="city">
                <strong>city</strong>
              </Label>
              <Input
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="city"
                type="text"
              />
            </FormGroup>
            <FormGroup>
              <Label for="product name">
                <strong>product name</strong>
              </Label>
              <Input
                id="product name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="product name"
                type="text"
              />
            </FormGroup>
            <FormGroup>
              <Label for="quantity">
                <strong>quantity</strong>
              </Label>
              <Input
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="quantity"
                type="number"
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            {!isSaving ? (
              <Button color="primary" type="submit">
                update
              </Button>
            ) : (
              <Button color="primary" disabled>
                <Spinner size="sm" className="me-2"></Spinner>
                <span>updating...</span>
              </Button>
            )}

            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
      {message && isSaving ? (
        <Modal isOpen={!modal}>
          <ModalBody className="bg-success text-white rounded opacity-75">
            {message}
          </ModalBody>
        </Modal>
      ) : null}
    </div>
  );
}

export default UpdateSales;
