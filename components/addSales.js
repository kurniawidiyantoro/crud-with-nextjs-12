import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
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

function AddNewSales() {
  const [customerName, setCustomerName] = useState("");
  const [city, setCity] = useState("");
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [modal, setModal] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const toggle = () => {
    setModal(!modal);
    if (!modal) return setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/createNewTransaction`,
        {
          customer_name: customerName,
          city: city,
          product_name: productName,
          quantity: Number(quantity),
        }
      );

      console.log(response);
      if (response.data.msg !== "success") {
        setMessage(response.data.msg);
        return setIsSaving(false);
      }

      setCustomerName("");
      setCity("");
      setProductName("");
      setQuantity(null);
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
      <Button color="success" onClick={toggle}>
        Add New <i className="bi bi-cloud-plus ms-1"></i>
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          <strong>Add New Sales</strong>
        </ModalHeader>
        <Form className="fs-6" onSubmit={handleSubmit}>
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
                Save
              </Button>
            ) : (
              <Button color="primary" disabled>
                <Spinner size="sm" className="me-2"></Spinner>
                <span>saving...</span>
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

export default AddNewSales;
